import 'dotenv/config';
import crypto from 'crypto';
import fs from 'fs';
import express from 'express';
import { createServer as createHttpServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import {
  performanceTelemetryMiddleware,
  emitCloudFunctionEvent,
  getControlPlaneSnapshot,
  updateAutoScaleConfig,
  runConcurrentAnalysisBurst,
  recordSystemError,
  resolveSystemError,
  buildRfc5322MimeEmail,
  recordEmailDispatchReceipt,
  type CloudTriggerType,
  type ReportedErrorRecord,
} from './src/server/cloudFunctionsEngine';
import { securityHardeningMiddleware, apiRateLimitMiddleware } from './src/server/securityHardening';
import {
  startGoogleDriveAutoSync,
  syncNowToGoogleDrive,
  getGoogleDriveSyncStatus,
} from './src/server/googleDriveSync';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');
const httpServer = createHttpServer(app);

app.use(securityHardeningMiddleware);
app.use('/api', apiRateLimitMiddleware);
app.use(express.json({ limit: '25mb' }));
app.use(performanceTelemetryMiddleware);

function getAIClient(): GoogleGenAI {
  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function isSafeExternalUrl(rawUrl: string): boolean {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host.startsWith('169.254.') ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

interface ExtractedDependency {
  ecosystem: 'npm' | 'PyPI';
  name: string;
  version?: string;
}

function extractDependenciesForOSV(fileName: string, sourceCode: string): ExtractedDependency[] {
  const deps: ExtractedDependency[] = [];
  const seen = new Set<string>();

  const addDep = (ecosystem: 'npm' | 'PyPI', name: string, version?: string) => {
    const cleanName = name.trim();
    if (!cleanName || cleanName.startsWith('.') || cleanName.startsWith('/') || cleanName.startsWith('@/')) {
      return;
    }
    // Ignore Node built-in modules
    const nodeBuiltins = new Set([
      'fs',
      'path',
      'http',
      'https',
      'crypto',
      'os',
      'url',
      'util',
      'child_process',
      'events',
      'stream',
      'net',
      'tls',
      'zlib',
    ]);
    if (ecosystem === 'npm' && (cleanName.startsWith('node:') || nodeBuiltins.has(cleanName))) {
      return;
    }
    const cleanVer = version ? version.replace(/^[\^~>=<v\s]+/, '').split(/\s+/)[0] : undefined;
    const key = `${ecosystem}:${cleanName}@${cleanVer || '*'}`;
    if (!seen.has(key) && deps.length < 25) {
      seen.add(key);
      deps.push({
        ecosystem,
        name: cleanName,
        version: cleanVer && /^\d+\.\d+/.test(cleanVer) ? cleanVer : undefined,
      });
    }
  };

  // 1. Try parsing as package.json if JSON
  if (fileName.endsWith('.json') || sourceCode.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(sourceCode);
      const sections = [parsed.dependencies, parsed.devDependencies, parsed.optionalDependencies];
      for (const sec of sections) {
        if (sec && typeof sec === 'object') {
          for (const [pkg, ver] of Object.entries(sec)) {
            if (typeof ver === 'string') {
              addDep('npm', pkg, ver);
            }
          }
        }
      }
    } catch {
      // Not a valid JSON manifest; continue to source import extraction
    }
  }

  // 2. Python requirements.txt style lines
  if (fileName.endsWith('requirements.txt')) {
    for (const line of sourceCode.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const match = trimmed.match(/^([a-zA-Z0-9_.-]+)\s*(?:==|>=|~=)\s*([0-9a-zA-Z.-]+)/);
      if (match) {
        addDep('PyPI', match[1], match[2]);
      } else if (/^[a-zA-Z0-9_.-]+$/.test(trimmed)) {
        addDep('PyPI', trimmed);
      }
    }
  }

  // 3. Extract JS/TS import / require package specifiers
  const importRegex = /(?:from\s+['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\))/g;
  let match: RegExpExecArray | null;
  while ((match = importRegex.exec(sourceCode)) !== null) {
    const rawSpec = match[1] || match[2];
    if (!rawSpec || rawSpec.startsWith('.') || rawSpec.startsWith('/')) continue;
    const parts = rawSpec.split('/');
    const pkgName = rawSpec.startsWith('@') && parts.length >= 2 ? `${parts[0]}/${parts[1]}` : parts[0];
    addDep('npm', pkgName);
  }

  return deps;
}

interface OSVFinding {
  packageName: string;
  ecosystem: string;
  version: string;
  advisoryId: string;
  summary: string;
  isMalwareAdvisory: boolean;
}

async function queryOSVMalwareAndVulns(deps: ExtractedDependency[]): Promise<OSVFinding[]> {
  if (deps.length === 0) return [];
  try {
    const queries = deps.map((d) =>
      d.version
        ? { package: { name: d.name, ecosystem: d.ecosystem }, version: d.version }
        : { package: { name: d.name, ecosystem: d.ecosystem } }
    );

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const resp = await fetch('https://api.osv.dev/v1/querybatch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queries }),
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!resp.ok) return [];
    const data = (await resp.json()) as { results?: Array<{ vulns?: Array<{ id: string; summary?: string }> }> };
    const findings: OSVFinding[] = [];

    (data.results || []).forEach((resItem, idx) => {
      const dep = deps[idx];
      const vulns = resItem.vulns || [];
      // Prioritize MAL-* (malicious package advisories) first
      const sorted = [...vulns].sort((a, b) => {
        const aMal = a.id.startsWith('MAL-') ? 0 : 1;
        const bMal = b.id.startsWith('MAL-') ? 0 : 1;
        return aMal - bMal;
      });
      for (const v of sorted.slice(0, 3)) {
        findings.push({
          packageName: dep.name,
          ecosystem: dep.ecosystem,
          version: dep.version || 'wszystkie / nieokreślona',
          advisoryId: v.id,
          summary: v.summary || (v.id.startsWith('MAL-') ? 'Zidentyfikowano złośliwy pakiet w rejestrze OSV' : 'Zgłoszona podatność bezpieczeństwa w rejestrze OSV'),
          isMalwareAdvisory: v.id.startsWith('MAL-'),
        });
      }
    });

    return findings;
  } catch {
    return [];
  }
}

const EXTRACTED_TASKS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    transcript: {
      type: Type.STRING,
      description: 'Dokładna transkrypcja nagrania głosowego lub odczytany tekst z pisma odręcznego.',
    },
    tasks: {
      type: Type.ARRAY,
      description: 'Lista wyodrębnionych zadań do wykonania na podstawie tekstu.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: 'Krótki, konkretny tytuł zadania (maks. 120 znaków).',
          },
          description: {
            type: Type.STRING,
            description: 'Szczegółowy opis lub kontekst zadania.',
          },
          priority: {
            type: Type.STRING,
            description: 'Priorytet zadania: low, medium, high lub urgent.',
          },
          dueDateOffsetDays: {
            type: Type.INTEGER,
            description: 'Za ile dni od dzisiaj przypada termin wykonania (0 = dzisiaj, 1 = jutro, itp.).',
          },
          estimatedMinutes: {
            type: Type.INTEGER,
            description: 'Szacowany czas wykonania w minutach (np. 15, 30, 45, 60, 120).',
          },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Maksymalnie 4 krótkie tagi kategoryzujące zadanie.',
          },
        },
        required: ['title', 'description', 'priority', 'dueDateOffsetDays', 'estimatedMinutes', 'tags'],
      },
    },
  },
  required: ['transcript', 'tasks'],
};

const WORK_OPTIMIZATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    executiveSummary: {
      type: Type.STRING,
      description: 'Zwięzłe podsumowanie audytu jakości pracy, wąskich gardeł oraz równowagi obciążenia zespołu.',
    },
    bottleneckRiskLevel: {
      type: Type.STRING,
      description: 'Poziom ryzyka opóźnień lub przeciążenia: low, medium lub high.',
    },
    estimatedTimeSavedMinutes: {
      type: Type.INTEGER,
      description: 'Szacowana oszczędność czasu w minutach po wdrożeniu proponowanych usprawnień procesu.',
    },
    verificationFindings: {
      type: Type.ARRAY,
      description: 'Wyniki sprawdzania poprawności i kompletności zadań (brakujące kryteria akceptacji, przeterminowane terminy, zatory w kolumnie review, brak szyfrowania wrażliwych danych).',
      items: {
        type: Type.OBJECT,
        properties: {
          taskId: {
            type: Type.STRING,
            description: 'ID sprawdzanego zadania lub "workspace" dla uwagi ogólnej.',
          },
          taskTitle: {
            type: Type.STRING,
            description: 'Tytuł zadania, którego dotyczy uwaga.',
          },
          severity: {
            type: Type.STRING,
            description: 'Waga problemu: critical, warning lub info.',
          },
          category: {
            type: Type.STRING,
            description: 'Kategoria weryfikacji (np. Terminowość, Jakość opisu, Wąskie gardło, Bezpieczeństwo E2EE, Obciążenie).',
          },
          finding: {
            type: Type.STRING,
            description: 'Konkretny opis wykrytej nieprawidłowości lub ryzyka.',
          },
          recommendation: {
            type: Type.STRING,
            description: 'Zalecane działanie korygujące.',
          },
        },
        required: ['taskId', 'taskTitle', 'severity', 'category', 'finding', 'recommendation'],
      },
    },
    taskOptimizations: {
      type: Type.ARRAY,
      description: 'Gotowe do wdrożenia jednym kliknięciem optymalizacje istniejących zadań (doprecyzowany opis z kryteriami akceptacji, urealniony czas i priorytet).',
      items: {
        type: Type.OBJECT,
        properties: {
          taskId: {
            type: Type.STRING,
            description: 'Dokładne ID istniejącego zadania z przesłanej listy.',
          },
          taskTitle: {
            type: Type.STRING,
            description: 'Tytuł optymalizowanego zadania.',
          },
          suggestedPriority: {
            type: Type.STRING,
            description: 'Zoptymalizowany priorytet: low, medium, high lub urgent.',
          },
          suggestedMinutes: {
            type: Type.INTEGER,
            description: 'Urealniony czas realizacji w minutach.',
          },
          enhancedDescription: {
            type: Type.STRING,
            description: 'Ulepszony, konkretny opis zadania z krótką listą kontrolną kryteriów ukończenia.',
          },
          recommendEncryption: {
            type: Type.BOOLEAN,
            description: 'Czy zadanie powinno mieć włączone szyfrowanie E2EE ze względu na poufność.',
          },
          rationale: {
            type: Type.STRING,
            description: 'Dlaczego ta zmiana przyspieszy lub poprawi jakość pracy.',
          },
        },
        required: [
          'taskId',
          'taskTitle',
          'suggestedPriority',
          'suggestedMinutes',
          'enhancedDescription',
          'recommendEncryption',
          'rationale',
        ],
      },
    },
    suggestedFollowUpTasks: {
      type: Type.ARRAY,
      description: 'Maksymalnie 3 brakujące zadania kontrolne lub domykające luki w projekcie.',
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          description: { type: Type.STRING },
          priority: { type: Type.STRING },
          dueDateOffsetDays: { type: Type.INTEGER },
          estimatedMinutes: { type: Type.INTEGER },
          tags: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['title', 'description', 'priority', 'dueDateOffsetDays', 'estimatedMinutes', 'tags'],
      },
    },
  },
  required: [
    'executiveSummary',
    'bottleneckRiskLevel',
    'estimatedTimeSavedMinutes',
    'verificationFindings',
    'taskOptimizations',
    'suggestedFollowUpTasks',
  ],
};

const MALWARE_SCAN_REMEDIATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    verdict: {
      type: Type.STRING,
      description: 'Werdykt skanowania kodu: clean (czysty), suspicious (podejrzany) lub malicious (wykryto złośliwy kod / krytyczne zagrożenie).',
    },
    summary: {
      type: Type.STRING,
      description: 'Techniczne podsumowanie badania kodu oraz przeprowadzonego procesu neutralizacji zagrożeń.',
    },
    threats: {
      type: Type.ARRAY,
      description: 'Lista wykrytych fragmentów złośliwego oprogramowania, backdoorów, obfuskacji, eksfiltracji danych lub luk RCE/Injection.',
      items: {
        type: Type.OBJECT,
        properties: {
          lineNumber: {
            type: Type.INTEGER,
            description: 'Przybliżony numer linii w badanym kodzie (1-indeksowany).',
          },
          threatType: {
            type: Type.STRING,
            description: 'Typ zagrożenia (np. Backdoor / RCE, Eksfiltracja sekretów, Obfuskowany payload Base64, Złośliwy skrypt powłoki, Wstrzyknięcie poleceń).',
          },
          severity: {
            type: Type.STRING,
            description: 'Poziom zagrożenia: critical, high, medium lub low.',
          },
          maliciousSnippet: {
            type: Type.STRING,
            description: 'Krótki cytat złośliwego lub niebezpiecznego fragmentu kodu.',
          },
          analysis: {
            type: Type.STRING,
            description: 'Wyjaśnienie działania szkodliwego kodu i potencjalnych skutków jego uruchomienia.',
          },
          remediationAction: {
            type: Type.STRING,
            description: 'Opis sposobu wyeliminowania lub zastąpienia złośliwego fragmentu w oczyszczonym kodzie.',
          },
        },
        required: [
          'lineNumber',
          'threatType',
          'severity',
          'maliciousSnippet',
          'analysis',
          'remediationAction',
        ],
      },
    },
    remediatedCode: {
      type: Type.STRING,
      description: 'Pełny, kompletny kod źródłowy po całkowitym wyeliminowaniu złośliwego oprogramowania, backdoorów i luk bezpieczeństwa, zachowujący bezpieczną logikę biznesową.',
    },
    eliminatedConstructsCount: {
      type: Type.INTEGER,
      description: 'Liczba usuniętych lub zneutralizowanych niebezpiecznych konstrukcji w kodzie.',
    },
  },
  required: ['verdict', 'summary', 'threats', 'remediatedCode', 'eliminatedConstructsCount'],
};

// 1. Native Voice Notes Disk Persistence + Transcription & Task Extraction
interface VoiceNoteRecord {
  id: string;
  fileName: string;
  relativePath: string;
  absolutePath: string;
  audioUrl: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds: number;
  transcript: string;
  tasksCount: number;
  createdAt: string;
}

interface ExtractedVoiceTask {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDateOffsetDays: number;
  estimatedMinutes: number;
  tags: string[];
}

const VOICE_NOTES_DIR = path.join(__dirname, 'data', 'voice-notes');
const VOICE_NOTES_INDEX_FILE = path.join(VOICE_NOTES_DIR, 'index.json');

function ensureVoiceNotesDir() {
  if (!fs.existsSync(VOICE_NOTES_DIR)) {
    fs.mkdirSync(VOICE_NOTES_DIR, { recursive: true });
  }
}

function readVoiceNotesIndex(): VoiceNoteRecord[] {
  ensureVoiceNotesDir();
  if (!fs.existsSync(VOICE_NOTES_INDEX_FILE)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(VOICE_NOTES_INDEX_FILE, 'utf-8'));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => {
      if (!item || typeof item !== 'object' || !item.fileName) return false;
      const diskPath = path.join(VOICE_NOTES_DIR, path.basename(String(item.fileName)));
      return fs.existsSync(diskPath);
    });
  } catch {
    return [];
  }
}

function writeVoiceNotesIndex(notes: VoiceNoteRecord[]) {
  ensureVoiceNotesDir();
  const tmpFile = `${VOICE_NOTES_INDEX_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(notes, null, 2), 'utf-8');
  fs.renameSync(tmpFile, VOICE_NOTES_INDEX_FILE);
}

function extensionForAudioMime(mimeType?: string): string {
  const clean = (mimeType || '').toLowerCase();
  if (clean.includes('wav')) return 'wav';
  if (clean.includes('mpeg') || clean.includes('mp3')) return 'mp3';
  if (clean.includes('mp4') || clean.includes('m4a') || clean.includes('aac')) return 'm4a';
  if (clean.includes('ogg')) return 'ogg';
  return 'webm';
}

function saveVoiceNoteAudioFile(params: {
  audioBase64: string;
  mimeType: string;
  durationSeconds?: number;
  transcript?: string;
}): VoiceNoteRecord {
  ensureVoiceNotesDir();
  const cleanBase64 = params.audioBase64.includes(',')
    ? params.audioBase64.split(',')[1]
    : params.audioBase64;
  const buffer = Buffer.from(cleanBase64, 'base64');
  const id = `vn_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
  const ext = extensionForAudioMime(params.mimeType);
  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const fileName = `notatka-${stamp}-${id}.${ext}`;
  const absolutePath = path.join(VOICE_NOTES_DIR, fileName);
  fs.writeFileSync(absolutePath, buffer);

  const record: VoiceNoteRecord = {
    id,
    fileName,
    relativePath: `data/voice-notes/${fileName}`,
    absolutePath,
    audioUrl: `/api/voice-notes/${id}/audio`,
    mimeType: params.mimeType || 'audio/webm',
    sizeBytes: buffer.byteLength,
    durationSeconds: Math.max(0, Math.round(Number(params.durationSeconds) || 0)),
    transcript: (params.transcript || '').trim(),
    tasksCount: 0,
    createdAt: new Date().toISOString(),
  };

  const notes = readVoiceNotesIndex();
  notes.unshift(record);
  writeVoiceNotesIndex(notes);
  return record;
}

function extractTasksDeterministically(rawText: string): ExtractedVoiceTask[] {
  const normalized = rawText.trim();
  if (!normalized) return [];

  const clauses = normalized
    .split(/(?:[\n;]+|(?<=[.!?])\s+|\b(?:a potem|następnie|oraz dodatkowo)\b)/i)
    .map((s) => s.replace(/^[-*•\d.)\s]+/, '').trim())
    .filter((s) => s.length >= 4);

  const parts = clauses.length > 0 ? clauses : [normalized];
  return parts.slice(0, 8).map((part) => {
    const lower = part.toLowerCase();
    let priority: ExtractedVoiceTask['priority'] = 'medium';
    if (/(pilne|krytyczn|natychmiast|asap|awaria)/i.test(lower)) priority = 'urgent';
    else if (/(wysoki|ważn|priorytet|konieczn)/i.test(lower)) priority = 'high';
    else if (/(niski|kiedyś|opcjonaln)/i.test(lower)) priority = 'low';

    let dueDateOffsetDays = 1;
    if (/(dzisiaj|dziś)/i.test(lower)) dueDateOffsetDays = 0;
    else if (/jutro/i.test(lower)) dueDateOffsetDays = 1;
    else if (/pojutrze/i.test(lower)) dueDateOffsetDays = 2;
    else if (/(tydzień|za tydzień|przyszły tydzień)/i.test(lower)) dueDateOffsetDays = 7;

    const minMatch = lower.match(/(\d{1,3})\s*(?:min|minut|minuty)/i);
    const hourMatch = lower.match(/(\d{1,2})\s*(?:godz|h\b)/i);
    const estimatedMinutes = minMatch
      ? Math.max(5, Math.min(480, Number(minMatch[1])))
      : hourMatch
        ? Math.max(15, Math.min(480, Number(hourMatch[1]) * 60))
        : 30;

    const cleanTitle = part
      .replace(/\(.*?\)/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 90);

    return {
      title: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1),
      description: `Utworzono z notatki głosowej Chronos Vault: "${part}"`,
      priority,
      dueDateOffsetDays,
      estimatedMinutes,
      tags: ['notatka-głosowa', 'lokalne-nagranie'],
    };
  });
}

app.get('/api/voice-notes', (_req, res) => {
  try {
    const notes = readVoiceNotesIndex();
    res.json({ directory: VOICE_NOTES_DIR, notes });
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Błąd odczytu nagrań głosowych' });
  }
});

app.get('/api/voice-notes/:id/audio', (req, res) => {
  const safeId = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
  const note = readVoiceNotesIndex().find((n) => n.id === safeId);
  if (!note) {
    res.status(404).json({ error: 'Nie znaleziono nagrania głosowego.' });
    return;
  }
  const diskPath = path.join(VOICE_NOTES_DIR, path.basename(note.fileName));
  if (!fs.existsSync(diskPath)) {
    res.status(404).json({ error: 'Plik audio nie istnieje na dysku.' });
    return;
  }
  res.setHeader('Content-Type', note.mimeType || 'audio/webm');
  res.setHeader('Content-Disposition', `inline; filename="${note.fileName}"`);
  res.sendFile(diskPath);
});

app.delete('/api/voice-notes/:id', (req, res) => {
  const safeId = String(req.params.id || '').replace(/[^a-zA-Z0-9_-]/g, '');
  const notes = readVoiceNotesIndex();
  const target = notes.find((n) => n.id === safeId);
  if (!target) {
    res.status(404).json({ error: 'Nie znaleziono nagrania.' });
    return;
  }
  const diskPath = path.join(VOICE_NOTES_DIR, path.basename(target.fileName));
  if (fs.existsSync(diskPath)) {
    fs.unlinkSync(diskPath);
  }
  writeVoiceNotesIndex(notes.filter((n) => n.id !== safeId));
  res.json({ deleted: true, id: safeId });
});

app.post('/api/ai/transcribe-voice', async (req, res) => {
  try {
    const { audioBase64, mimeType, textFallback, durationSeconds } = req.body as {
      audioBase64?: string;
      mimeType?: string;
      textFallback?: string;
      durationSeconds?: number;
    };

    let rawTranscript = textFallback ? textFallback.trim() : '';
    let savedNote: VoiceNoteRecord | null = null;
    let engine = 'local-speech-persistence';

    if (audioBase64 && mimeType) {
      savedNote = saveVoiceNoteAudioFile({
        audioBase64,
        mimeType,
        durationSeconds,
        transcript: rawTranscript,
      });
    }

    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim());
    let parsedTasks: ExtractedVoiceTask[] = [];

    if (hasGeminiKey) {
      try {
        const ai = getAIClient();
        if (audioBase64 && mimeType && !rawTranscript) {
          const cleanB64 = audioBase64.includes(',') ? audioBase64.split(',')[1] : audioBase64;
          const transcribeResp = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
              parts: [
                { inlineData: { mimeType, data: cleanB64 } },
                {
                  text: 'Dokonaj dokładnej transkrypcji tego nagrania głosowego w języku polskim (lub języku nagrania). Zwróć wyłącznie czysty tekst transkrypcji.',
                },
              ],
            },
          });
          rawTranscript = (transcribeResp.text ?? '').trim() || rawTranscript;
        }

        if (rawTranscript) {
          const structResp = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Przeanalizuj poniższą notatkę głosową i wyodrębnij z niej strukturalne zadania do wykonania.\n\nNotatka głosowa:\n"${rawTranscript}"`,
            config: {
              systemInstruction:
                'Jesteś precyzyjnym asystentem produktywności. Przekształcasz podyktowane notatki głosowe w uporządkowane zadania (tytuł, opis, priorytet: low/medium/high/urgent, dni do terminu, szacowany czas w minutach, tagi). Odpowiadaj po polsku.',
              responseMimeType: 'application/json',
              responseSchema: EXTRACTED_TASKS_SCHEMA,
            },
          });
          const parsed = JSON.parse((structResp.text ?? '{}').trim());
          if (parsed.transcript) rawTranscript = String(parsed.transcript);
          if (Array.isArray(parsed.tasks)) parsedTasks = parsed.tasks;
          engine = 'gemini-2.5-flash';
        }
      } catch (aiErr: unknown) {
        console.warn(
          '[voice] Gemini fallback -> local parser:',
          aiErr instanceof Error ? aiErr.message : String(aiErr)
        );
      }
    }

    if (parsedTasks.length === 0) {
      if (rawTranscript) {
        parsedTasks = extractTasksDeterministically(rawTranscript);
      } else if (savedNote) {
        rawTranscript = `Zapisano nagranie audio "${savedNote.fileName}" (${savedNote.durationSeconds || 1}s, ${Math.max(1, Math.round(savedNote.sizeBytes / 1024))} KB) w ${savedNote.relativePath}.`;
        parsedTasks = [
          {
            title: `Odsłuchać notatkę głosową (${savedNote.fileName})`,
            description: `Plik audio został zapisany lokalnie w katalogu ${VOICE_NOTES_DIR}.`,
            priority: 'medium',
            dueDateOffsetDays: 0,
            estimatedMinutes: 10,
            tags: ['audio', 'notatka-głosowa'],
          },
        ];
      }
    }

    if (!rawTranscript && !savedNote) {
      res.status(400).json({ error: 'Brak danych audio lub tekstu do analizy.' });
      return;
    }

    if (savedNote) {
      const notes = readVoiceNotesIndex().map((n) =>
        n.id === savedNote!.id
          ? { ...n, transcript: rawTranscript, tasksCount: parsedTasks.length }
          : n
      );
      writeVoiceNotesIndex(notes);
      savedNote = notes.find((n) => n.id === savedNote!.id) || savedNote;
    }

    res.json({
      transcript: rawTranscript,
      tasks: parsedTasks,
      savedNote,
      directory: VOICE_NOTES_DIR,
      engine,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Błąd przetwarzania notatki głosowej';
    console.error('Voice transcription error:', message);
    res.status(500).json({ error: message });
  }
});

// 2. Handwriting Recognition (OCR) & Task Extraction Endpoint
app.post('/api/ai/recognize-handwriting', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body as {
      imageBase64?: string;
      mimeType?: string;
    };

    if (!imageBase64) {
      res.status(400).json({ error: 'Brak obrazu pisma odręcznego do rozpoznania.' });
      return;
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType || 'image/png',
              data: imageBase64,
            },
          },
          {
            text: 'Odczytaj całe pismo odręczne z tego obrazu (OCR) i przekształć odczytane notatki w listę konkretnych zadań do wykonania.',
          },
        ],
      },
      config: {
        systemInstruction:
          'Jesteś systemem optycznego rozpoznawania pisma odręcznego (OCR) i planowania zadań. Odczytaj dokładnie ręcznie napisany tekst na szkicu lub zdjęciu, a następnie wyodrębnij z niego zadania z priorytetem (low/medium/high/urgent), szacowanym czasem w minutach i tagami. Jeśli rysunek jest pusty lub nieczytelny, utwórz zadanie z informacją o konieczności uzupełnienia szkicu.',
        responseMimeType: 'application/json',
        responseSchema: EXTRACTED_TASKS_SCHEMA,
      },
    });

    const parsed = JSON.parse((response.text ?? '{}').trim());
    res.json({
      transcript: parsed.transcript || '',
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Błąd rozpoznawania pisma odręcznego AI';
    console.error('Handwriting OCR error:', message);
    res.status(500).json({ error: message });
  }
});

// 3. AI Work Verification & Workflow Optimization Endpoint
app.post('/api/ai/optimize-and-verify-work', async (req, res) => {
  try {
    const { projectName, currentIsoTime, tasks } = req.body as {
      projectName?: string;
      currentIsoTime?: string;
      tasks?: Array<{
        id: string;
        title: string;
        description: string;
        status: string;
        priority: string;
        dueDate: string;
        estimatedMinutes: number;
        assigneeEmail: string;
        tags: string[];
        isEncrypted: boolean;
      }>;
    };

    if (!Array.isArray(tasks) || tasks.length === 0) {
      res.status(400).json({ error: 'Brak zadań w projekcie do przeprowadzenia audytu i optymalizacji AI.' });
      return;
    }

    const boundedTasks = tasks.slice(0, 30).map((t) => ({
      id: String(t.id),
      title: String(t.title || '').slice(0, 200),
      description: String(t.description || '').slice(0, 800),
      status: String(t.status || 'todo'),
      priority: String(t.priority || 'medium'),
      dueDate: String(t.dueDate || 'brak'),
      estimatedMinutes: Number(t.estimatedMinutes || 30),
      assigneeEmail: String(t.assigneeEmail || 'nieprzypisane'),
      tags: Array.isArray(t.tags) ? t.tags.slice(0, 8) : [],
      isEncrypted: Boolean(t.isEncrypted),
    }));

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Przeprowadź szczegółowe sprawdzenie jakości pracy (weryfikację QA, terminowości, obciążenia i bezpieczeństwa) oraz optymalizację dla projektu "${projectName || 'Projekt'}" (aktualny czas: ${currentIsoTime || new Date().toISOString()}).\n\nLista aktualnych zadań JSON:\n${JSON.stringify(boundedTasks, null, 2)}`,
      config: {
        systemInstruction:
          'Jesteś głównym audytorem inżynierii pracy i optymalizatorem procesów zespołowych. 1) Sprawdź jakość zadań: wykryj przeterminowane lub brakujące terminy w ważnych zadaniach, zbyt ogólnikowe opisy bez kryteriów akceptacji, zatory w kolumnach weryfikacji/w trakcie, przeciążenie pojedynczych osób oraz brak szyfrowania E2EE w zadaniach dotyczących bezpieczeństwa/audytów/poufnych danych. 2) Dla istniejących zadań zaproponuj konkretne optymalizacje (posługując się ich dokładnym polem taskId z wejścia!), ulepszając opis o zwięzłe kryteria akceptacji i urealniając estymacje czasu oraz priorytety. 3) Zaproponuj maks. 2-3 brakujące zadania uzupełniające. Odpowiadaj wyłącznie w języku polskim.',
        responseMimeType: 'application/json',
        responseSchema: WORK_OPTIMIZATION_SCHEMA,
      },
    });

    const parsed = JSON.parse((response.text ?? '{}').trim());
    res.json(parsed);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Nie udało się wykonać analizy i optymalizacji pracy AI.';
    console.error('Work optimization AI error:', message);
    res.status(500).json({ error: message });
  }
});

// 4. Malware & Code Security Connector Handshake Endpoint
app.post('/api/security/test-connector', async (req, res) => {
  try {
    const { scannerEndpointUrl, scannerAuthToken } = req.body as {
      scannerEndpointUrl?: string;
      scannerAuthToken?: string;
    };

    const startOsv = Date.now();
    const osvController = new AbortController();
    const osvTimeout = setTimeout(() => osvController.abort(), 5000);
    const osvResp = await fetch('https://api.osv.dev/v1/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ package: { name: 'express', ecosystem: 'npm' }, version: '4.21.2' }),
      signal: osvController.signal,
    });
    clearTimeout(osvTimeout);
    const osvLatencyMs = Date.now() - startOsv;

    let customWebhookStatus: {
      configured: boolean;
      reachable: boolean;
      statusCode?: number;
      latencyMs?: number;
      detail: string;
    } = {
      configured: false,
      reachable: false,
      detail: 'Brak skonfigurowanego zewnętrznego adresu URL webhooka SAST (używany aktywny konektor OSV.dev + silnik neutralizacji Gemini Security).',
    };

    if (scannerEndpointUrl && scannerEndpointUrl.trim()) {
      const trimmedUrl = scannerEndpointUrl.trim();
      if (!isSafeExternalUrl(trimmedUrl)) {
        res.status(400).json({
          error: 'Podany adres URL konektora jest nieprawidłowy lub wskazuje na zablokowaną sieć lokalną.',
        });
        return;
      }

      const startCustom = Date.now();
      try {
        const ctrl = new AbortController();
        const tId = setTimeout(() => ctrl.abort(), 5000);
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
          'User-Agent': 'ChronosVault-MalwareConnector/1.0',
        };
        if (scannerAuthToken && scannerAuthToken.trim()) {
          headers.Authorization = `Bearer ${scannerAuthToken.trim()}`;
        }

        const customResp = await fetch(trimmedUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({ event: 'connector_ping', timestamp: new Date().toISOString() }),
          signal: ctrl.signal,
        });
        clearTimeout(tId);
        customWebhookStatus = {
          configured: true,
          reachable: customResp.ok || customResp.status < 500,
          statusCode: customResp.status,
          latencyMs: Date.now() - startCustom,
          detail: `Połączono z zewnętrznym punktem końcowym skanera (HTTP ${customResp.status}).`,
        };
      } catch (err: unknown) {
        customWebhookStatus = {
          configured: true,
          reachable: false,
          latencyMs: Date.now() - startCustom,
          detail:
            err instanceof Error
              ? `Nie udało się połączyć z zewnętrznym adresem skanera: ${err.message}`
              : 'Błąd połączenia z zewnętrznym adresem skanera.',
        };
      }
    }

    res.json({
      osvRegistry: {
        reachable: osvResp.ok,
        statusCode: osvResp.status,
        latencyMs: osvLatencyMs,
        endpoint: 'https://api.osv.dev/v1/querybatch',
      },
      customWebhook: customWebhookStatus,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Błąd testowania konektora bezpieczeństwa';
    res.status(500).json({ error: message });
  }
});

// 5. Malware Code Scanning & Automatic Threat Elimination Endpoint
app.post('/api/security/scan-and-remediate', async (req, res) => {
  try {
    const {
      fileName = 'snippet.ts',
      language = 'typescript',
      sourceCode = '',
      scannerEndpointUrl,
      scannerAuthToken,
    } = req.body as {
      fileName?: string;
      language?: string;
      sourceCode?: string;
      scannerEndpointUrl?: string;
      scannerAuthToken?: string;
    };

    if (!sourceCode || !sourceCode.trim()) {
      res.status(400).json({ error: 'Wklej lub prześlij kod źródłowy do przeskanowania pod kątem złośliwego oprogramowania.' });
      return;
    }

    const boundedCode = sourceCode.slice(0, 35000);
    const sha256Hash = crypto.createHash('sha256').update(boundedCode).digest('hex');

    // Step A: Extract package dependencies and query live OSV.dev Malware & Vulnerability database
    const extractedDeps = extractDependenciesForOSV(fileName, boundedCode);
    const osvFindings = await queryOSVMalwareAndVulns(extractedDeps);

    // Step B: Dispatch scan telemetry/code hash to optional external corporate SAST/Malware scanner endpoint
    let externalConnectorReport: {
      dispatched: boolean;
      statusCode?: number;
      detail: string;
    } = {
      dispatched: false,
      detail: 'Skanowanie zrealizowane przez konektor OSV.dev (Google Open Source Malware DB) oraz silnik deobfuskacji i neutralizacji kodu AI.',
    };

    if (scannerEndpointUrl && scannerEndpointUrl.trim()) {
      const targetUrl = scannerEndpointUrl.trim();
      if (isSafeExternalUrl(targetUrl)) {
        try {
          const ctrl = new AbortController();
          const tId = setTimeout(() => ctrl.abort(), 5000);
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'User-Agent': 'ChronosVault-MalwareConnector/1.0',
          };
          if (scannerAuthToken && scannerAuthToken.trim()) {
            headers.Authorization = `Bearer ${scannerAuthToken.trim()}`;
          }
          const extResp = await fetch(targetUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              event: 'code_malware_scan',
              fileName,
              language,
              sha256: sha256Hash,
              lineCount: boundedCode.split(/\r?\n/).length,
              codePreview: boundedCode.slice(0, 4000),
            }),
            signal: ctrl.signal,
          });
          clearTimeout(tId);
          externalConnectorReport = {
            dispatched: true,
            statusCode: extResp.status,
            detail: `Przekazano artefakt SHA-256 do zewnętrznego skanera (${targetUrl}) — odpowiedź HTTP ${extResp.status}.`,
          };
        } catch (extErr: unknown) {
          externalConnectorReport = {
            dispatched: false,
            detail:
              extErr instanceof Error
                ? `Zewnętrzny webhook nie odpowiedział (${extErr.message}) — dokończono badanie lokalnym konektorem OSV.dev i silnikiem AI.`
                : 'Zewnętrzny webhook niedostępny — użyto konektora OSV.dev i silnika AI.',
          };
        }
      }
    }

    // Step C: Number lines for accurate line-level threat pinpointing & run Gemini AI malware detection + code sanitization
    const numberedLines = boundedCode
      .split(/\r?\n/)
      .map((line, idx) => `${idx + 1}: ${line}`)
      .join('\n');

    const osvContext =
      osvFindings.length > 0
        ? `\n\nWyniki z zewnętrznej bazy złośliwych pakietów OSV.dev:\n${JSON.stringify(osvFindings, null, 2)}`
        : '\n\nWyniki z bazy OSV.dev: Nie wykryto znanych złośliwych paczek wśród jawnych importów (lub brak zewnętrznych zależności).';

    const ai = getAIClient();
    const scanResp = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Zbadaj poniższy plik kodu "${fileName}" (${language}) pod kątem złośliwego oprogramowania (malware, backdoory, trojany, obfuskowane payloady Base64/Hex, wywołania eval/Function, reverse shell, eksfiltracja zmiennych środowiskowych/ciasteczek/kluczy, koparki kryptowalut, złośliwe skrypty instalacyjne, SQL/Command Injection, XSS) oraz wygeneruj całkowicie oczyszczoną, bezpieczną wersję kodu w polu remediatedCode.\n\nKod z numerami linii:\n${numberedLines}${osvContext}`,
      config: {
        systemInstruction:
          'Jesteś silnikiem analizy złośliwego oprogramowania (Malware Reverse Engineering & Code Sanitization). Wykryj wszystkie szkodliwe instrukcje, tylne furtki (backdoors), kradzież sekretów i podatności krytyczne. W polu remediatedCode zwróć kompletny, czysty kod źródłowy BEZ numerów linii na początku wierszy, w którym każde złośliwe działanie zostało całkowicie usunięte i zastąpione bezpiecznym odpowiednikiem lub komentarzem wyjaśniającym neutralizację, przy zachowaniu prawidłowej funkcjonalności aplikacji. Wszystkie opisy (summary, threatType, analysis, remediationAction) formułuj po polsku.',
        responseMimeType: 'application/json',
        responseSchema: MALWARE_SCAN_REMEDIATION_SCHEMA,
      },
    });

    const parsed = JSON.parse((scanResp.text ?? '{}').trim());

    res.json({
      sha256: sha256Hash,
      scannedAt: new Date().toISOString(),
      dependenciesChecked: extractedDeps.length,
      osvFindings,
      externalConnectorReport,
      verdict: parsed.verdict || 'clean',
      summary: parsed.summary || '',
      threats: Array.isArray(parsed.threats) ? parsed.threats : [],
      remediatedCode: typeof parsed.remediatedCode === 'string' ? parsed.remediatedCode : boundedCode,
      eliminatedConstructsCount: Number(parsed.eliminatedConstructsCount || 0),
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Wystąpił błąd podczas skanowania i oczyszczania kodu.';
    console.error('Malware scan & remediation error:', message);
    res.status(500).json({ error: message });
  }
});

// 6. Live iCalendar (.ics) Feed Endpoint for Calendar Platform Sync
app.get('/api/calendar/feed.ics', (_req, res) => {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chronos Vault//Task & Calendar Sync//PL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Chronos Vault Tasks',
    'X-WR-TIMEZONE:Europe/Warsaw',
    'BEGIN:VEVENT',
    `UID:chronos-sync-check@chronosvault.app`,
    `DTSTAMP:${now}`,
    `DTSTART:${now}`,
    'SUMMARY:Synchronizacja Kalendarza Chronos Vault Aktywna',
    'DESCRIPTION:Kanał iCalendar (RFC 5545) dla Google Calendar, Apple Calendar i Microsoft Outlook.',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="chronos-vault.ics"');
  res.send(icsContent);
});

const SEO_AEO_OPTIMIZATION_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    optimizedKeyword: {
      type: Type.STRING,
      description: 'Zoptymalizowana w czasie główna fraza kluczowa dopasowana do aktualnej intencji wyszukiwania i silników AEO.',
    },
    secondaryKeywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Maksymalnie 5 semantycznych fraz wspierających długiego ogona.',
    },
    seoScore: {
      type: Type.INTEGER,
      description: 'Ocena techniczna i treściowa SEO w skali 0-100.',
    },
    aeoScore: {
      type: Type.INTEGER,
      description: 'Ocena gotowości pod silniki odpowiedzi AEO (AI Overviews / Perplexity / ChatGPT) w skali 0-100.',
    },
    projectedReachLiftPct: {
      type: Type.INTEGER,
      description: 'Szacowany procentowy wzrost zasięgu organicznego i społecznościowego po wdrożeniu zmian.',
    },
    anomalyClassification: {
      type: Type.STRING,
      description: 'Wykryty stan: none, reach_drop, keyword_decay, aeo_gap lub viral_spike.',
    },
    optimizedContentExcerpt: {
      type: Type.STRING,
      description: 'Zoptymalizowana treść posta/sekcji zawierająca zwięzły blok bezpośredniej odpowiedzi AEO (40-60 słów) i naturalne nasycenie nową frazą.',
    },
    socialMediaAdaptation: {
      type: Type.STRING,
      description: 'Gotowa adaptacja posta do mediów społecznościowych (LinkedIn / Instagram / X) ukierunkowana na maksymalizację zasięgu.',
    },
    reachAndStrategyInsights: {
      type: Type.STRING,
      description: 'Konkretne wnioski dotyczące zasięgu organicznego, zasięgu społecznościowego oraz uzasadnienie ewolucji frazy w czasie.',
    },
    schemaJsonLdSnippet: {
      type: Type.STRING,
      description: 'Fragment JSON-LD (FAQPage lub Article) zwiększający widoczność w AEO i Rich Results.',
    },
  },
  required: [
    'optimizedKeyword',
    'secondaryKeywords',
    'seoScore',
    'aeoScore',
    'projectedReachLiftPct',
    'anomalyClassification',
    'optimizedContentExcerpt',
    'socialMediaAdaptation',
    'reachAndStrategyInsights',
    'schemaJsonLdSnippet',
  ],
};

// 7. AI SEO & AEO Content Monitor & Temporal Keyword Optimizer Endpoint
app.post('/api/seo-control/analyze-and-optimize', async (req, res) => {
  const startedAt = Date.now();
  try {
    const {
      title = '',
      channel = 'web_page',
      urlOrSlug = '',
      contentExcerpt = '',
      primaryKeyword = '',
      keywordHistory = [],
      organicReach = 0,
      socialReach = 0,
    } = req.body as {
      title?: string;
      channel?: string;
      urlOrSlug?: string;
      contentExcerpt?: string;
      primaryKeyword?: string;
      keywordHistory?: string[];
      organicReach?: number;
      socialReach?: number;
    };

    if (!title.trim() || !contentExcerpt.trim()) {
      res.status(400).json({ error: 'Podaj tytuł oraz treść strony lub posta do analizy SEO/AEO.' });
      return;
    }

    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: `Przeprowadź audyt oraz automatyczną optymalizację w czasie dla poniższego zasobu treści (rok bieżący: ${new Date().getFullYear()}).
Kanał: ${channel}
Adres / Slug: ${urlOrSlug || 'brak'}
Tytuł: ${title.slice(0, 200)}
Aktualna fraza kluczowa: ${primaryKeyword.slice(0, 140)}
Historia ewolucji fraz: ${Array.isArray(keywordHistory) ? keywordHistory.slice(0, 10).join(' -> ') : 'brak'}
Aktualny zasięg organiczny: ${Number(organicReach) || 0}
Aktualny zasięg społecznościowy: ${Number(socialReach) || 0}

Monitorowana treść:
"""
${contentExcerpt.slice(0, 3000)}
"""`,
      config: {
        systemInstruction:
          'Jesteś silnikiem AI monitorującym treści internetowe, SEO (Search Engine Optimization) oraz AEO (Answer Engine Optimization). 1) Oceń aktualne SEO (0-100) i AEO (0-100). 2) Zoptymalizuj główną frazę kluczową w czasie — wyeliminuj zdezaktualizowane roczniki/ogólniki i zastąp je precyzyjną frazą wysokiej intencji dopasowaną do zapytań wyszukiwarkowych i konwersacyjnych. 3) Przepisz fragment treści (optimizedContentExcerpt) tak, aby zaczynał się od klarownej bezpośredniej odpowiedzi pod cytowania AEO, oraz przygotuj wersję pod media społecznościowe (socialMediaAdaptation) wraz z wnioskami dotyczącymi zasięgu organicznego i społecznościowego. Odpowiadaj po polsku.',
        responseMimeType: 'application/json',
        responseSchema: SEO_AEO_OPTIMIZATION_SCHEMA,
      },
    });

    const parsed = JSON.parse((response.text ?? '{}').trim());
    const elapsedMs = Date.now() - startedAt;

    emitCloudFunctionEvent({
      triggerType: 'seo.keyword.optimized',
      source: `/seo-control/${channel}`,
      executionMs: elapsedMs,
      payloadBytes: contentExcerpt.length + 512,
      status: 'succeeded',
      summary: `Zoptymalizowano frazę "${primaryKeyword}" -> "${parsed.optimizedKeyword || primaryKeyword}" (SEO ${parsed.seoScore}/100, AEO ${parsed.aeoScore}/100).`,
    });

    if (parsed.anomalyClassification && parsed.anomalyClassification !== 'none') {
      emitCloudFunctionEvent({
        triggerType: 'seo.anomaly.detected',
        source: `/seo-control/${channel}`,
        executionMs: 8,
        payloadBytes: 320,
        status: 'warning',
        summary: `Wykryto anomalię [${parsed.anomalyClassification}] dla zasobu "${title.slice(0, 60)}".`,
      });
    }

    res.json(parsed);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Błąd silnika AI monitorującego SEO i AEO.';
    recordSystemError({
      subsystem: 'SEO/AEO AI',
      severity: 'critical',
      message,
      routeOrComponent: '/api/seo-control/analyze-and-optimize',
    });
    res.status(500).json({ error: message });
  }
});

// 8. Cyclical PDF Summary Report & Email Dispatch Endpoint
app.post('/api/seo-control/dispatch-report-email', async (req, res) => {
  const startedAt = Date.now();
  try {
    const {
      scheduleName = 'Cykliczny Raport SEO, AEO i Zasięgu',
      recipients = [],
      cadence = 'weekly',
      pdfFileName = 'chronos-raport-seo-aeo.pdf',
      pdfBase64 = '',
      summaryHighlights = '',
    } = req.body as {
      scheduleName?: string;
      recipients?: string[];
      cadence?: 'daily' | 'weekly' | 'monthly' | 'manual';
      pdfFileName?: string;
      pdfBase64?: string;
      summaryHighlights?: string;
    };

    const validRecipients = (Array.isArray(recipients) ? recipients : [])
      .map((e) => String(e).trim().toLowerCase())
      .filter((e) => e.length >= 3 && e.includes('@'))
      .slice(0, 10);

    if (validRecipients.length === 0) {
      res.status(400).json({ error: 'Podaj co najmniej jeden poprawny adres e-mail odbiorcy raportu PDF.' });
      return;
    }
    if (!pdfBase64) {
      res.status(400).json({ error: 'Brak wygenerowanego załącznika PDF do wysyłki.' });
      return;
    }

    const cleanBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '');
    const pdfBuffer = Buffer.from(cleanBase64, 'base64');
    const sha256Digest = crypto.createHash('sha256').update(pdfBuffer).digest('hex');

    const bodyText = [
      `Podsumowanie cykliczne: ${scheduleName}`,
      `Tryb harmonogramu: ${cadence}`,
      `Data wygenerowania: ${new Date().toISOString()}`,
      `Suma kontrolna załącznika PDF (SHA-256): ${sha256Digest}`,
      ``,
      summaryHighlights || 'Załączono pełny raport wykresów i metryk SEO, AEO, zasięgu oraz anomalii.',
    ].join('\n');

    const emlContent = buildRfc5322MimeEmail({
      recipients: validRecipients,
      subject: `[Chronos Vault] ${scheduleName}`,
      bodyText,
      pdfFileName,
      pdfBase64: cleanBase64,
    });

    let transportMode: 'webhook_relay' | 'rfc5322_mime_spool' = 'rfc5322_mime_spool';
    let statusDetail = `Zapakowano wiadomość RFC-5322 MIME z załącznikiem PDF (${Math.round(pdfBuffer.byteLength / 1024)} KB) dla ${validRecipients.join(', ')} i zarejestrowano w wyzwalaczu serwerowym.`;

    const relayUrl = process.env.EMAIL_WEBHOOK_URL?.trim();
    if (relayUrl && isSafeExternalUrl(relayUrl)) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 5000);
        const relayResp = await fetch(relayUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: validRecipients,
            subject: `[Chronos Vault] ${scheduleName}`,
            text: bodyText,
            attachment: {
              filename: pdfFileName,
              contentType: 'application/pdf',
              base64: cleanBase64,
            },
          }),
          signal: ctrl.signal,
        });
        clearTimeout(timer);
        if (relayResp.ok) {
          transportMode = 'webhook_relay';
          statusDetail = `Wysłano raport PDF przez zewnętrzny przekaźnik pocztowy (HTTP ${relayResp.status}) do: ${validRecipients.join(', ')}.`;
        }
      } catch (relayErr: unknown) {
        statusDetail =
          relayErr instanceof Error
            ? `Przekaźnik EMAIL_WEBHOOK_URL niedostępny (${relayErr.message}) — zapisano gotowy pakiet MIME .eml w kolejce serwerowej.`
            : statusDetail;
      }
    }

    const receipt = {
      id: `mail_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      scheduleName: scheduleName.slice(0, 140),
      recipients: validRecipients,
      cadence,
      dispatchedAt: new Date().toISOString(),
      pdfFileName,
      pdfSizeBytes: pdfBuffer.byteLength,
      sha256Digest,
      transportMode,
      statusDetail,
      emlContent,
    };

    recordEmailDispatchReceipt(receipt);

    emitCloudFunctionEvent({
      triggerType: 'reports.pdf.dispatched',
      source: '/functions/v2/scheduledPdfDigestMailer',
      executionMs: Date.now() - startedAt,
      payloadBytes: pdfBuffer.byteLength,
      status: 'succeeded',
      summary: `Wysłano cykliczny raport PDF "${pdfFileName}" (${Math.round(pdfBuffer.byteLength / 1024)} KB) -> ${validRecipients.join(', ')}.`,
    });

    res.json({ receipt });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Błąd wysyłki raportu PDF na e-mail.';
    recordSystemError({
      subsystem: 'PDF Mailer',
      severity: 'warning',
      message,
      routeOrComponent: '/api/seo-control/dispatch-report-email',
    });
    res.status(500).json({ error: message });
  }
});

// 9. Central Control Plane Telemetry, Auto-Scaler, Cloud Functions & Error Reporting Endpoints
app.get('/api/system/control-plane', (_req, res) => {
  res.json(getControlPlaneSnapshot());
});

app.post('/api/system/autoscale/config', (req, res) => {
  const updated = updateAutoScaleConfig(req.body || {});
  res.json({ autoScale: updated });
});

app.post('/api/system/autoscale/burst', async (req, res) => {
  try {
    const { concurrentDocuments = 180 } = (req.body || {}) as { concurrentDocuments?: number };
    const burstResult = await runConcurrentAnalysisBurst(concurrentDocuments);
    res.json({
      burstResult,
      controlPlane: getControlPlaneSnapshot(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Błąd testu obciążeniowego Auto-Scalera.';
    res.status(500).json({ error: message });
  }
});

app.post('/api/system/cloud-events/emit', (req, res) => {
  const {
    triggerType = 'seo.content.evaluated',
    source = '/client/manual-trigger',
    summary = 'Ręczne wyzwolenie zdarzenia Cloud Functions v2 z Centralnego Panelu Sterowania.',
  } = (req.body || {}) as {
    triggerType?: CloudTriggerType;
    source?: string;
    summary?: string;
  };
  const evt = emitCloudFunctionEvent({
    triggerType,
    source,
    executionMs: 11,
    payloadBytes: 640,
    status: 'succeeded',
    summary,
  });
  res.json({ event: evt });
});

app.post('/api/system/errors/report', (req, res) => {
  const {
    subsystem = 'UI Runtime',
    severity = 'warning',
    message = 'Zarejestrowano wyjątek diagnostyczny',
    routeOrComponent = '/app/control-center',
    stackPreview = '',
  } = (req.body || {}) as {
    subsystem?: ReportedErrorRecord['subsystem'];
    severity?: ReportedErrorRecord['severity'];
    message?: string;
    routeOrComponent?: string;
    stackPreview?: string;
  };
  const recorded = recordSystemError({
    subsystem,
    severity,
    message,
    routeOrComponent,
    stackPreview,
  });
  res.json({ errorRecord: recorded });
});

app.post('/api/system/errors/resolve', (req, res) => {
  const { errorId = '' } = (req.body || {}) as { errorId?: string };
  const resolved = resolveSystemError(String(errorId));
  if (!resolved) {
    res.status(404).json({ error: 'Nie znaleziono zgłoszenia błędu o podanym identyfikatorze.' });
    return;
  }
  res.json({ errorRecord: resolved });
});

// ============================================================================
// TaskKill Studio Unified Bridge (Bidirectional tasks.json + MindNode UI)
// ============================================================================
const TASKKILL_CANDIDATES = [
  process.env.TASKKILL_DIR,
  '/Users/krzysztofjarzyna/Web - Strona główna/zarzadzanie-praca-offline'.normalize('NFD'),
  '/Users/krzysztofjarzyna/Web - Strona główna/zarzadzanie-praca-offline'.normalize('NFC'),
  path.join(__dirname, 'taskkill-assets'),
].filter((p): p is string => Boolean(p));
const TASKKILL_DIR =
  TASKKILL_CANDIDATES.find((p) => fs.existsSync(p)) || TASKKILL_CANDIDATES[0];
const TASKKILL_MAPS_DIR = path.join(TASKKILL_DIR, 'mindmaps');
const TASKKILL_REGISTRY_FILE = path.join(TASKKILL_MAPS_DIR, 'registry.json');

interface MindMapMeta {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  isDefault?: boolean;
}

function ensureMindMapsDir() {
  if (!fs.existsSync(TASKKILL_MAPS_DIR)) {
    fs.mkdirSync(TASKKILL_MAPS_DIR, { recursive: true });
  }
}

function sanitizeMapId(raw: unknown): string {
  const s = String(raw || 'bmclinic')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48);
  return s || 'bmclinic';
}

function getMapFiles(mapId: string) {
  const safeId = sanitizeMapId(mapId);
  ensureMindMapsDir();
  if (safeId === 'bmclinic') {
    return {
      id: 'bmclinic',
      tasksFile: path.join(TASKKILL_DIR, 'tasks.json'),
      layoutFile: path.join(TASKKILL_DIR, 'layout.json'),
      notesFile: path.join(TASKKILL_MAPS_DIR, 'bmclinic.notes.md'),
    };
  }
  return {
    id: safeId,
    tasksFile: path.join(TASKKILL_MAPS_DIR, `${safeId}.tasks.json`),
    layoutFile: path.join(TASKKILL_MAPS_DIR, `${safeId}.layout.json`),
    notesFile: path.join(TASKKILL_MAPS_DIR, `${safeId}.notes.md`),
  };
}

function readMindMapRegistry(): MindMapMeta[] {
  ensureMindMapsDir();
  const defaultMap: MindMapMeta = {
    id: 'bmclinic',
    name: 'BM Clinic — bmclinic.co',
    description: 'Główna mapa myśli projektu strony i platformy kliniki',
    createdAt: '2026-11-23T00:00:00.000Z',
    isDefault: true,
  };
  let custom: MindMapMeta[] = [];
  if (fs.existsSync(TASKKILL_REGISTRY_FILE)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(TASKKILL_REGISTRY_FILE, 'utf-8'));
      if (Array.isArray(parsed)) {
        custom = parsed.filter((m) => m && m.id && m.id !== 'bmclinic');
      }
    } catch {
      custom = [];
    }
  }
  return [defaultMap, ...custom];
}

function writeMindMapRegistry(maps: MindMapMeta[]) {
  ensureMindMapsDir();
  const custom = maps.filter((m) => m.id !== 'bmclinic');
  const tmpFile = `${TASKKILL_REGISTRY_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(custom, null, 2), 'utf-8');
  fs.renameSync(tmpFile, TASKKILL_REGISTRY_FILE);
}

app.get('/api/mindmaps', (_req, res) => {
  try {
    const maps = readMindMapRegistry().map((m) => {
      const files = getMapFiles(m.id);
      let taskCount = 0;
      let updatedAt = m.createdAt;
      if (fs.existsSync(files.tasksFile)) {
        try {
          const parsed = JSON.parse(fs.readFileSync(files.tasksFile, 'utf-8'));
          if (Array.isArray(parsed)) taskCount = parsed.length;
          updatedAt = fs.statSync(files.tasksFile).mtime.toISOString();
        } catch {}
      }
      const notes = fs.existsSync(files.notesFile)
        ? fs.readFileSync(files.notesFile, 'utf-8')
        : '';
      return { ...m, taskCount, updatedAt, notes };
    });
    res.setHeader('Cache-Control', 'no-store');
    res.json({ maps });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/mindmaps', (req, res) => {
  try {
    const name = String(req.body?.name || '').trim().slice(0, 80);
    const description = String(req.body?.description || '').trim().slice(0, 240);
    if (!name) {
      res.status(400).json({ error: 'Podaj nazwę nowej mapy myśli.' });
      return;
    }
    const existing = readMindMapRegistry();
    const baseSlug = sanitizeMapId(
      name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ł/gi, 'l')
    );
    let candidate = baseSlug === 'bmclinic' ? `mapa-${Date.now().toString(36)}` : baseSlug;
    while (existing.some((m) => m.id === candidate)) {
      candidate = `${baseSlug}-${Math.random().toString(36).slice(2, 5)}`;
    }
    const now = new Date().toISOString();
    const newMap: MindMapMeta = {
      id: candidate,
      name,
      description: description || `Mapa myśli projektu: ${name}`,
      createdAt: now,
    };
    const files = getMapFiles(candidate);
    const today = now.slice(0, 10);
    const starterTasks = [
      {
        id: 1,
        title: `Start: ${name}`,
        body: description || `Pierwszy węzeł nowej mapy myśli "${name}". Dodawaj kolejne gałęzie i zadania.`,
        status: 'In Progress',
        priority: 'Wysoki',
        type: 'Feature',
        labels: ['Plan główny'],
        assignee: 'Zespół',
        startDate: today,
        endDate: today,
      },
    ];
    fs.writeFileSync(files.tasksFile, JSON.stringify(starterTasks, null, 2), 'utf-8');
    fs.writeFileSync(files.notesFile, `# ${name}\n\nWspólna notatka projektu...\n`, 'utf-8');
    writeMindMapRegistry([...existing, newMap]);
    res.status(201).json({
      map: { ...newMap, taskCount: starterTasks.length, updatedAt: now, notes: `# ${name}\n\nWspólna notatka projektu...\n` },
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.delete('/api/mindmaps/:id', (req, res) => {
  try {
    const id = sanitizeMapId(req.params.id);
    if (id === 'bmclinic') {
      res.status(400).json({ error: 'Nie można usunąć głównej mapy myśli BM Clinic.' });
      return;
    }
    const existing = readMindMapRegistry();
    const next = existing.filter((m) => m.id !== id);
    writeMindMapRegistry(next);
    const files = getMapFiles(id);
    [files.tasksFile, files.layoutFile, files.notesFile].forEach((f) => {
      if (fs.existsSync(f)) fs.unlinkSync(f);
    });
    res.json({ ok: true, id });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/api/mindmaps/:id/notes', (req, res) => {
  try {
    const files = getMapFiles(req.params.id);
    const notes = fs.existsSync(files.notesFile)
      ? fs.readFileSync(files.notesFile, 'utf-8')
      : '';
    res.setHeader('Cache-Control', 'no-store');
    res.json({ id: files.id, notes });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/mindmaps/:id/notes', (req, res) => {
  try {
    const files = getMapFiles(req.params.id);
    const notes = String(req.body?.notes ?? '');
    const tmpFile = `${files.notesFile}.tmp`;
    fs.writeFileSync(tmpFile, notes, 'utf-8');
    fs.renameSync(tmpFile, files.notesFile);
    res.json({ ok: true, id: files.id, updatedAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/api/tasks', (req, res) => {
  try {
    const files = getMapFiles(req.query.map);
    if (!fs.existsSync(files.tasksFile)) {
      res.status(204).end();
      return;
    }
    const raw = fs.readFileSync(files.tasksFile, 'utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.send(raw);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/tasks', (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      res.status(400).json({ error: 'Expected JSON array of tasks' });
      return;
    }
    const files = getMapFiles(req.query.map);
    const tmpFile = `${files.tasksFile}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(req.body, null, 2), 'utf-8');
    fs.renameSync(tmpFile, files.tasksFile);
    res.json({ ok: true, map: files.id, count: req.body.length });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/api/layout', (req, res) => {
  try {
    const files = getMapFiles(req.query.map);
    if (!fs.existsSync(files.layoutFile)) {
      res.status(204).end();
      return;
    }
    const raw = fs.readFileSync(files.layoutFile, 'utf-8');
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.send(raw);
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.post('/api/layout', (req, res) => {
  try {
    if (!req.body || typeof req.body !== 'object') {
      res.status(400).json({ error: 'Expected JSON object for layout' });
      return;
    }
    const files = getMapFiles(req.query.map);
    const tmpFile = `${files.layoutFile}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(req.body, null, 2), 'utf-8');
    fs.renameSync(tmpFile, files.layoutFile);
    res.json({ ok: true, map: files.id });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// ============================================================================
// Team Invites & Mobile PWA Onboarding (Google Workspace / bmclinic.co)
// ============================================================================
const INVITES_FILE = path.join(TASKKILL_MAPS_DIR, 'invites.json');

interface WorkspaceInviteRecord {
  token: string;
  email: string;
  name: string;
  role: 'admin' | 'lekarz' | 'zespol';
  createdAt: string;
  acceptedAt?: string;
}

function readInvites(): WorkspaceInviteRecord[] {
  ensureMindMapsDir();
  if (!fs.existsSync(INVITES_FILE)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(INVITES_FILE, 'utf-8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeInvites(invites: WorkspaceInviteRecord[]) {
  ensureMindMapsDir();
  const tmpFile = `${INVITES_FILE}.tmp`;
  fs.writeFileSync(tmpFile, JSON.stringify(invites, null, 2), 'utf-8');
  fs.renameSync(tmpFile, INVITES_FILE);
}

app.get('/api/invites', (req, res) => {
  const baseUrl =
    process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
      ? process.env.APP_URL.replace(/\/$/, '')
      : `${req.protocol}://${req.get('host')}`;
  const invites = readInvites().map((inv) => ({
    ...inv,
    inviteUrl: `${baseUrl}/?invite=${encodeURIComponent(inv.token)}`,
  }));
  res.setHeader('Cache-Control', 'no-store');
  res.json({ invites, baseUrl });
});

app.post('/api/invites', (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const name = String(req.body?.name || '').trim().slice(0, 80);
    const rawRole = String(req.body?.role || 'zespol');
    const role: WorkspaceInviteRecord['role'] =
      rawRole === 'admin' || rawRole === 'lekarz' ? rawRole : 'zespol';

    if (!email || !email.includes('@')) {
      res.status(400).json({ error: 'Podaj poprawny adres e-mail.' });
      return;
    }

    const token = crypto.randomBytes(16).toString('hex');
    const record: WorkspaceInviteRecord = {
      token,
      email,
      name: name || email.split('@')[0],
      role,
      createdAt: new Date().toISOString(),
    };
    const all = [record, ...readInvites().filter((i) => i.email !== email)];
    writeInvites(all);

    const baseUrl =
      process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL'
        ? process.env.APP_URL.replace(/\/$/, '')
        : `${req.protocol}://${req.get('host')}`;
    const inviteUrl = `${baseUrl}/?invite=${encodeURIComponent(token)}`;
    const emailSubject = 'Zaproszenie do aplikacji Chronos Vault — BM Clinic (bmclinic.co)';
    const emailBody = [
      `Cześć ${record.name},`,
      '',
      'Zapraszamy Cię do zespołowej aplikacji Chronos Vault (BM Clinic / bmclinic.co).',
      'Kliknij poniższy link na telefonie lub komputerze, zaloguj się kontem Google Workspace i zainstaluj aplikację jednym kliknięciem:',
      '',
      inviteUrl,
      '',
      'Po instalacji ikona Chronos Vault pojawi się na ekranie głównym Twojego telefonu.',
    ].join('\n');

    res.status(201).json({
      invite: { ...record, inviteUrl },
      emailSubject,
      emailBody,
      mailtoUrl: `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

app.get('/api/invites/verify', (req, res) => {
  const token = String(req.query.token || '').trim();
  if (!token) {
    res.status(400).json({ valid: false, error: 'Brak tokenu zaproszenia.' });
    return;
  }
  const found = readInvites().find((i) => i.token === token);
  if (!found) {
    res.status(404).json({ valid: false, error: 'Zaproszenie wygasło lub jest nieprawidłowe.' });
    return;
  }
  res.json({ valid: true, invite: found });
});

console.log(`[TaskKill Bridge] Mounted directory: ${TASKKILL_DIR} (exists=${fs.existsSync(TASKKILL_DIR)})`);
app.use('/taskkill', express.static(TASKKILL_DIR, { etag: false, maxAge: 0 }));
app.get('/taskkill/*', (_req, res) => {
  res.status(404).send('TaskKill asset not found');
});

async function startServer() {
  const PORT = Number(process.env.PORT) || 3002;

  // Always serve self-unregistering /sw.js so stale PWA caches never intercept /taskkill or new builds
  app.get('/sw.js', (_req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.send(`
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
`);
  });

  // Mount Sentinel Shield & Process Killer Toolkit embedded React apps (compiled Vite ESM modules + .vite deps)
  for (const mountName of ['sentinel-shield', 'sentinel-toolkit']) {
    const mountDir = fs.existsSync(path.join(__dirname, 'public', mountName))
      ? path.join(__dirname, 'public', mountName)
      : path.join(__dirname, 'dist', mountName);
    if (fs.existsSync(mountDir)) {
      app.use(
        `/${mountName}`,
        express.static(mountDir, {
          dotfiles: 'allow',
          etag: false,
          maxAge: 0,
          setHeaders(res, filePath) {
            if (
              filePath.endsWith('.tsx') ||
              filePath.endsWith('.ts') ||
              filePath.endsWith('.css') ||
              filePath.endsWith('@vite/client')
            ) {
              res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
            }
          },
        })
      );
    }
  }

  // Google Drive 1-minute auto-sync API (kontakt@bmclinic.co) — registered BEFORE SPA fallback
  app.get('/api/gdrive-sync/status', (_req, res) => {
    res.json(getGoogleDriveSyncStatus());
  });
  app.post('/api/gdrive-sync/now', (req, res) => {
    const payload = req.body && typeof req.body === 'object' ? req.body : undefined;
    res.json(syncNowToGoogleDrive(__dirname, payload));
  });
  startGoogleDriveAutoSync(__dirname);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { server: httpServer },
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Chronos Vault server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
