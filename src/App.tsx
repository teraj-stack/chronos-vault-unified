/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  Mic,
  PenTool,
  Bell,
  Sun,
  Moon,
  Lock,
  Trash2,
  CheckCircle2,
  Clock,
  Users,
  Cloud,
  Search,
  LogOut,
  ArrowRight,
  FolderPlus,
  X,
  FileDown,
  FileSpreadsheet,
  CheckSquare,
  Square,
  ShieldAlert,
  Activity,
  Gauge,
  GitBranch,
} from 'lucide-react';
import {
  db,
  signInWithGoogle,
  signOutUser,
  initWorkspaceAuth,
  getAccessToken,
  handleFirestoreError,
  OperationType,
  type User,
} from './lib/firebase';
import {
  encryptTextE2EE,
  decryptTextE2EE,
  computeKeyFingerprint,
  isCiphertext,
} from './lib/crypto';
import {
  requestPushNotificationPermission,
  sendPushNotification,
  useOnlineStatus,
} from './lib/pwa';
import {
  exportTasksToCSV,
  exportTasksToPDF,
  type ExportableTask,
  type GeneratedPDFReport,
} from './lib/export';
import {
  createGoogleCalendarEvent,
  formatLocalDateTimeInput,
  normalizeDateTimeString,
} from './lib/calendarSync';
import {
  VoiceAndHandwritingModal,
  type ExtractedTaskDraft,
} from './components/VoiceAndHandwritingModal';
import { AnalyticsAndReportsView } from './components/AnalyticsAndReportsView';
import { CalendarSyncView } from './components/CalendarSyncView';
import { TeamAndSecurityView, type WorkspaceListModel } from './components/TeamAndSecurityModal';
import { PWAInstallButton, OfflineIndicator } from './components/PWAWidgets';
import {
  AIWorkOptimizerAndMalwareView,
  type TaskOptimizationPatch,
} from './components/AIWorkOptimizerAndMalwareView';
import { ClinicEquipmentView } from './components/ClinicEquipmentView';
import {
  createInitialDemoDevices,
  createInitialDemoTreatments,
  type ClinicDeviceRecord,
  type ClinicTreatmentRecord,
} from './lib/clinicModels';
import { CentralControlPanelView } from './components/CentralControlPanelView';
import {
  MobileInviteOnboardingOverlay,
  WorkspaceInviteGeneratorModal,
} from './components/WorkspaceInviteOnboarding';
import {
  createInitialSeoAssets,
  createInitialDemoProfiles,
  createInitialReportSchedule,
  type SeoContentAssetRecord,
  type SharedUserProfileRecord,
  type SeoReportScheduleRecord,
} from './lib/seoPredictiveEngine';

interface StoredTaskRecord {
  id: string;
  listId: string;
  title: string; // May be E2EE ciphertext in Firestore/storage
  description: string; // May be E2EE ciphertext in Firestore/storage
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  reminderAt: string;
  estimatedMinutes: number;
  tags: string[];
  sourceType: 'manual' | 'voice' | 'handwriting' | 'calendar';
  isEncrypted: boolean;
  assigneeEmail: string;
  ownerId: string;
  collaboratorEmails: string[];
  externalCalendarPlatform: string;
}

const TASKKILL_LIST_ID = 'list_taskkill_studio';

interface TaskKillRawTask {
  id: number;
  title: string;
  body?: string;
  status?: string;
  priority?: string;
  type?: string;
  labels?: string[];
  assignee?: string;
  startDate?: string;
  endDate?: string;
  url?: string;
}

function mapTaskKillStatusToChronos(status?: string): StoredTaskRecord['status'] {
  const s = (status || '').toLowerCase();
  if (s === 'done' || s === 'gotowe' || s === 'completed') return 'done';
  if (s === 'in progress' || s === 'w trakcie') return 'in_progress';
  if (s === 'review' || s === 'wstrzymane' || s === 'blocked' || s === 'on hold') return 'review';
  return 'todo';
}

function mapChronosStatusToTaskKill(status: StoredTaskRecord['status']): string {
  if (status === 'done') return 'Done';
  if (status === 'in_progress') return 'In Progress';
  if (status === 'review') return 'On Hold';
  return 'Backlog';
}

function mapTaskKillPriorityToChronos(priority?: string): StoredTaskRecord['priority'] {
  const p = (priority || '').toLowerCase();
  if (p.includes('kryt') || p.includes('urgent')) return 'urgent';
  if (p.includes('wysok') || p.includes('high')) return 'high';
  if (p.includes('nisk') || p.includes('low')) return 'low';
  return 'medium';
}

function mapChronosPriorityToTaskKill(priority: StoredTaskRecord['priority']): string {
  if (priority === 'urgent') return 'Krytyczny';
  if (priority === 'high') return 'Wysoki';
  if (priority === 'low') return 'Niski';
  return 'Średni';
}

const DEFAULT_LISTS: WorkspaceListModel[] = [
  {
    id: TASKKILL_LIST_ID,
    name: 'TaskKill Studio (bmclinic.co)',
    description: 'Zintegrowana baza zadań z Mapy Myśli TaskKill Studio (dwukierunkowa synchronizacja tasks.json)',
    ownerId: 'local_owner',
    ownerEmail: 'architekt@chronosvault.pl',
    memberEmails: ['bmclinic@bmclinic.co'],
    isEncrypted: false,
    color: 'indigo',
  },
  {
    id: 'default',
    name: 'Główny Sprint Produktowy',
    description: 'Zespół inżynieryjny i wdrożeniowy — bezpieczna tablica zadań z synchronizacją w chmurze',
    ownerId: 'local_owner',
    ownerEmail: 'architekt@chronosvault.pl',
    memberEmails: ['anna.kowalska@zespol.pl', 'piotr.nowak@zespol.pl'],
    isEncrypted: true,
    color: 'blue',
  },
  {
    id: 'list_marketing_q4',
    name: 'Kampania Wdrożeniowa i Analityka',
    description: 'Planowanie publikacji, raporty PDF/CSV oraz kalendarz wydarzeń',
    ownerId: 'local_owner',
    ownerEmail: 'architekt@chronosvault.pl',
    memberEmails: ['marta.wisniewska@zespol.pl'],
    isEncrypted: false,
    color: 'emerald',
  },
];

const INITIAL_DEMO_TASKS: StoredTaskRecord[] = [
  {
    id: 'task_demo_1',
    listId: 'default',
    title: 'Audyt reguł bezpieczeństwa Firestore i weryfikacja szyfrowania E2EE',
    description: 'Przeprowadzić testy penetracyjne Red-Team oraz potwierdzić szyfrowanie AES-256-GCM po stronie klienta.',
    status: 'in_progress',
    priority: 'urgent',
    dueDate: formatLocalDateTimeInput(new Date(Date.now() + 3600000 * 4)),
    reminderAt: formatLocalDateTimeInput(new Date(Date.now() + 3600000 * 2)),
    estimatedMinutes: 90,
    tags: ['Bezpieczeństwo', 'E2EE', 'Firestore'],
    sourceType: 'manual',
    isEncrypted: true,
    assigneeEmail: 'anna.kowalska@zespol.pl',
    ownerId: 'local_owner',
    collaboratorEmails: ['anna.kowalska@zespol.pl', 'piotr.nowak@zespol.pl'],
    externalCalendarPlatform: 'google:evt_demo_1',
  },
  {
    id: 'task_demo_2',
    listId: 'default',
    title: 'Transkrypcja notatki głosowej ze spotkania zarządu i podział zadań',
    description: 'Wyodrębniono automatycznie za pomocą modelu Gemini 3.5 Transcribe z nagrania głosowego.',
    status: 'todo',
    priority: 'high',
    dueDate: formatLocalDateTimeInput(new Date(Date.now() + 86400000)),
    reminderAt: formatLocalDateTimeInput(new Date(Date.now() + 43200000)),
    estimatedMinutes: 45,
    tags: ['Głos AI', 'Spotkanie'],
    sourceType: 'voice',
    isEncrypted: false,
    assigneeEmail: 'piotr.nowak@zespol.pl',
    ownerId: 'local_owner',
    collaboratorEmails: ['anna.kowalska@zespol.pl', 'piotr.nowak@zespol.pl'],
    externalCalendarPlatform: 'outlook:evt_demo_2',
  },
  {
    id: 'task_demo_3',
    listId: 'default',
    title: 'Odczyt odręcznych szkiców architektury z tablicy (OCR Vision)',
    description: 'Skonwertowano z odręcznej notatki za pomocą rozpoznawania pisma odręcznego AI.',
    status: 'review',
    priority: 'medium',
    dueDate: formatLocalDateTimeInput(new Date(Date.now() + 86400000 * 2)),
    reminderAt: '',
    estimatedMinutes: 60,
    tags: ['OCR', 'Architektura'],
    sourceType: 'handwriting',
    isEncrypted: false,
    assigneeEmail: 'anna.kowalska@zespol.pl',
    ownerId: 'local_owner',
    collaboratorEmails: ['anna.kowalska@zespol.pl'],
    externalCalendarPlatform: 'google:evt_demo_3',
  },
  {
    id: 'task_demo_4',
    listId: 'default',
    title: 'Eksport kwartalnego raportu produktywności do PDF i CSV',
    description: 'Wygenerowanie zestawienia czasowego i wykresów realizacji dla całego zespołu.',
    status: 'done',
    priority: 'medium',
    dueDate: formatLocalDateTimeInput(new Date()),
    reminderAt: '',
    estimatedMinutes: 30,
    tags: ['Raport', 'Analityka'],
    sourceType: 'calendar',
    isEncrypted: true,
    assigneeEmail: 'architekt@chronosvault.pl',
    ownerId: 'local_owner',
    collaboratorEmails: ['anna.kowalska@zespol.pl', 'piotr.nowak@zespol.pl'],
    externalCalendarPlatform: 'google:evt_demo_4',
  },
  {
    id: 'task_demo_5',
    listId: 'list_marketing_q4',
    title: 'Analiza konwersji i synchronizacja harmonogramu publikacji Q4',
    description: 'Zestawienie wyników kampanii wdrożeniowej oraz dwukierunkowa synchronizacja z Outlook Calendar.',
    status: 'done',
    priority: 'high',
    dueDate: formatLocalDateTimeInput(new Date(Date.now() - 86400000)),
    reminderAt: '',
    estimatedMinutes: 75,
    tags: ['Marketing', 'Q4'],
    sourceType: 'manual',
    isEncrypted: false,
    assigneeEmail: 'marta.wisniewska@zespol.pl',
    ownerId: 'local_owner',
    collaboratorEmails: ['marta.wisniewska@zespol.pl'],
    externalCalendarPlatform: 'outlook:evt_demo_5',
  },
];

const KANBAN_COLUMNS: Array<{
  id: StoredTaskRecord['status'];
  title: string;
  subtitle: string;
}> = [
  { id: 'todo', title: 'Do zrobienia', subtitle: 'Zaplanowane w kolejce' },
  { id: 'in_progress', title: 'W trakcie', subtitle: 'Aktywnie realizowane' },
  { id: 'review', title: 'Weryfikacja', subtitle: 'Oczekuje na przegląd zespołu' },
  { id: 'done', title: 'Ukończone', subtitle: 'Zakończone i zarchiwizowane' },
];

const PRIORITY_META: Record<
  StoredTaskRecord['priority'],
  { label: string; textClass: string }
> = {
  urgent: { label: 'Krytyczny', textClass: 'text-red-600 dark:text-red-400 font-semibold' },
  high: { label: 'Wysoki', textClass: 'text-amber-600 dark:text-amber-400 font-semibold' },
  medium: { label: 'Średni', textClass: 'text-blue-600 dark:text-sky-400 font-medium' },
  low: { label: 'Niski', textClass: 'text-slate-500 dark:text-slate-400' },
};

const SOURCE_META: Record<StoredTaskRecord['sourceType'], string> = {
  manual: 'Ręczne',
  voice: 'Notatka głosowa AI',
  handwriting: 'Pismo odręczne OCR',
  calendar: 'Kalendarz',
};

function sanitizeDocId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${rand}`.replace(/[^a-zA-Z0-9_-]/g, '');
}

export default function App() {
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [mobileKanbanCol, setMobileKanbanCol] = useState<StoredTaskRecord['status']>('in_progress');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Navigation & Theme
  type ActiveViewId =
    | 'control_center'
    | 'mindmap'
    | 'sentinel_shield'
    | 'kanban'
    | 'calendar'
    | 'clinic_devices'
    | 'analytics'
    | 'ai_security'
    | 'team';
  const [activeView, setActiveView] = useState<ActiveViewId>(() => {
    const saved = localStorage.getItem('chronos_active_view_v1') as ActiveViewId | null;
    const valid: ActiveViewId[] = [
      'control_center',
      'mindmap',
      'sentinel_shield',
      'kanban',
      'calendar',
      'clinic_devices',
      'analytics',
      'ai_security',
      'team',
    ];
    return saved && valid.includes(saved) ? saved : 'control_center';
  });
  useEffect(() => {
    localStorage.setItem('chronos_active_view_v1', activeView);
  }, [activeView]);
  const [sentinelSubApp, setSentinelSubApp] = useState<'shield' | 'toolkit'>(() => {
    const saved = localStorage.getItem('chronos_sentinel_subapp_v1');
    return saved === 'toolkit' ? 'toolkit' : 'shield';
  });
  useEffect(() => {
    localStorage.setItem('chronos_sentinel_subapp_v1', sentinelSubApp);
  }, [sentinelSubApp]);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('chronos_theme_v2');
    return saved ? saved === 'dark' : false;
  });

  // Auth, Workspace OAuth Token & Cloud State
  const [user, setUser] = useState<User | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(() => getAccessToken());
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const isOnline = useOnlineStatus();

  // Real-time Two-Way Calendar Sync toggle
  const [autoTwoWaySync, setAutoTwoWaySync] = useState<boolean>(true);

  // Selected Tasks State (for exporting selected or all tasks to PDF/CSV)
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);

  // Generated Indexed PDF Reports (for in-app full-text search & page-level preview)
  const [generatedPdfReports, setGeneratedPdfReports] = useState<GeneratedPDFReport[]>([]);
  const [activePdfReportId, setActivePdfReportId] = useState<string | null>(null);

  const registerGeneratedPdfReport = (report: GeneratedPDFReport) => {
    setGeneratedPdfReports((prev) => {
      const next = [report, ...prev];
      if (next.length > 8) {
        next.slice(8).forEach((old) => URL.revokeObjectURL(old.blobUrl));
        return next.slice(0, 8);
      }
      return next;
    });
    setActivePdfReportId(report.id);
  };

  // Lists & Tasks State (Hybrid: Local offline cache + Firestore real-time sync when signed in)
  const [lists, setLists] = useState<WorkspaceListModel[]>(() => {
    try {
      const cached = localStorage.getItem('chronos_offline_lists');
      const parsed: WorkspaceListModel[] = cached ? JSON.parse(cached) : DEFAULT_LISTS;
      if (!parsed.some((l) => l.id === TASKKILL_LIST_ID)) {
        return [DEFAULT_LISTS[0], ...parsed];
      }
      return parsed;
    } catch {
      return DEFAULT_LISTS;
    }
  });

  const [rawTasks, setRawTasks] = useState<StoredTaskRecord[]>(() => {
    try {
      const cached = localStorage.getItem('chronos_offline_tasks');
      return cached ? JSON.parse(cached) : INITIAL_DEMO_TASKS;
    } catch {
      return INITIAL_DEMO_TASKS;
    }
  });

  const [activeListId, setActiveListId] = useState<string>(TASKKILL_LIST_ID);

  // Multi-MindMap & Shared Notes State (persisted via /api/mindmaps)
  interface MindMapItem {
    id: string;
    name: string;
    description: string;
    taskCount: number;
    updatedAt: string;
    notes: string;
    isDefault?: boolean;
  }
  const [mindMaps, setMindMaps] = useState<MindMapItem[]>([
    {
      id: 'bmclinic',
      name: 'BM Clinic — bmclinic.co',
      description: 'Główna mapa myśli projektu strony i platformy kliniki',
      taskCount: 56,
      updatedAt: '',
      notes: '',
      isDefault: true,
    },
  ]);
  const [activeMindMapId, setActiveMindMapId] = useState<string>('bmclinic');
  const [showNewMindMapForm, setShowNewMindMapForm] = useState<boolean>(false);
  const [newMindMapName, setNewMindMapName] = useState<string>('');
  const [newMindMapDesc, setNewMindMapDesc] = useState<string>('');
  const [showMindMapNotes, setShowMindMapNotes] = useState<boolean>(false);
  const [mindMapNotesDraft, setMindMapNotesDraft] = useState<string>('');
  const [mindMapNotesStatus, setMindMapNotesStatus] = useState<string>('');

  const activeMindMap = useMemo(
    () => mindMaps.find((m) => m.id === activeMindMapId) || mindMaps[0],
    [mindMaps, activeMindMapId]
  );

  const loadMindMapsList = React.useCallback(async () => {
    try {
      const res = await fetch('/api/mindmaps', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data?.maps) && data.maps.length > 0) {
        setMindMaps(data.maps);
        const cur = data.maps.find((m: MindMapItem) => m.id === activeMindMapId) || data.maps[0];
        if (cur) setMindMapNotesDraft(cur.notes || '');
      }
    } catch {}
  }, [activeMindMapId]);

  useEffect(() => {
    loadMindMapsList();
  }, [loadMindMapsList]);

  useEffect(() => {
    const found = mindMaps.find((m) => m.id === activeMindMapId);
    if (found) setMindMapNotesDraft(found.notes || '');
  }, [activeMindMapId, mindMaps]);

  const handleCreateMindMap = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newMindMapName.trim();
    if (!trimmed) return;
    try {
      const res = await fetch('/api/mindmaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed, description: newMindMapDesc.trim() }),
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data?.map) {
        setMindMaps((prev) => [...prev, data.map]);
        setActiveMindMapId(data.map.id);
        setMindMapNotesDraft(data.map.notes || '');
        setNewMindMapName('');
        setNewMindMapDesc('');
        setShowNewMindMapForm(false);
        setInAppBanner(`Utworzono nową mapę myśli: „${data.map.name}”`);
      }
    } catch {}
  };

  const handleDeleteMindMap = async (id: string) => {
    if (id === 'bmclinic') return;
    try {
      const res = await fetch(`/api/mindmaps/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (!res.ok) return;
      setMindMaps((prev) => prev.filter((m) => m.id !== id));
      if (activeMindMapId === id) setActiveMindMapId('bmclinic');
      setInAppBanner('Usunięto mapę myśli.');
    } catch {}
  };

  const handleSaveMindMapNotes = async (nextNotes: string) => {
    setMindMapNotesDraft(nextNotes);
    setMindMapNotesStatus('Zapisywanie...');
    try {
      const res = await fetch(`/api/mindmaps/${encodeURIComponent(activeMindMapId)}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: nextNotes }),
      });
      if (res.ok) {
        setMindMaps((prev) =>
          prev.map((m) => (m.id === activeMindMapId ? { ...m, notes: nextNotes } : m))
        );
        setMindMapNotesStatus('Zapisano');
      }
    } catch {
      setMindMapNotesStatus('Błąd zapisu');
    }
  };

  // Bidirectional sync between Chronos Vault and active TaskKill Studio Mind Map (/api/tasks?map=...)
  const taskKillMetaRef = useRef<Map<string, TaskKillRawTask>>(new Map());
  const taskKillHydratedRef = useRef<boolean>(false);
  const taskKillLastPushedJsonRef = useRef<string>('');
  const [taskKillSyncCount, setTaskKillSyncCount] = useState<number>(0);

  const pullTaskKillTasks = React.useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks?map=${encodeURIComponent(activeMindMapId)}`, { cache: 'no-store' });
      if (!res.ok || res.status === 204) return;
      const items: TaskKillRawTask[] = await res.json();
      if (!Array.isArray(items)) return;

      const metaMap = new Map<string, TaskKillRawTask>();
      const mapped: StoredTaskRecord[] = items.map((t) => {
        const cid = `tk_${t.id}`;
        metaMap.set(cid, t);
        const dueDate = t.endDate
          ? (t.endDate.includes('T') ? t.endDate : `${t.endDate}T18:00`)
          : formatLocalDateTimeInput(new Date(Date.now() + 86400000));
        return {
          id: cid,
          listId: TASKKILL_LIST_ID,
          title: t.title || `Zadanie #${t.id}`,
          description: t.body || '',
          status: mapTaskKillStatusToChronos(t.status),
          priority: mapTaskKillPriorityToChronos(t.priority),
          dueDate,
          reminderAt: dueDate,
          estimatedMinutes: 60,
          tags: Array.isArray(t.labels) ? t.labels : [],
          sourceType: 'manual',
          isEncrypted: false,
          assigneeEmail: t.assignee || 'BM Clinic',
          ownerId: 'local_owner',
          collaboratorEmails: [],
          externalCalendarPlatform: '',
        };
      });

      taskKillMetaRef.current = metaMap;
      taskKillLastPushedJsonRef.current = JSON.stringify(items);
      taskKillHydratedRef.current = true;
      setTaskKillSyncCount(mapped.length);
      setRawTasks((prev) => {
        const nonTk = prev.filter((x) => x.listId !== TASKKILL_LIST_ID);
        return [...mapped, ...nonTk];
      });
    } catch {
      // Offline or tasks.json unavailable
    }
  }, [activeMindMapId]);

  useEffect(() => {
    pullTaskKillTasks();
  }, [pullTaskKillTasks]);

  useEffect(() => {
    if (activeView !== 'mindmap') {
      pullTaskKillTasks();
    }
  }, [activeView, pullTaskKillTasks]);

  useEffect(() => {
    if (!taskKillHydratedRef.current) return;
    const tkTasks = rawTasks.filter((t) => t.listId === TASKKILL_LIST_ID);
    let maxNumId = 0;
    tkTasks.forEach((t) => {
      const m = /^tk_(\d+)$/.exec(t.id);
      if (m) maxNumId = Math.max(maxNumId, Number(m[1]));
    });

    const serialized: TaskKillRawTask[] = tkTasks.map((t) => {
      const existing = taskKillMetaRef.current.get(t.id);
      const numMatch = /^tk_(\d+)$/.exec(t.id);
      const numId = existing?.id ?? (numMatch ? Number(numMatch[1]) : ++maxNumId);
      const endDate = t.dueDate ? t.dueDate.slice(0, 10) : existing?.endDate || '';
      return {
        ...(existing || {}),
        id: numId,
        title: t.title,
        body: t.description,
        status: mapChronosStatusToTaskKill(t.status),
        priority: mapChronosPriorityToTaskKill(t.priority),
        type: existing?.type || 'Task',
        labels: t.tags,
        assignee: t.assigneeEmail || existing?.assignee || 'BM Clinic',
        startDate: existing?.startDate || endDate,
        endDate,
      };
    });

    const nextJson = JSON.stringify(serialized);
    if (nextJson === taskKillLastPushedJsonRef.current) return;
    taskKillLastPushedJsonRef.current = nextJson;
    setTaskKillSyncCount(serialized.length);

    const mapToPush = activeMindMapId;
    const timer = window.setTimeout(() => {
      fetch(`/api/tasks?map=${encodeURIComponent(mapToPush)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: nextJson,
      }).catch(() => {});
    }, 300);
    return () => window.clearTimeout(timer);
  }, [rawTasks, activeMindMapId]);

  // Clinic Devices & Treatment Plans State (Offline cache + Firestore real-time sync)
  const [clinicDevices, setClinicDevices] = useState<ClinicDeviceRecord[]>(() => {
    try {
      const cached = localStorage.getItem('chronos_offline_clinic_devices');
      return cached ? JSON.parse(cached) : createInitialDemoDevices();
    } catch {
      return createInitialDemoDevices();
    }
  });

  const [clinicTreatments, setClinicTreatments] = useState<ClinicTreatmentRecord[]>(() => {
    try {
      const cached = localStorage.getItem('chronos_offline_clinic_treatments');
      return cached ? JSON.parse(cached) : createInitialDemoTreatments();
    } catch {
      return createInitialDemoTreatments();
    }
  });

  // Central Control Panel State: SEO/AEO Assets, Shared Profiles & Cyclical Report Schedule
  const [seoAssets, setSeoAssets] = useState<SeoContentAssetRecord[]>(() => {
    try {
      const cached = localStorage.getItem('chronos_offline_seo_assets');
      return cached ? JSON.parse(cached) : createInitialSeoAssets();
    } catch {
      return createInitialSeoAssets();
    }
  });

  const [sharedProfiles, setSharedProfiles] = useState<SharedUserProfileRecord[]>(() =>
    createInitialDemoProfiles()
  );

  const [myProfile, setMyProfile] = useState<SharedUserProfileRecord>(() => {
    try {
      const cached = localStorage.getItem('chronos_offline_my_profile');
      if (cached) return JSON.parse(cached);
    } catch {
      // ignore
    }
    return {
      id: 'local_owner',
      ownerId: 'local_owner',
      handle: 'architekt_seo_aeo',
      displayName: 'Architekt Chronos',
      roleTitle: 'Główny Strateg AI SEO & AEO',
      organizationOrDomain: 'chronosvault.pl',
      bio: 'Zarządzanie widocznością organiczną, cytowaniami AEO oraz analityką predykcyjną zasięgu.',
      specialties: ['SEO Semantyczne', 'AEO Citations', 'Predykcja Zasięgu', 'Cloud Functions'],
      isPubliclyShared: true,
      sharedAssetsCount: 5,
      avgPredictiveScore: 81,
    };
  });

  const [reportSchedule, setReportSchedule] = useState<SeoReportScheduleRecord>(() => {
    try {
      const cached = localStorage.getItem('chronos_offline_report_schedule');
      return cached ? JSON.parse(cached) : createInitialReportSchedule();
    } catch {
      return createInitialReportSchedule();
    }
  });

  // End-to-End Encryption State
  const [e2eePassphrase, setE2eePassphrase] = useState<string>(() => {
    return localStorage.getItem('chronos_e2ee_passphrase') || 'Chronos-Sejf-2026';
  });
  const [keyFingerprint, setKeyFingerprint] = useState<string>('');
  const [decryptedMap, setDecryptedMap] = useState<Record<string, { title: string; description: string }>>({});

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  // Modals
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);
  const [aiModalConfig, setAiModalConfig] = useState<{ open: boolean; tab: 'voice' | 'handwriting' }>({
    open: false,
    tab: 'voice',
  });

  // Push Notification state
  const [pushPermission, setPushPermission] = useState<NotificationPermission>(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [inAppBanner, setInAppBanner] = useState<string | null>(null);
  const [notifiedTaskIds, setNotifiedTaskIds] = useState<Record<string, boolean>>({});

  // New Task Form State
  const [taskListId, setTaskListId] = useState<string>('default');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskPriority, setTaskPriority] = useState<StoredTaskRecord['priority']>('medium');
  const [taskDueDate, setTaskDueDate] = useState(() =>
    formatLocalDateTimeInput(new Date(Date.now() + 86400000))
  );
  const [taskReminderAt, setTaskReminderAt] = useState('');
  const [taskMinutesInput, setTaskMinutesInput] = useState('30');
  const [taskTagsInput, setTaskTagsInput] = useState('Sprint, Priorytet');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskEncrypted, setTaskEncrypted] = useState(true);
  const [taskTargetCalendar, setTaskTargetCalendar] = useState<'google' | 'outlook' | 'local'>('google');
  const [taskFormError, setTaskFormError] = useState<string | null>(null);
  const [isSubmittingTask, setIsSubmittingTask] = useState(false);

  // Explicit User Confirmation Dialog when pushing newly created task to Google Calendar API
  const [pendingNewTaskGoogleSync, setPendingNewTaskGoogleSync] = useState<{
    id: string;
    title: string;
    description: string;
    dueDate: string;
    estimatedMinutes: number;
  } | null>(null);
  const [isSyncingNewTaskToGoogle, setIsSyncingNewTaskToGoogle] = useState(false);

  // New List Form State
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [newListEmails, setNewListEmails] = useState('');
  const [newListEncrypted, setNewListEncrypted] = useState(true);

  // Sync Dark Mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('chronos_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('chronos_theme', 'light');
    }
  }, [darkMode]);

  // Compute E2EE Key Fingerprint
  useEffect(() => {
    localStorage.setItem('chronos_e2ee_passphrase', e2eePassphrase);
    computeKeyFingerprint(e2eePassphrase).then(setKeyFingerprint);
  }, [e2eePassphrase]);

  // Persist offline cache to localStorage for immediate offline resilience
  useEffect(() => {
    try {
      localStorage.setItem('chronos_offline_lists', JSON.stringify(lists));
    } catch {
      // ignore storage quota errors
    }
  }, [lists]);

  useEffect(() => {
    try {
      localStorage.setItem('chronos_offline_tasks', JSON.stringify(rawTasks));
    } catch {
      // ignore storage quota errors
    }
  }, [rawTasks]);

  useEffect(() => {
    try {
      localStorage.setItem('chronos_offline_clinic_devices', JSON.stringify(clinicDevices));
    } catch {
      // ignore storage quota errors
    }
  }, [clinicDevices]);

  useEffect(() => {
    try {
      localStorage.setItem('chronos_offline_clinic_treatments', JSON.stringify(clinicTreatments));
    } catch {
      // ignore storage quota errors
    }
  }, [clinicTreatments]);

  useEffect(() => {
    try {
      localStorage.setItem('chronos_offline_seo_assets', JSON.stringify(seoAssets));
    } catch {
      // ignore storage quota errors
    }
  }, [seoAssets]);

  useEffect(() => {
    try {
      localStorage.setItem('chronos_offline_my_profile', JSON.stringify(myProfile));
    } catch {
      // ignore storage quota errors
    }
  }, [myProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('chronos_offline_report_schedule', JSON.stringify(reportSchedule));
    } catch {
      // ignore storage quota errors
    }
  }, [reportSchedule]);

  // Decrypt E2EE tasks whenever rawTasks or passphrase changes
  useEffect(() => {
    let cancelled = false;
    async function decryptAll() {
      const nextMap: Record<string, { title: string; description: string }> = {};
      for (const t of rawTasks) {
        const title = isCiphertext(t.title)
          ? await decryptTextE2EE(t.title, e2eePassphrase)
          : t.title;
        const description = isCiphertext(t.description)
          ? await decryptTextE2EE(t.description, e2eePassphrase)
          : t.description;
        nextMap[t.id] = { title, description };
      }
      if (!cancelled) {
        setDecryptedMap(nextMap);
      }
    }
    decryptAll();
    return () => {
      cancelled = true;
    };
  }, [rawTasks, e2eePassphrase]);

  // Firebase Auth & Workspace Token listener
  useEffect(() => {
    const unsub = initWorkspaceAuth(
      (currentUser, token) => {
        setUser(currentUser);
        if (token) setGoogleAccessToken(token);
        setAuthReady(true);
      },
      () => {
        setUser(null);
        setGoogleAccessToken(null);
        setAuthReady(true);
      }
    );
    return () => unsub();
  }, []);

  // Firestore Real-Time Listeners (Owner + Collaborator queries matching security rules)
  useEffect(() => {
    if (!authReady || !user || !user.emailVerified) return;

    const ownedListsQuery = query(
      collection(db, 'taskLists'),
      where('ownerId', '==', user.uid)
    );
    const sharedListsQuery = user.email
      ? query(collection(db, 'taskLists'), where('memberEmails', 'array-contains', user.email))
      : null;

    let ownedListsMap: Record<string, WorkspaceListModel> = {};
    let sharedListsMap: Record<string, WorkspaceListModel> = {};

    const mergeLists = () => {
      const combined = { ...ownedListsMap, ...sharedListsMap };
      const values = Object.values(combined);
      setLists([
        DEFAULT_LISTS[0],
        DEFAULT_LISTS[1],
        ...values.filter((l) => l.id !== 'default' && l.id !== 'list_marketing_q4'),
      ]);
    };

    const unsubOwnedLists = onSnapshot(
      ownedListsQuery,
      (snap) => {
        ownedListsMap = {};
        snap.forEach((docSnap) => {
          const d = docSnap.data();
          ownedListsMap[docSnap.id] = {
            id: docSnap.id,
            name: d.name,
            description: d.description,
            ownerId: d.ownerId,
            ownerEmail: d.ownerEmail,
            memberEmails: d.memberEmails || [],
            isEncrypted: !!d.isEncrypted,
            color: d.color || 'blue',
          };
        });
        mergeLists();
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'taskLists')
    );

    const unsubSharedLists = sharedListsQuery
      ? onSnapshot(
          sharedListsQuery,
          (snap) => {
            sharedListsMap = {};
            snap.forEach((docSnap) => {
              const d = docSnap.data();
              sharedListsMap[docSnap.id] = {
                id: docSnap.id,
                name: d.name,
                description: d.description,
                ownerId: d.ownerId,
                ownerEmail: d.ownerEmail,
                memberEmails: d.memberEmails || [],
                isEncrypted: !!d.isEncrypted,
                color: d.color || 'blue',
              };
            });
            mergeLists();
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'taskLists')
        )
      : () => {};

    // Tasks listeners
    const ownedTasksQuery = query(
      collection(db, 'tasks'),
      where('ownerId', '==', user.uid)
    );
    const sharedTasksQuery = user.email
      ? query(collection(db, 'tasks'), where('collaboratorEmails', 'array-contains', user.email))
      : null;

    let ownedTasksMap: Record<string, StoredTaskRecord> = {};
    let sharedTasksMap: Record<string, StoredTaskRecord> = {};

    const mergeTasks = () => {
      const combined = { ...ownedTasksMap, ...sharedTasksMap };
      const values = Object.values(combined);
      setRawTasks((prev) => {
        const localOnly = prev.filter((t) => t.ownerId === 'local_owner');
        const cloudIds = new Set(values.map((v) => v.id));
        return [...values, ...localOnly.filter((t) => !cloudIds.has(t.id))];
      });
    };

    const unsubOwnedTasks = onSnapshot(
      ownedTasksQuery,
      (snap) => {
        ownedTasksMap = {};
        snap.forEach((docSnap) => {
          const d = docSnap.data();
          ownedTasksMap[docSnap.id] = {
            id: docSnap.id,
            listId: d.listId || 'default',
            title: d.title || '',
            description: d.description || '',
            status: d.status || 'todo',
            priority: d.priority || 'medium',
            dueDate: d.dueDate || '',
            reminderAt: d.reminderAt || '',
            estimatedMinutes: typeof d.estimatedMinutes === 'number' ? d.estimatedMinutes : 30,
            tags: Array.isArray(d.tags) ? d.tags : [],
            sourceType: d.sourceType || 'manual',
            isEncrypted: !!d.isEncrypted,
            assigneeEmail: d.assigneeEmail || '',
            ownerId: d.ownerId,
            collaboratorEmails: Array.isArray(d.collaboratorEmails) ? d.collaboratorEmails : [],
            externalCalendarPlatform: d.externalCalendarPlatform || 'none',
          };
        });
        mergeTasks();
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'tasks')
    );

    const unsubSharedTasks = sharedTasksQuery
      ? onSnapshot(
          sharedTasksQuery,
          (snap) => {
            sharedTasksMap = {};
            snap.forEach((docSnap) => {
              const d = docSnap.data();
              sharedTasksMap[docSnap.id] = {
                id: docSnap.id,
                listId: d.listId || 'default',
                title: d.title || '',
                description: d.description || '',
                status: d.status || 'todo',
                priority: d.priority || 'medium',
                dueDate: d.dueDate || '',
                reminderAt: d.reminderAt || '',
                estimatedMinutes: typeof d.estimatedMinutes === 'number' ? d.estimatedMinutes : 30,
                tags: Array.isArray(d.tags) ? d.tags : [],
                sourceType: d.sourceType || 'manual',
                isEncrypted: !!d.isEncrypted,
                assigneeEmail: d.assigneeEmail || '',
                ownerId: d.ownerId,
                collaboratorEmails: Array.isArray(d.collaboratorEmails) ? d.collaboratorEmails : [],
                externalCalendarPlatform: d.externalCalendarPlatform || 'none',
              };
            });
            mergeTasks();
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'tasks')
        )
      : () => {};

    // Clinic Devices listeners
    const ownedDevicesQuery = query(
      collection(db, 'clinicDevices'),
      where('ownerId', '==', user.uid)
    );
    const sharedDevicesQuery = user.email
      ? query(
          collection(db, 'clinicDevices'),
          where('collaboratorEmails', 'array-contains', user.email)
        )
      : null;

    let ownedDevicesMap: Record<string, ClinicDeviceRecord> = {};
    let sharedDevicesMap: Record<string, ClinicDeviceRecord> = {};

    const mergeDevices = () => {
      const combined = { ...ownedDevicesMap, ...sharedDevicesMap };
      const values = Object.values(combined);
      setClinicDevices((prev) => {
        const localOnly = prev.filter((d) => d.ownerId === 'local_owner');
        const cloudIds = new Set(values.map((v) => v.id));
        return [...values, ...localOnly.filter((d) => !cloudIds.has(d.id))];
      });
    };

    const parseDeviceDoc = (id: string, d: Record<string, unknown>): ClinicDeviceRecord => ({
      id,
      name: String(d.name || ''),
      modelOrSerial: String(d.modelOrSerial || ''),
      clinicLocation: String(d.clinicLocation || ''),
      roomName: String(d.roomName || ''),
      status:
        d.status === 'in_use' || d.status === 'maintenance' ? d.status : 'operational',
      usedHours: typeof d.usedHours === 'number' ? d.usedHours : 0,
      maxServiceHours: typeof d.maxServiceHours === 'number' ? d.maxServiceHours : 500,
      usedPulses: typeof d.usedPulses === 'number' ? d.usedPulses : 0,
      maxPulses: typeof d.maxPulses === 'number' ? d.maxPulses : 200000,
      lastServiceDate: String(d.lastServiceDate || ''),
      nextServiceDate: String(d.nextServiceDate || ''),
      wearNotes: String(d.wearNotes || ''),
      ownerId: String(d.ownerId || ''),
      collaboratorEmails: Array.isArray(d.collaboratorEmails)
        ? (d.collaboratorEmails as string[])
        : [],
    });

    const unsubOwnedDevices = onSnapshot(
      ownedDevicesQuery,
      (snap) => {
        ownedDevicesMap = {};
        snap.forEach((docSnap) => {
          ownedDevicesMap[docSnap.id] = parseDeviceDoc(docSnap.id, docSnap.data());
        });
        mergeDevices();
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'clinicDevices')
    );

    const unsubSharedDevices = sharedDevicesQuery
      ? onSnapshot(
          sharedDevicesQuery,
          (snap) => {
            sharedDevicesMap = {};
            snap.forEach((docSnap) => {
              sharedDevicesMap[docSnap.id] = parseDeviceDoc(docSnap.id, docSnap.data());
            });
            mergeDevices();
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'clinicDevices')
        )
      : () => {};

    // Clinic Treatments listeners
    const ownedTreatmentsQuery = query(
      collection(db, 'clinicTreatments'),
      where('ownerId', '==', user.uid)
    );
    const sharedTreatmentsQuery = user.email
      ? query(
          collection(db, 'clinicTreatments'),
          where('collaboratorEmails', 'array-contains', user.email)
        )
      : null;

    let ownedTreatmentsMap: Record<string, ClinicTreatmentRecord> = {};
    let sharedTreatmentsMap: Record<string, ClinicTreatmentRecord> = {};

    const mergeTreatments = () => {
      const combined = { ...ownedTreatmentsMap, ...sharedTreatmentsMap };
      const values = Object.values(combined);
      setClinicTreatments((prev) => {
        const localOnly = prev.filter((t) => t.ownerId === 'local_owner');
        const cloudIds = new Set(values.map((v) => v.id));
        return [...values, ...localOnly.filter((t) => !cloudIds.has(t.id))];
      });
    };

    const parseTreatmentDoc = (id: string, d: Record<string, unknown>): ClinicTreatmentRecord => ({
      id,
      deviceId: String(d.deviceId || ''),
      deviceName: String(d.deviceName || ''),
      clinicLocation: String(d.clinicLocation || ''),
      procedureName: String(d.procedureName || ''),
      patientRef: String(d.patientRef || ''),
      operatorName: String(d.operatorName || ''),
      scheduledDate: String(d.scheduledDate || ''),
      startTime: String(d.startTime || '10:00'),
      endTime: String(d.endTime || '11:00'),
      plannedPulses: typeof d.plannedPulses === 'number' ? d.plannedPulses : 0,
      durationMinutes: typeof d.durationMinutes === 'number' ? d.durationMinutes : 60,
      status:
        d.status === 'confirmed' || d.status === 'completed' || d.status === 'cancelled'
          ? d.status
          : 'planned',
      usageLogged: Boolean(d.usageLogged),
      notes: String(d.notes || ''),
      ownerId: String(d.ownerId || ''),
      collaboratorEmails: Array.isArray(d.collaboratorEmails)
        ? (d.collaboratorEmails as string[])
        : [],
    });

    const unsubOwnedTreatments = onSnapshot(
      ownedTreatmentsQuery,
      (snap) => {
        ownedTreatmentsMap = {};
        snap.forEach((docSnap) => {
          ownedTreatmentsMap[docSnap.id] = parseTreatmentDoc(docSnap.id, docSnap.data());
        });
        mergeTreatments();
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'clinicTreatments')
    );

    const unsubSharedTreatments = sharedTreatmentsQuery
      ? onSnapshot(
          sharedTreatmentsQuery,
          (snap) => {
            sharedTreatmentsMap = {};
            snap.forEach((docSnap) => {
              sharedTreatmentsMap[docSnap.id] = parseTreatmentDoc(docSnap.id, docSnap.data());
            });
            mergeTreatments();
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'clinicTreatments')
        )
      : () => {};

    // SEO & AEO Content Assets listeners
    const ownedSeoQuery = query(
      collection(db, 'seoContentAssets'),
      where('ownerId', '==', user.uid)
    );
    const sharedSeoQuery = user.email
      ? query(
          collection(db, 'seoContentAssets'),
          where('collaboratorEmails', 'array-contains', user.email)
        )
      : null;

    let ownedSeoMap: Record<string, SeoContentAssetRecord> = {};
    let sharedSeoMap: Record<string, SeoContentAssetRecord> = {};

    const parseSeoDoc = (id: string, d: Record<string, unknown>): SeoContentAssetRecord => ({
      id,
      title: String(d.title || ''),
      channel:
        d.channel === 'blog_post' ||
        d.channel === 'linkedin' ||
        d.channel === 'instagram' ||
        d.channel === 'x_social'
          ? d.channel
          : 'web_page',
      urlOrSlug: String(d.urlOrSlug || ''),
      contentExcerpt: String(d.contentExcerpt || ''),
      primaryKeyword: String(d.primaryKeyword || ''),
      previousKeyword: String(d.previousKeyword || ''),
      keywordHistory: Array.isArray(d.keywordHistory) ? (d.keywordHistory as string[]) : [],
      seoScore: typeof d.seoScore === 'number' ? d.seoScore : 75,
      aeoScore: typeof d.aeoScore === 'number' ? d.aeoScore : 75,
      predictiveStrength: typeof d.predictiveStrength === 'number' ? d.predictiveStrength : 75,
      organicReach: typeof d.organicReach === 'number' ? d.organicReach : 0,
      socialReach: typeof d.socialReach === 'number' ? d.socialReach : 0,
      engagementRate: typeof d.engagementRate === 'number' ? d.engagementRate : 0,
      anomalyType:
        d.anomalyType === 'reach_drop' ||
        d.anomalyType === 'keyword_decay' ||
        d.anomalyType === 'aeo_gap' ||
        d.anomalyType === 'viral_spike'
          ? d.anomalyType
          : 'none',
      aiRecommendation: String(d.aiRecommendation || ''),
      ownerId: String(d.ownerId || ''),
      collaboratorEmails: Array.isArray(d.collaboratorEmails)
        ? (d.collaboratorEmails as string[])
        : [],
      daysSinceLastRefresh: 1,
    });

    const mergeSeoAssets = () => {
      const combined = { ...ownedSeoMap, ...sharedSeoMap };
      const values = Object.values(combined);
      setSeoAssets((prev) => {
        const localOnly = prev.filter((a) => a.ownerId === 'local_owner');
        const cloudIds = new Set(values.map((v) => v.id));
        return [...values, ...localOnly.filter((a) => !cloudIds.has(a.id))];
      });
    };

    const unsubOwnedSeo = onSnapshot(
      ownedSeoQuery,
      (snap) => {
        ownedSeoMap = {};
        snap.forEach((docSnap) => {
          ownedSeoMap[docSnap.id] = parseSeoDoc(docSnap.id, docSnap.data());
        });
        mergeSeoAssets();
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'seoContentAssets')
    );

    const unsubSharedSeo = sharedSeoQuery
      ? onSnapshot(
          sharedSeoQuery,
          (snap) => {
            sharedSeoMap = {};
            snap.forEach((docSnap) => {
              sharedSeoMap[docSnap.id] = parseSeoDoc(docSnap.id, docSnap.data());
            });
            mergeSeoAssets();
          },
          (err) => handleFirestoreError(err, OperationType.LIST, 'seoContentAssets')
        )
      : () => {};

    // Public PII-free Profiles listeners (/publicProfiles)
    const publicProfilesQuery = query(
      collection(db, 'publicProfiles'),
      where('isPubliclyShared', '==', true)
    );
    const myProfileRef = doc(db, 'publicProfiles', user.uid);

    const parseProfileDoc = (
      id: string,
      d: Record<string, unknown>
    ): SharedUserProfileRecord => ({
      id,
      ownerId: String(d.ownerId || id),
      handle: String(d.handle || 'ekspert'),
      displayName: String(d.displayName || 'Użytkownik'),
      roleTitle: String(d.roleTitle || ''),
      organizationOrDomain: String(d.organizationOrDomain || ''),
      bio: String(d.bio || ''),
      specialties: Array.isArray(d.specialties) ? (d.specialties as string[]) : [],
      isPubliclyShared: Boolean(d.isPubliclyShared),
      sharedAssetsCount: typeof d.sharedAssetsCount === 'number' ? d.sharedAssetsCount : 0,
      avgPredictiveScore: typeof d.avgPredictiveScore === 'number' ? d.avgPredictiveScore : 80,
    });

    const unsubPublicProfiles = onSnapshot(
      publicProfilesQuery,
      (snap) => {
        const cloudProfiles: SharedUserProfileRecord[] = [];
        snap.forEach((docSnap) => {
          cloudProfiles.push(parseProfileDoc(docSnap.id, docSnap.data()));
        });
        const cloudIds = new Set(cloudProfiles.map((p) => p.id));
        const demos = createInitialDemoProfiles().filter((d) => !cloudIds.has(d.id));
        setSharedProfiles([...cloudProfiles, ...demos]);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'publicProfiles')
    );

    const unsubMyProfile = onSnapshot(
      myProfileRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setMyProfile(parseProfileDoc(docSnap.id, docSnap.data()));
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, `publicProfiles/${user.uid}`)
    );

    // Owner-isolated Cyclical Report Schedules listener (/seoReportSchedules)
    const mySchedulesQuery = query(
      collection(db, 'seoReportSchedules'),
      where('ownerId', '==', user.uid)
    );

    const unsubMySchedules = onSnapshot(
      mySchedulesQuery,
      (snap) => {
        if (!snap.empty) {
          const first = snap.docs[0];
          const d = first.data();
          setReportSchedule({
            id: first.id,
            reportName: String(d.reportName || 'Cykliczny Raport SEO i AEO'),
            recipientEmails: Array.isArray(d.recipientEmails)
              ? (d.recipientEmails as string[])
              : [],
            cadence:
              d.cadence === 'daily' || d.cadence === 'monthly' ? d.cadence : 'weekly',
            channelScope:
              d.channelScope === 'web_and_blog' || d.channelScope === 'social_only'
                ? d.channelScope
                : 'all',
            includeAnomalyAlerts: Boolean(d.includeAnomalyAlerts),
            isActive: Boolean(d.isActive),
            lastDispatchedAt: String(d.lastDispatchedAt || ''),
            nextRunAt: String(d.nextRunAt || ''),
            ownerId: String(d.ownerId || user.uid),
          });
        }
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'seoReportSchedules')
    );

    return () => {
      unsubOwnedLists();
      unsubSharedLists();
      unsubOwnedTasks();
      unsubSharedTasks();
      unsubOwnedDevices();
      unsubSharedDevices();
      unsubOwnedTreatments();
      unsubSharedTreatments();
      unsubOwnedSeo();
      unsubSharedSeo();
      unsubPublicProfiles();
      unsubMyProfile();
      unsubMySchedules();
    };
  }, [authReady, user]);

  // Background Reminder & Push Notification Scheduler
  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();
      rawTasks.forEach((task) => {
        if (!task.reminderAt || task.status === 'done' || notifiedTaskIds[task.id]) return;
        const reminderTime = new Date(task.reminderAt).getTime();
        if (!isNaN(reminderTime) && reminderTime <= now && now - reminderTime < 3600000) {
          const readableTitle = decryptedMap[task.id]?.title || task.title;
          setNotifiedTaskIds((prev) => ({ ...prev, [task.id]: true }));
          setInAppBanner(`Przypomnienie o zadaniu: „${readableTitle}”`);
          sendPushNotification('Przypomnienie Chronos Vault', readableTitle, `task-${task.id}`);
        }
      });
    }, 15000);
    return () => clearInterval(interval);
  }, [rawTasks, decryptedMap, notifiedTaskIds]);

  const activeList = useMemo(
    () => lists.find((l) => l.id === activeListId) || lists[0] || DEFAULT_LISTS[0],
    [lists, activeListId]
  );

  const listNameById = useMemo(() => {
    const map: Record<string, string> = {};
    lists.forEach((l) => {
      map[l.id] = l.name;
    });
    return map;
  }, [lists]);

  // Resolved Decrypted Tasks for All Lists (used in Analytics & Multi-Project Filtering)
  const allResolvedTasks: ExportableTask[] = useMemo(() => {
    return rawTasks.map((t) => ({
      ...t,
      listName: listNameById[t.listId] || 'Główny Sprint Produktowy',
      title: decryptedMap[t.id]?.title ?? t.title,
      description: decryptedMap[t.id]?.description ?? t.description,
    }));
  }, [rawTasks, decryptedMap, listNameById]);

  // Resolved Decrypted Tasks for Current Active List
  const resolvedTasks: ExportableTask[] = useMemo(() => {
    return allResolvedTasks.filter((t) => t.listId === activeList.id);
  }, [allResolvedTasks, activeList.id]);

  const filteredTasks = useMemo(() => {
    return resolvedTasks.filter((t) => {
      const matchesSearch =
        !searchQuery.trim() ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [resolvedTasks, searchQuery, priorityFilter]);

  // Selection helpers
  const toggleSelectTask = (taskId: string) => {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const selectMultipleTasks = (taskIds: string[]) => {
    setSelectedTaskIds((prev) => Array.from(new Set([...prev, ...taskIds])));
  };

  const clearSelectedTasks = () => {
    setSelectedTaskIds([]);
  };

  // Handlers
  const handleGoogleLogin = async (): Promise<string | null> => {
    setAuthError(null);
    try {
      const res = await signInWithGoogle();
      setUser(res.user);
      setGoogleAccessToken(res.accessToken);
      return res.accessToken;
    } catch (err: unknown) {
      setAuthError(
        err instanceof Error ? err.message : 'Nie udało się zalogować przez konto Google.'
      );
      return null;
    }
  };

  const handleEnablePushNotifications = async () => {
    const perm = await requestPushNotificationPermission();
    setPushPermission(perm);
    if (perm === 'granted') {
      await sendPushNotification(
        'Powiadomienia Push Aktywne',
        'System przypomnień Chronos Vault będzie wysyłać powiadomienia o nadchodzących terminach.'
      );
      setInAppBanner('Powiadomienia Push zostały aktywowane. Wysłano testowe powiadomienie systemowe.');
    } else {
      setInAppBanner(
        'Aktywowano wewnętrzny system powiadomień przypomnień w aplikacji (powiadomienia przeglądarki są zablokowane w iframe).'
      );
    }
  };

  const canUpdateCloudTask = (task: StoredTaskRecord | undefined): boolean => {
    return Boolean(
      user &&
        user.emailVerified &&
        task &&
        task.ownerId !== 'local_owner' &&
        (task.ownerId === user.uid ||
          (user.email && task.collaboratorEmails.includes(user.email)))
    );
  };

  const openNewTaskModal = (presetDueDate?: string) => {
    const normalizedPreset =
      presetDueDate !== undefined ? normalizeDateTimeString(presetDueDate) ?? '' : undefined;
    setTaskListId(activeList.id);
    setTaskTitle('');
    setTaskDesc('');
    setTaskPriority('medium');
    setTaskMinutesInput('30');
    setTaskDueDate(
      normalizedPreset !== undefined
        ? normalizedPreset
        : formatLocalDateTimeInput(new Date(Date.now() + 86400000))
    );
    setTaskReminderAt(normalizedPreset ? normalizedPreset : '');
    setTaskTagsInput('Sprint, Priorytet');
    setTaskAssignee('');
    setTaskEncrypted(activeList.isEncrypted);
    setTaskTargetCalendar(autoTwoWaySync ? 'google' : 'local');
    setTaskFormError(null);
    setIsNewTaskModalOpen(true);
  };

  const persistNewTask = async (params: {
    listId?: string;
    title: string;
    description: string;
    priority: StoredTaskRecord['priority'];
    dueDate: string;
    reminderAt: string;
    estimatedMinutes: number;
    tags: string[];
    sourceType: StoredTaskRecord['sourceType'];
    isEncrypted: boolean;
    assigneeEmail: string;
    externalCalendarPlatform: string;
  }): Promise<{ record: StoredTaskRecord; cleanTitle: string; cleanDesc: string }> => {
    const taskId = sanitizeDocId('task');
    const targetList =
      lists.find((l) => l.id === (params.listId || activeList.id)) || activeList;

    const cleanTitle = params.title.trim().slice(0, 200) || 'Nowe zadanie';
    const cleanDesc = params.description.trim().slice(0, 1500);

    const validPriority: StoredTaskRecord['priority'] = ['low', 'medium', 'high', 'urgent'].includes(
      params.priority
    )
      ? params.priority
      : 'medium';

    const validSourceType: StoredTaskRecord['sourceType'] = [
      'manual',
      'voice',
      'handwriting',
      'calendar',
    ].includes(params.sourceType)
      ? params.sourceType
      : 'manual';

    const normalizedDue = normalizeDateTimeString(params.dueDate);
    const safeDueDate = (normalizedDue === null ? '' : normalizedDue).slice(0, 64);

    const normalizedReminder = normalizeDateTimeString(params.reminderAt);
    const safeReminderAt = (normalizedReminder === null ? '' : normalizedReminder).slice(0, 64);

    const parsedMinutes = Number(params.estimatedMinutes);
    const safeMinutes = Number.isFinite(parsedMinutes)
      ? Math.min(Math.max(Math.round(parsedMinutes), 0), 10080)
      : 30;

    const cleanAssignee = params.assigneeEmail.trim().toLowerCase().slice(0, 250);

    const storedTitle =
      params.isEncrypted && e2eePassphrase
        ? (await encryptTextE2EE(cleanTitle, e2eePassphrase)).slice(0, 990)
        : cleanTitle;
    const storedDesc =
      params.isEncrypted && e2eePassphrase
        ? (await encryptTextE2EE(cleanDesc, e2eePassphrase)).slice(0, 4900)
        : cleanDesc;

    const boundedTags = Array.from(
      new Set(params.tags.map((t) => t.trim().slice(0, 60)).filter(Boolean))
    ).slice(0, 8);

    // Build collaboratorEmails so all list members, shared list owner, and assignee retain access
    const collaboratorPool: string[] = [...targetList.memberEmails];
    if (
      targetList.ownerId !== 'local_owner' &&
      targetList.ownerEmail &&
      targetList.ownerEmail.includes('@')
    ) {
      collaboratorPool.push(targetList.ownerEmail);
    }
    if (cleanAssignee && cleanAssignee.includes('@')) {
      collaboratorPool.push(cleanAssignee);
    }
    const boundedCollaborators = Array.from(
      new Set(
        collaboratorPool
          .map((e) => e.trim().toLowerCase().slice(0, 250))
          .filter((e) => e.length >= 3 && e.includes('@'))
      )
    ).slice(0, 10);

    // Respect explicit calendar choices ('local', 'google:*', 'outlook:*').
    // Only apply autoTwoWaySync fallback when externalCalendarPlatform is unspecified ('none' or '') and dueDate is set.
    const rawPlatform = (params.externalCalendarPlatform || 'none').trim().slice(0, 120);
    let calPlatform: string;
    if (!safeDueDate) {
      calPlatform = 'none';
    } else if (rawPlatform === 'local') {
      calPlatform = 'local';
    } else if ((rawPlatform === 'none' || !rawPlatform) && autoTwoWaySync) {
      calPlatform = 'google:pending';
    } else {
      calPlatform = rawPlatform || 'none';
    }

    const canPersistToCloud =
      Boolean(user && user.emailVerified) &&
      (targetList.id === 'default' ||
        targetList.id === 'list_marketing_q4' ||
        targetList.ownerId === user!.uid ||
        Boolean(user!.email && targetList.memberEmails.includes(user!.email)));

    const newRecord: StoredTaskRecord = {
      id: taskId,
      listId: targetList.id,
      title: storedTitle,
      description: storedDesc,
      status: 'todo',
      priority: validPriority,
      dueDate: safeDueDate,
      reminderAt: safeReminderAt,
      estimatedMinutes: safeMinutes,
      tags: boundedTags,
      sourceType: validSourceType,
      isEncrypted: Boolean(params.isEncrypted),
      assigneeEmail: cleanAssignee,
      ownerId: canPersistToCloud && user ? user.uid : 'local_owner',
      collaboratorEmails: boundedCollaborators,
      externalCalendarPlatform: calPlatform,
    };

    // Optimistic update for offline & instant UI feedback
    setRawTasks((prev) => [newRecord, ...prev]);

    if (canPersistToCloud && user) {
      try {
        await setDoc(doc(db, 'tasks', taskId), {
          listId: newRecord.listId,
          title: newRecord.title,
          description: newRecord.description,
          status: newRecord.status,
          priority: newRecord.priority,
          dueDate: newRecord.dueDate,
          reminderAt: newRecord.reminderAt,
          estimatedMinutes: newRecord.estimatedMinutes,
          tags: newRecord.tags,
          sourceType: newRecord.sourceType,
          isEncrypted: newRecord.isEncrypted,
          assigneeEmail: newRecord.assigneeEmail,
          ownerId: user.uid,
          collaboratorEmails: newRecord.collaboratorEmails,
          externalCalendarPlatform: newRecord.externalCalendarPlatform,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        // Roll back optimistic insertion if cloud creation was rejected
        setRawTasks((prev) => prev.filter((t) => t.id !== taskId));
        handleFirestoreError(err, OperationType.CREATE, `tasks/${taskId}`);
      }
    }

    return { record: newRecord, cleanTitle, cleanDesc };
  };

  const handleCreateTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingTask) return;

    const trimmedTitle = taskTitle.trim();
    if (!trimmedTitle) {
      setTaskFormError('Podaj tytuł zadania przed zapisaniem.');
      return;
    }

    const normalizedDueDate = normalizeDateTimeString(taskDueDate);
    if (normalizedDueDate === null) {
      setTaskFormError('Podano nieprawidłowy format terminu wykonania.');
      return;
    }

    const normalizedReminderAt = normalizeDateTimeString(taskReminderAt);
    if (normalizedReminderAt === null) {
      setTaskFormError('Podano nieprawidłowy format daty przypomnienia Push.');
      return;
    }

    const trimmedAssignee = taskAssignee.trim();
    if (trimmedAssignee && (!trimmedAssignee.includes('@') || trimmedAssignee.length > 254)) {
      setTaskFormError('Podaj poprawny adres e-mail współpracownika lub pozostaw pole puste.');
      return;
    }

    const rawMinutes = taskMinutesInput.trim() === '' ? 30 : Number(taskMinutesInput);
    if (!Number.isFinite(rawMinutes) || rawMinutes < 0 || rawMinutes > 10080) {
      setTaskFormError('Szacowany czas musi mieścić się w przedziale od 0 do 10080 minut.');
      return;
    }

    const tags = taskTagsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Map selected calendar strictly based on whether dueDate is provided
    const calTag = !normalizedDueDate
      ? 'none'
      : taskTargetCalendar === 'local'
      ? 'local'
      : `${taskTargetCalendar}:pending`;

    setIsSubmittingTask(true);
    setTaskFormError(null);

    try {
      const { record, cleanTitle, cleanDesc } = await persistNewTask({
        listId: taskListId,
        title: trimmedTitle,
        description: taskDesc,
        priority: taskPriority,
        dueDate: normalizedDueDate,
        reminderAt: normalizedReminderAt,
        estimatedMinutes: rawMinutes,
        tags,
        sourceType: 'manual',
        isEncrypted: taskEncrypted,
        assigneeEmail: trimmedAssignee,
        externalCalendarPlatform: calTag,
      });

      if (taskListId && taskListId !== activeListId) {
        setActiveListId(taskListId);
      }

      // Reset all modal fields after successful creation
      setTaskTitle('');
      setTaskDesc('');
      setTaskPriority('medium');
      setTaskMinutesInput('30');
      setTaskReminderAt('');
      setTaskAssignee('');
      setTaskTagsInput('Sprint, Priorytet');
      setIsNewTaskModalOpen(false);

      if (!normalizedDueDate) {
        setInAppBanner(`Utworzono zadanie „${cleanTitle}” (bez przypisanego terminu w kalendarzu).`);
      } else if (taskTargetCalendar === 'local') {
        setInAppBanner(
          `Zadanie „${cleanTitle}” zostało zapisane wyłącznie w wewnętrznym kalendarzu aplikacji.`
        );
      } else if (taskTargetCalendar === 'outlook') {
        setInAppBanner(
          `Zadanie „${cleanTitle}” zostało zaplanowane na ${normalizedDueDate.replace('T', ' ')} i oznaczone do synchronizacji z Outlook Calendar.`
        );
      } else if (taskTargetCalendar === 'google') {
        if (googleAccessToken) {
          // Request mandatory explicit user confirmation before writing to external Google Calendar API
          setPendingNewTaskGoogleSync({
            id: record.id,
            title: cleanTitle,
            description: cleanDesc,
            dueDate: normalizedDueDate,
            estimatedMinutes: record.estimatedMinutes,
          });
          setInAppBanner(
            `Zadanie „${cleanTitle}” zapisano w bazie. Potwierdź w oknie dialogowym dodanie wydarzenia do Google Calendar.`
          );
        } else {
          setInAppBanner(
            `Zadanie „${cleanTitle}” zaplanowano do Google Calendar (${normalizedDueDate.replace('T', ' ')}). Połącz konto w zakładce Kalendarz, aby wysłać wydarzenie.`
          );
        }
      }
    } catch (err: unknown) {
      setTaskFormError(
        err instanceof Error
          ? `Nie udało się zapisać zadania w chmurze Firestore: ${err.message}`
          : 'Wystąpił błąd podczas zapisu zadania.'
      );
    } finally {
      setIsSubmittingTask(false);
    }
  };

  const handleConfirmNewTaskGoogleSync = async () => {
    if (!pendingNewTaskGoogleSync) return;
    const target = pendingNewTaskGoogleSync;
    setIsSyncingNewTaskToGoogle(true);
    try {
      let token = googleAccessToken;
      if (!token) {
        token = await handleGoogleLogin();
      }
      if (!token) {
        setInAppBanner('Autoryzacja Google Calendar została anulowana — zadanie pozostaje zapisane w aplikacji.');
        setPendingNewTaskGoogleSync(null);
        return;
      }

      const createdEvt = await createGoogleCalendarEvent(token, target);
      await handleMarkTaskSyncedWithPlatform(target.id, `google:${createdEvt.id}`);
      setInAppBanner(
        `Wydarzenie „${target.title}” zostało utworzone w Twoim głównym kalendarzu Google Calendar.`
      );
      setPendingNewTaskGoogleSync(null);
    } catch (err: unknown) {
      setInAppBanner(
        err instanceof Error
          ? `Zadanie zapisano w aplikacji, lecz wystąpił błąd API Google Calendar: ${err.message}`
          : 'Nie udało się utworzyć wydarzenia w Google Calendar.'
      );
      setPendingNewTaskGoogleSync(null);
    } finally {
      setIsSyncingNewTaskToGoogle(false);
    }
  };

  const handleUpdateTaskStatus = async (
    taskId: string,
    newStatus: StoredTaskRecord['status']
  ) => {
    const target = rawTasks.find((t) => t.id === taskId);
    setRawTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    if (canUpdateCloudTask(target)) {
      try {
        await updateDoc(doc(db, 'tasks', taskId), {
          status: newStatus,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `tasks/${taskId}`);
      }
    }
  };

  const handleApplyExternalCalendarUpdates = async (
    updates: Array<{
      taskId: string;
      title: string;
      dueDate: string;
      externalCalendarPlatform: string;
    }>
  ) => {
    for (const upd of updates) {
      const existingTask = rawTasks.find((t) => t.id === upd.taskId);
      if (!existingTask) continue;

      const nextStoredTitle =
        existingTask.isEncrypted && e2eePassphrase
          ? (await encryptTextE2EE(upd.title.slice(0, 200), e2eePassphrase)).slice(0, 990)
          : upd.title.slice(0, 200);

      const safeDue = (normalizeDateTimeString(upd.dueDate) ?? upd.dueDate).slice(0, 64);

      setRawTasks((prev) =>
        prev.map((t) =>
          t.id === upd.taskId
            ? {
                ...t,
                title: nextStoredTitle,
                dueDate: safeDue,
                externalCalendarPlatform: upd.externalCalendarPlatform.slice(0, 120),
              }
            : t
        )
      );

      if (canUpdateCloudTask(existingTask)) {
        try {
          await updateDoc(doc(db, 'tasks', upd.taskId), {
            title: nextStoredTitle,
            dueDate: safeDue,
            externalCalendarPlatform: upd.externalCalendarPlatform.slice(0, 120),
            updatedAt: serverTimestamp(),
          });
        } catch (err) {
          handleFirestoreError(err, OperationType.UPDATE, `tasks/${upd.taskId}`);
        }
      }
    }
  };

  const handleMarkTaskSyncedWithPlatform = async (taskId: string, platformTag: string) => {
    const existingTask = rawTasks.find((t) => t.id === taskId);
    setRawTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, externalCalendarPlatform: platformTag.slice(0, 120) }
          : t
      )
    );

    if (canUpdateCloudTask(existingTask)) {
      try {
        await updateDoc(doc(db, 'tasks', taskId), {
          externalCalendarPlatform: platformTag.slice(0, 120),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `tasks/${taskId}`);
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const existingTask = rawTasks.find((t) => t.id === taskId);
    setRawTasks((prev) => prev.filter((t) => t.id !== taskId));
    setSelectedTaskIds((prev) => prev.filter((id) => id !== taskId));

    if (user && user.emailVerified && existingTask && existingTask.ownerId === user.uid) {
      try {
        await deleteDoc(doc(db, 'tasks', taskId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `tasks/${taskId}`);
      }
    }
  };

  const handleCreateAIExtractedTasks = async (
    drafts: ExtractedTaskDraft[],
    sourceType: 'voice' | 'handwriting'
  ) => {
    for (const draft of drafts) {
      const due = formatLocalDateTimeInput(
        new Date(Date.now() + (draft.dueDateOffsetDays || 1) * 86400000)
      );
      const validPriority: StoredTaskRecord['priority'] = ['low', 'medium', 'high', 'urgent'].includes(
        draft.priority
      )
        ? draft.priority
        : 'medium';

      await persistNewTask({
        listId: activeList.id,
        title: draft.title,
        description: draft.description,
        priority: validPriority,
        dueDate: due,
        reminderAt: '',
        estimatedMinutes: draft.estimatedMinutes || 30,
        tags: draft.tags || ['AI'],
        sourceType,
        isEncrypted: activeList.isEncrypted,
        assigneeEmail: user?.email || '',
        externalCalendarPlatform: autoTwoWaySync ? 'google:pending' : 'none',
      });
    }
    setInAppBanner(
      `Utworzono automatycznie ${drafts.length} zadań z ${
        sourceType === 'voice' ? 'notatki głosowej AI' : 'rozpoznawania pisma odręcznego (OCR)'
      }.`
    );
  };

  const handleApplyTaskOptimization = async (patch: TaskOptimizationPatch) => {
    const existingTask = rawTasks.find((t) => t.id === patch.taskId);
    if (!existingTask) return;

    const validPriority: StoredTaskRecord['priority'] = ['low', 'medium', 'high', 'urgent'].includes(
      patch.suggestedPriority
    )
      ? patch.suggestedPriority
      : existingTask.priority;

    const parsedMinutes = Number(patch.suggestedMinutes);
    const safeMinutes = Number.isFinite(parsedMinutes)
      ? Math.min(Math.max(Math.round(parsedMinutes), 0), 10080)
      : existingTask.estimatedMinutes;

    const isOwnerOrLocal =
      existingTask.ownerId === 'local_owner' || Boolean(user && existingTask.ownerId === user.uid);
    const nextEncrypted = isOwnerOrLocal
      ? patch.recommendEncryption
        ? true
        : existingTask.isEncrypted
      : existingTask.isEncrypted;

    const plainCurrentTitle = decryptedMap[existingTask.id]?.title || existingTask.title;
    const cleanEnhancedDesc = patch.enhancedDescription.trim().slice(0, 1500);

    const nextStoredTitle =
      nextEncrypted && e2eePassphrase
        ? (await encryptTextE2EE(plainCurrentTitle.slice(0, 200), e2eePassphrase)).slice(0, 990)
        : plainCurrentTitle.slice(0, 200);

    const nextStoredDesc =
      nextEncrypted && e2eePassphrase
        ? (await encryptTextE2EE(cleanEnhancedDesc, e2eePassphrase)).slice(0, 4900)
        : cleanEnhancedDesc;

    setRawTasks((prev) =>
      prev.map((t) =>
        t.id === patch.taskId
          ? {
              ...t,
              title: nextStoredTitle,
              description: nextStoredDesc,
              priority: validPriority,
              estimatedMinutes: safeMinutes,
              isEncrypted: nextEncrypted,
            }
          : t
      )
    );

    if (canUpdateCloudTask(existingTask)) {
      try {
        const updatePayload: Record<string, unknown> = {
          title: nextStoredTitle,
          description: nextStoredDesc,
          priority: validPriority,
          estimatedMinutes: safeMinutes,
          updatedAt: serverTimestamp(),
        };
        if (user && existingTask.ownerId === user.uid) {
          updatePayload.isEncrypted = nextEncrypted;
        }
        await updateDoc(doc(db, 'tasks', patch.taskId), updatePayload);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `tasks/${patch.taskId}`);
      }
    }

    setInAppBanner(
      `Zoptymalizowano zadanie „${plainCurrentTitle}” (${safeMinutes} min, priorytet: ${PRIORITY_META[validPriority].label}).`
    );
  };

  const handleCreateSuggestedTasks = async (
    drafts: ExtractedTaskDraft[],
    sourceLabel: string
  ) => {
    for (const draft of drafts) {
      const due = formatLocalDateTimeInput(
        new Date(Date.now() + (draft.dueDateOffsetDays ?? 1) * 86400000)
      );
      const validPriority: StoredTaskRecord['priority'] = ['low', 'medium', 'high', 'urgent'].includes(
        draft.priority
      )
        ? draft.priority
        : 'medium';

      await persistNewTask({
        listId: activeList.id,
        title: draft.title,
        description: draft.description,
        priority: validPriority,
        dueDate: due,
        reminderAt: '',
        estimatedMinutes: draft.estimatedMinutes || 30,
        tags: draft.tags || ['AI-Optymalizacja'],
        sourceType: 'manual',
        isEncrypted: activeList.isEncrypted || sourceLabel.includes('skanera'),
        assigneeEmail: user?.email || '',
        externalCalendarPlatform: autoTwoWaySync ? 'google:pending' : 'none',
      });
    }
    setInAppBanner(`Dodano ${drafts.length} zadań z modułu ${sourceLabel} do tablicy Kanban.`);
  };

  const handleImportCalendarTasks = async (
    imported: Array<{
      title: string;
      description: string;
      dueDate: string;
      estimatedMinutes: number;
      externalCalendarPlatform?: string;
    }>,
    platform: string
  ) => {
    for (const item of imported) {
      await persistNewTask({
        listId: activeList.id,
        title: item.title,
        description: item.description,
        priority: 'medium',
        dueDate: item.dueDate,
        reminderAt: item.dueDate,
        estimatedMinutes: item.estimatedMinutes,
        tags: ['Kalendarz', platform.toUpperCase()],
        sourceType: 'calendar',
        isEncrypted: activeList.isEncrypted,
        assigneeEmail: user?.email || '',
        externalCalendarPlatform: item.externalCalendarPlatform || `${platform}:imported_${Date.now()}`,
      });
    }
  };

  const handleCreateListSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const listId = sanitizeDocId('list');
    const emails = newListEmails
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.includes('@'))
      .slice(0, 10);

    const createdList: WorkspaceListModel = {
      id: listId,
      name: newListName.trim().slice(0, 120),
      description: newListDesc.trim().slice(0, 500),
      ownerId: user ? user.uid : 'local_owner',
      ownerEmail: user?.email || 'architekt@chronosvault.pl',
      memberEmails: emails,
      isEncrypted: newListEncrypted,
      color: 'blue',
    };

    setLists((prev) => [...prev, createdList]);
    setActiveListId(listId);
    setNewListName('');
    setNewListDesc('');
    setNewListEmails('');
    setIsNewListModalOpen(false);

    if (user && user.email) {
      try {
        await setDoc(doc(db, 'taskLists', listId), {
          name: createdList.name,
          description: createdList.description,
          ownerId: user.uid,
          ownerEmail: user.email,
          memberEmails: createdList.memberEmails,
          isEncrypted: createdList.isEncrypted,
          color: createdList.color,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `taskLists/${listId}`);
      }
    }
  };

  const handleAddCollaboratorToActiveList = async (email: string) => {
    if (activeList.memberEmails.includes(email)) return;
    const nextEmails = [...activeList.memberEmails, email].slice(0, 10);

    setLists((prev) =>
      prev.map((l) => (l.id === activeList.id ? { ...l, memberEmails: nextEmails } : l))
    );

    if (user && activeList.id !== 'default' && activeList.id !== 'list_marketing_q4') {
      try {
        await updateDoc(doc(db, 'taskLists', activeList.id), {
          memberEmails: nextEmails,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `taskLists/${activeList.id}`);
      }
    }
  };

  const handleRemoveCollaboratorFromActiveList = async (email: string) => {
    const nextEmails = activeList.memberEmails.filter((e) => e !== email);
    setLists((prev) =>
      prev.map((l) => (l.id === activeList.id ? { ...l, memberEmails: nextEmails } : l))
    );

    if (user && activeList.id !== 'default' && activeList.id !== 'list_marketing_q4') {
      try {
        await updateDoc(doc(db, 'taskLists', activeList.id), {
          memberEmails: nextEmails,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `taskLists/${activeList.id}`);
      }
    }
  };

  const handleToggleListEncryption = async (enabled: boolean) => {
    setLists((prev) =>
      prev.map((l) => (l.id === activeList.id ? { ...l, isEncrypted: enabled } : l))
    );
    if (user && activeList.id !== 'default' && activeList.id !== 'list_marketing_q4') {
      try {
        await updateDoc(doc(db, 'taskLists', activeList.id), {
          isEncrypted: enabled,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `taskLists/${activeList.id}`);
      }
    }
  };

  // --- Clinic Equipment & Treatment Plan Handlers (Firestore + Offline Local State) ---
  const handleCreateClinicDevice = async (
    draft: Omit<ClinicDeviceRecord, 'id' | 'ownerId' | 'collaboratorEmails'>
  ) => {
    const deviceId = sanitizeDocId('dev');
    const canCloud = Boolean(user && user.emailVerified);
    const collabs = activeList.memberEmails
      .map((e) => e.trim().toLowerCase().slice(0, 250))
      .filter((e) => e.length >= 3 && e.includes('@'))
      .slice(0, 10);

    const newDevice: ClinicDeviceRecord = {
      id: deviceId,
      name: draft.name.trim().slice(0, 140) || 'Urządzenie kliniczne',
      modelOrSerial: draft.modelOrSerial.trim().slice(0, 120),
      clinicLocation: draft.clinicLocation.trim().slice(0, 160),
      roomName: draft.roomName.trim().slice(0, 80),
      status: ['operational', 'in_use', 'maintenance'].includes(draft.status)
        ? draft.status
        : 'operational',
      usedHours: Math.min(Math.max(Number(draft.usedHours) || 0, 0), 100000),
      maxServiceHours: Math.min(Math.max(Number(draft.maxServiceHours) || 500, 1), 100000),
      usedPulses: Math.min(Math.max(Math.round(Number(draft.usedPulses) || 0), 0), 50000000),
      maxPulses: Math.min(Math.max(Math.round(Number(draft.maxPulses) || 200000), 1), 50000000),
      lastServiceDate: draft.lastServiceDate.slice(0, 32),
      nextServiceDate: draft.nextServiceDate.slice(0, 32),
      wearNotes: draft.wearNotes.slice(0, 1000),
      ownerId: canCloud && user ? user.uid : 'local_owner',
      collaboratorEmails: collabs,
    };

    setClinicDevices((prev) => [newDevice, ...prev]);

    if (canCloud && user) {
      try {
        await setDoc(doc(db, 'clinicDevices', deviceId), {
          name: newDevice.name,
          modelOrSerial: newDevice.modelOrSerial,
          clinicLocation: newDevice.clinicLocation,
          roomName: newDevice.roomName,
          status: newDevice.status,
          usedHours: newDevice.usedHours,
          maxServiceHours: newDevice.maxServiceHours,
          usedPulses: newDevice.usedPulses,
          maxPulses: newDevice.maxPulses,
          lastServiceDate: newDevice.lastServiceDate,
          nextServiceDate: newDevice.nextServiceDate,
          wearNotes: newDevice.wearNotes,
          ownerId: user.uid,
          collaboratorEmails: newDevice.collaboratorEmails,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        setClinicDevices((prev) => prev.filter((d) => d.id !== deviceId));
        handleFirestoreError(err, OperationType.CREATE, `clinicDevices/${deviceId}`);
      }
    }
  };

  const handleUpdateClinicDevice = async (
    deviceId: string,
    patch: Partial<Omit<ClinicDeviceRecord, 'id' | 'ownerId' | 'collaboratorEmails'>>
  ) => {
    const existing = clinicDevices.find((d) => d.id === deviceId);
    if (!existing) return;

    const updated: ClinicDeviceRecord = {
      ...existing,
      name: patch.name !== undefined ? patch.name.trim().slice(0, 140) || existing.name : existing.name,
      modelOrSerial:
        patch.modelOrSerial !== undefined
          ? patch.modelOrSerial.trim().slice(0, 120)
          : existing.modelOrSerial,
      clinicLocation:
        patch.clinicLocation !== undefined
          ? patch.clinicLocation.trim().slice(0, 160)
          : existing.clinicLocation,
      roomName:
        patch.roomName !== undefined ? patch.roomName.trim().slice(0, 80) : existing.roomName,
      status:
        patch.status !== undefined && ['operational', 'in_use', 'maintenance'].includes(patch.status)
          ? patch.status
          : existing.status,
      usedHours:
        patch.usedHours !== undefined
          ? Math.min(Math.max(Number(patch.usedHours) || 0, 0), 100000)
          : existing.usedHours,
      maxServiceHours:
        patch.maxServiceHours !== undefined
          ? Math.min(Math.max(Number(patch.maxServiceHours) || 500, 1), 100000)
          : existing.maxServiceHours,
      usedPulses:
        patch.usedPulses !== undefined
          ? Math.min(Math.max(Math.round(Number(patch.usedPulses) || 0), 0), 50000000)
          : existing.usedPulses,
      maxPulses:
        patch.maxPulses !== undefined
          ? Math.min(Math.max(Math.round(Number(patch.maxPulses) || 200000), 1), 50000000)
          : existing.maxPulses,
      lastServiceDate:
        patch.lastServiceDate !== undefined
          ? patch.lastServiceDate.slice(0, 32)
          : existing.lastServiceDate,
      nextServiceDate:
        patch.nextServiceDate !== undefined
          ? patch.nextServiceDate.slice(0, 32)
          : existing.nextServiceDate,
      wearNotes:
        patch.wearNotes !== undefined ? patch.wearNotes.slice(0, 1000) : existing.wearNotes,
    };

    setClinicDevices((prev) => prev.map((d) => (d.id === deviceId ? updated : d)));

    const canUpdateCloud = Boolean(
      user &&
        user.emailVerified &&
        existing.ownerId !== 'local_owner' &&
        (existing.ownerId === user.uid ||
          (user.email && existing.collaboratorEmails.includes(user.email)))
    );

    if (canUpdateCloud && user) {
      try {
        const payload: Record<string, unknown> = {
          clinicLocation: updated.clinicLocation,
          roomName: updated.roomName,
          status: updated.status,
          usedHours: updated.usedHours,
          usedPulses: updated.usedPulses,
          lastServiceDate: updated.lastServiceDate,
          nextServiceDate: updated.nextServiceDate,
          wearNotes: updated.wearNotes,
          updatedAt: serverTimestamp(),
        };
        if (existing.ownerId === user.uid) {
          payload.name = updated.name;
          payload.modelOrSerial = updated.modelOrSerial;
          payload.maxServiceHours = updated.maxServiceHours;
          payload.maxPulses = updated.maxPulses;
        }
        await updateDoc(doc(db, 'clinicDevices', deviceId), payload);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `clinicDevices/${deviceId}`);
      }
    }
  };

  const handleDeleteClinicDevice = async (deviceId: string) => {
    const existing = clinicDevices.find((d) => d.id === deviceId);
    setClinicDevices((prev) => prev.filter((d) => d.id !== deviceId));

    if (user && user.emailVerified && existing && existing.ownerId === user.uid) {
      try {
        await deleteDoc(doc(db, 'clinicDevices', deviceId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `clinicDevices/${deviceId}`);
      }
    }
  };

  const handleCreateClinicTreatment = async (
    draft: Omit<ClinicTreatmentRecord, 'id' | 'ownerId' | 'collaboratorEmails'>
  ) => {
    const treatmentId = sanitizeDocId('trt');
    const targetDevice = clinicDevices.find((d) => d.id === draft.deviceId);
    const canCloud = Boolean(
      user &&
        user.emailVerified &&
        (draft.deviceId.startsWith('dev_demo_') ||
          (targetDevice && targetDevice.ownerId !== 'local_owner'))
    );

    const collabs = activeList.memberEmails
      .map((e) => e.trim().toLowerCase().slice(0, 250))
      .filter((e) => e.length >= 3 && e.includes('@'))
      .slice(0, 10);

    const newTreatment: ClinicTreatmentRecord = {
      id: treatmentId,
      deviceId: draft.deviceId.slice(0, 128),
      deviceName: draft.deviceName.trim().slice(0, 140) || 'Urządzenie',
      clinicLocation: draft.clinicLocation.trim().slice(0, 160),
      procedureName: draft.procedureName.trim().slice(0, 160) || 'Zabieg kliniczny',
      patientRef: draft.patientRef.trim().slice(0, 80),
      operatorName: draft.operatorName.trim().slice(0, 120),
      scheduledDate: draft.scheduledDate.slice(0, 16),
      startTime: draft.startTime.slice(0, 10) || '10:00',
      endTime: draft.endTime.slice(0, 10) || '11:00',
      plannedPulses: Math.min(Math.max(Math.round(Number(draft.plannedPulses) || 0), 0), 1000000),
      durationMinutes: Math.min(Math.max(Math.round(Number(draft.durationMinutes) || 60), 1), 1440),
      status: ['planned', 'confirmed', 'completed', 'cancelled'].includes(draft.status)
        ? draft.status
        : 'planned',
      usageLogged: Boolean(draft.usageLogged),
      notes: draft.notes.slice(0, 1000),
      ownerId: canCloud && user ? user.uid : 'local_owner',
      collaboratorEmails: collabs,
    };

    setClinicTreatments((prev) => [newTreatment, ...prev]);

    if (canCloud && user) {
      try {
        await setDoc(doc(db, 'clinicTreatments', treatmentId), {
          deviceId: newTreatment.deviceId,
          deviceName: newTreatment.deviceName,
          clinicLocation: newTreatment.clinicLocation,
          procedureName: newTreatment.procedureName,
          patientRef: newTreatment.patientRef,
          operatorName: newTreatment.operatorName,
          scheduledDate: newTreatment.scheduledDate,
          startTime: newTreatment.startTime,
          endTime: newTreatment.endTime,
          plannedPulses: newTreatment.plannedPulses,
          durationMinutes: newTreatment.durationMinutes,
          status: newTreatment.status,
          usageLogged: newTreatment.usageLogged,
          notes: newTreatment.notes,
          ownerId: user.uid,
          collaboratorEmails: newTreatment.collaboratorEmails,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        setClinicTreatments((prev) => prev.filter((t) => t.id !== treatmentId));
        handleFirestoreError(err, OperationType.CREATE, `clinicTreatments/${treatmentId}`);
      }
    }
  };

  const handleUpdateClinicTreatment = async (
    treatmentId: string,
    patch: Partial<Omit<ClinicTreatmentRecord, 'id' | 'ownerId' | 'collaboratorEmails'>>
  ) => {
    const existing = clinicTreatments.find((t) => t.id === treatmentId);
    if (!existing) return;

    const updated: ClinicTreatmentRecord = {
      ...existing,
      clinicLocation:
        patch.clinicLocation !== undefined
          ? patch.clinicLocation.trim().slice(0, 160)
          : existing.clinicLocation,
      scheduledDate:
        patch.scheduledDate !== undefined
          ? patch.scheduledDate.slice(0, 16)
          : existing.scheduledDate,
      startTime:
        patch.startTime !== undefined ? patch.startTime.slice(0, 10) : existing.startTime,
      endTime: patch.endTime !== undefined ? patch.endTime.slice(0, 10) : existing.endTime,
      plannedPulses:
        patch.plannedPulses !== undefined
          ? Math.min(Math.max(Math.round(Number(patch.plannedPulses) || 0), 0), 1000000)
          : existing.plannedPulses,
      durationMinutes:
        patch.durationMinutes !== undefined
          ? Math.min(Math.max(Math.round(Number(patch.durationMinutes) || 60), 1), 1440)
          : existing.durationMinutes,
      status:
        patch.status !== undefined &&
        ['planned', 'confirmed', 'completed', 'cancelled'].includes(patch.status)
          ? patch.status
          : existing.status,
      usageLogged:
        patch.usageLogged !== undefined ? Boolean(patch.usageLogged) : existing.usageLogged,
      notes: patch.notes !== undefined ? patch.notes.slice(0, 1000) : existing.notes,
    };

    setClinicTreatments((prev) => prev.map((t) => (t.id === treatmentId ? updated : t)));

    const canUpdateCloud = Boolean(
      user &&
        user.emailVerified &&
        existing.ownerId !== 'local_owner' &&
        (existing.ownerId === user.uid ||
          (user.email && existing.collaboratorEmails.includes(user.email)))
    );

    if (canUpdateCloud && user) {
      try {
        await updateDoc(doc(db, 'clinicTreatments', treatmentId), {
          clinicLocation: updated.clinicLocation,
          scheduledDate: updated.scheduledDate,
          startTime: updated.startTime,
          endTime: updated.endTime,
          plannedPulses: updated.plannedPulses,
          durationMinutes: updated.durationMinutes,
          status: updated.status,
          usageLogged: updated.usageLogged,
          notes: updated.notes,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `clinicTreatments/${treatmentId}`);
      }
    }
  };

  const handleDeleteClinicTreatment = async (treatmentId: string) => {
    const existing = clinicTreatments.find((t) => t.id === treatmentId);
    setClinicTreatments((prev) => prev.filter((t) => t.id !== treatmentId));

    if (user && user.emailVerified && existing && existing.ownerId === user.uid) {
      try {
        await deleteDoc(doc(db, 'clinicTreatments', treatmentId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `clinicTreatments/${treatmentId}`);
      }
    }
  };

  const handleLogTreatmentWearToDevice = async (treatment: ClinicTreatmentRecord) => {
    if (treatment.usageLogged) return;
    await handleUpdateClinicTreatment(treatment.id, {
      status: 'completed',
      usageLogged: true,
    });

    const dev = clinicDevices.find((d) => d.id === treatment.deviceId);
    if (dev) {
      const addHours = Math.round((treatment.durationMinutes / 60) * 10) / 10;
      await handleUpdateClinicDevice(dev.id, {
        usedHours: Math.round((dev.usedHours + addHours) * 10) / 10,
        usedPulses: dev.usedPulses + treatment.plannedPulses,
      });
    }
  };

  const handlePromoteTreatmentToTask = async (treatment: ClinicTreatmentRecord) => {
    const dueIso = `${treatment.scheduledDate}T${treatment.startTime}`;
    const locLabel = treatment.clinicLocation.trim() || 'Lokalizacja do uzupełnienia';
    await persistNewTask({
      listId: activeList.id,
      title: `[Zabieg] ${treatment.procedureName} (${treatment.deviceName})`,
      description: `Lokalizacja kliniki: ${locLabel}\nOperator: ${treatment.operatorName} · Karta: ${treatment.patientRef}\nParametry: ${treatment.notes || 'Standardowy protokół'}`,
      priority: 'high',
      dueDate: dueIso,
      reminderAt: dueIso,
      estimatedMinutes: treatment.durationMinutes,
      tags: ['Klinika', 'Zabieg', treatment.deviceName.slice(0, 28)],
      sourceType: 'calendar',
      isEncrypted: activeList.isEncrypted,
      assigneeEmail: user?.email || '',
      externalCalendarPlatform: autoTwoWaySync ? 'google:pending' : 'local',
    });
  };

  // --- Central Control Panel CRUD Handlers (SEO/AEO Assets, Shared Profiles, Cyclical Schedules) ---
  const handleCreateSeoAsset = async (
    draft: Omit<SeoContentAssetRecord, 'id' | 'ownerId' | 'collaboratorEmails'>
  ) => {
    const assetId = sanitizeDocId('seo');
    const canCloud = Boolean(user && user.emailVerified);
    const collabs = activeList.memberEmails
      .map((e) => e.trim().toLowerCase().slice(0, 250))
      .filter((e) => e.length >= 3 && e.includes('@'))
      .slice(0, 10);

    const created: SeoContentAssetRecord = {
      id: assetId,
      title: draft.title.trim().slice(0, 180) || 'Monitorowana publikacja',
      channel: ['web_page', 'blog_post', 'linkedin', 'instagram', 'x_social'].includes(draft.channel)
        ? draft.channel
        : 'web_page',
      urlOrSlug: draft.urlOrSlug.trim().slice(0, 240),
      contentExcerpt: draft.contentExcerpt.trim().slice(0, 3000) || 'Treść publikacji',
      primaryKeyword: draft.primaryKeyword.trim().slice(0, 140) || 'fraza kluczowa',
      previousKeyword: draft.previousKeyword.trim().slice(0, 140),
      keywordHistory: (draft.keywordHistory || [])
        .map((k) => k.trim().slice(0, 160))
        .filter(Boolean)
        .slice(0, 10),
      seoScore: Math.min(100, Math.max(0, Math.round(Number(draft.seoScore) || 70))),
      aeoScore: Math.min(100, Math.max(0, Math.round(Number(draft.aeoScore) || 70))),
      predictiveStrength: Math.min(
        100,
        Math.max(0, Math.round(Number(draft.predictiveStrength) || 70))
      ),
      organicReach: Math.min(100000000, Math.max(0, Math.round(Number(draft.organicReach) || 0))),
      socialReach: Math.min(100000000, Math.max(0, Math.round(Number(draft.socialReach) || 0))),
      engagementRate: Math.min(100, Math.max(0, Number(draft.engagementRate) || 0)),
      anomalyType: ['none', 'reach_drop', 'keyword_decay', 'aeo_gap', 'viral_spike'].includes(
        draft.anomalyType
      )
        ? draft.anomalyType
        : 'none',
      aiRecommendation: draft.aiRecommendation.slice(0, 1200),
      ownerId: canCloud && user ? user.uid : 'local_owner',
      collaboratorEmails: collabs,
      daysSinceLastRefresh: draft.daysSinceLastRefresh ?? 0,
    };

    setSeoAssets((prev) => [created, ...prev]);

    if (canCloud && user) {
      try {
        await setDoc(doc(db, 'seoContentAssets', assetId), {
          title: created.title,
          channel: created.channel,
          urlOrSlug: created.urlOrSlug,
          contentExcerpt: created.contentExcerpt,
          primaryKeyword: created.primaryKeyword,
          previousKeyword: created.previousKeyword,
          keywordHistory: created.keywordHistory,
          seoScore: created.seoScore,
          aeoScore: created.aeoScore,
          predictiveStrength: created.predictiveStrength,
          organicReach: created.organicReach,
          socialReach: created.socialReach,
          engagementRate: created.engagementRate,
          anomalyType: created.anomalyType,
          aiRecommendation: created.aiRecommendation,
          ownerId: user.uid,
          collaboratorEmails: created.collaboratorEmails,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        setSeoAssets((prev) => prev.filter((a) => a.id !== assetId));
        handleFirestoreError(err, OperationType.CREATE, `seoContentAssets/${assetId}`);
      }
    }
  };

  const handleUpdateSeoAsset = async (
    assetId: string,
    patch: Partial<Omit<SeoContentAssetRecord, 'id' | 'ownerId' | 'collaboratorEmails'>>
  ) => {
    const existing = seoAssets.find((a) => a.id === assetId);
    if (!existing) return;

    const updated: SeoContentAssetRecord = {
      ...existing,
      title: patch.title !== undefined ? patch.title.trim().slice(0, 180) || existing.title : existing.title,
      contentExcerpt:
        patch.contentExcerpt !== undefined
          ? patch.contentExcerpt.trim().slice(0, 3000) || existing.contentExcerpt
          : existing.contentExcerpt,
      primaryKeyword:
        patch.primaryKeyword !== undefined
          ? patch.primaryKeyword.trim().slice(0, 140) || existing.primaryKeyword
          : existing.primaryKeyword,
      previousKeyword:
        patch.previousKeyword !== undefined
          ? patch.previousKeyword.trim().slice(0, 140)
          : existing.previousKeyword,
      keywordHistory:
        patch.keywordHistory !== undefined
          ? patch.keywordHistory.map((k) => k.trim().slice(0, 160)).filter(Boolean).slice(0, 10)
          : existing.keywordHistory,
      seoScore:
        patch.seoScore !== undefined
          ? Math.min(100, Math.max(0, Math.round(Number(patch.seoScore))))
          : existing.seoScore,
      aeoScore:
        patch.aeoScore !== undefined
          ? Math.min(100, Math.max(0, Math.round(Number(patch.aeoScore))))
          : existing.aeoScore,
      predictiveStrength:
        patch.predictiveStrength !== undefined
          ? Math.min(100, Math.max(0, Math.round(Number(patch.predictiveStrength))))
          : existing.predictiveStrength,
      organicReach:
        patch.organicReach !== undefined
          ? Math.min(100000000, Math.max(0, Math.round(Number(patch.organicReach))))
          : existing.organicReach,
      socialReach:
        patch.socialReach !== undefined
          ? Math.min(100000000, Math.max(0, Math.round(Number(patch.socialReach))))
          : existing.socialReach,
      engagementRate:
        patch.engagementRate !== undefined
          ? Math.min(100, Math.max(0, Number(patch.engagementRate)))
          : existing.engagementRate,
      anomalyType:
        patch.anomalyType !== undefined &&
        ['none', 'reach_drop', 'keyword_decay', 'aeo_gap', 'viral_spike'].includes(patch.anomalyType)
          ? patch.anomalyType
          : existing.anomalyType,
      aiRecommendation:
        patch.aiRecommendation !== undefined
          ? patch.aiRecommendation.slice(0, 1200)
          : existing.aiRecommendation,
      daysSinceLastRefresh:
        patch.daysSinceLastRefresh !== undefined
          ? patch.daysSinceLastRefresh
          : existing.daysSinceLastRefresh,
    };

    setSeoAssets((prev) => prev.map((a) => (a.id === assetId ? updated : a)));

    const canUpdateCloud = Boolean(
      user &&
        user.emailVerified &&
        existing.ownerId !== 'local_owner' &&
        (existing.ownerId === user.uid ||
          (user.email && existing.collaboratorEmails.includes(user.email)))
    );

    if (canUpdateCloud && user) {
      try {
        await updateDoc(doc(db, 'seoContentAssets', assetId), {
          contentExcerpt: updated.contentExcerpt,
          primaryKeyword: updated.primaryKeyword,
          previousKeyword: updated.previousKeyword,
          keywordHistory: updated.keywordHistory,
          seoScore: updated.seoScore,
          aeoScore: updated.aeoScore,
          predictiveStrength: updated.predictiveStrength,
          organicReach: updated.organicReach,
          socialReach: updated.socialReach,
          engagementRate: updated.engagementRate,
          anomalyType: updated.anomalyType,
          aiRecommendation: updated.aiRecommendation,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `seoContentAssets/${assetId}`);
      }
    }
  };

  const handleDeleteSeoAsset = async (assetId: string) => {
    const existing = seoAssets.find((a) => a.id === assetId);
    setSeoAssets((prev) => prev.filter((a) => a.id !== assetId));

    if (user && user.emailVerified && existing && existing.ownerId === user.uid) {
      try {
        await deleteDoc(doc(db, 'seoContentAssets', assetId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `seoContentAssets/${assetId}`);
      }
    }
  };

  const handleSaveMyProfile = async (
    draft: Omit<SharedUserProfileRecord, 'id' | 'ownerId'>
  ) => {
    const profileId = user && user.emailVerified ? user.uid : 'local_owner';
    const sanitizedHandle =
      draft.handle.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60) || 'architekt_seo';

    const nextProfile: SharedUserProfileRecord = {
      id: profileId,
      ownerId: profileId,
      handle: sanitizedHandle,
      displayName: draft.displayName.trim().slice(0, 100) || 'Specjalista Chronos',
      roleTitle: draft.roleTitle.trim().slice(0, 100),
      organizationOrDomain: draft.organizationOrDomain.trim().slice(0, 160),
      bio: draft.bio.trim().slice(0, 500),
      specialties: (draft.specialties || [])
        .map((s) => s.trim().slice(0, 64))
        .filter(Boolean)
        .slice(0, 8),
      isPubliclyShared: Boolean(draft.isPubliclyShared),
      sharedAssetsCount: Math.min(100000, Math.max(0, Math.round(draft.sharedAssetsCount || 0))),
      avgPredictiveScore: Math.min(100, Math.max(0, Math.round(draft.avgPredictiveScore || 0))),
    };

    setMyProfile(nextProfile);
    if (nextProfile.isPubliclyShared) {
      setSharedProfiles((prev) => [
        nextProfile,
        ...prev.filter((p) => p.id !== nextProfile.id),
      ]);
    }

    if (user && user.emailVerified) {
      const ref = doc(db, 'publicProfiles', user.uid);
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            handle: nextProfile.handle,
            displayName: nextProfile.displayName,
            roleTitle: nextProfile.roleTitle,
            organizationOrDomain: nextProfile.organizationOrDomain,
            bio: nextProfile.bio,
            specialties: nextProfile.specialties,
            isPubliclyShared: nextProfile.isPubliclyShared,
            sharedAssetsCount: nextProfile.sharedAssetsCount,
            avgPredictiveScore: nextProfile.avgPredictiveScore,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            ownerId: user.uid,
            handle: nextProfile.handle,
            displayName: nextProfile.displayName,
            roleTitle: nextProfile.roleTitle,
            organizationOrDomain: nextProfile.organizationOrDomain,
            bio: nextProfile.bio,
            specialties: nextProfile.specialties,
            isPubliclyShared: nextProfile.isPubliclyShared,
            sharedAssetsCount: nextProfile.sharedAssetsCount,
            avgPredictiveScore: nextProfile.avgPredictiveScore,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `publicProfiles/${user.uid}`);
      }
    }
  };

  const handleSaveReportSchedule = async (
    draft: Omit<SeoReportScheduleRecord, 'id' | 'ownerId'>
  ) => {
    const canCloud = Boolean(user && user.emailVerified);
    const scheduleId =
      canCloud && user
        ? reportSchedule.ownerId === user.uid
          ? reportSchedule.id
          : `sched_${user.uid.slice(0, 24)}`
        : 'sched_default_1';

    const cleanEmails = (draft.recipientEmails || [])
      .map((e) => e.trim().toLowerCase().slice(0, 254))
      .filter((e) => e.length >= 3 && e.includes('@'))
      .slice(0, 10);

    if (cleanEmails.length === 0) return;

    const updatedSchedule: SeoReportScheduleRecord = {
      id: scheduleId,
      reportName: draft.reportName.trim().slice(0, 140) || 'Cykliczny Raport SEO i AEO',
      recipientEmails: cleanEmails,
      cadence: ['daily', 'weekly', 'monthly'].includes(draft.cadence) ? draft.cadence : 'weekly',
      channelScope: ['all', 'web_and_blog', 'social_only'].includes(draft.channelScope)
        ? draft.channelScope
        : 'all',
      includeAnomalyAlerts: Boolean(draft.includeAnomalyAlerts),
      isActive: Boolean(draft.isActive),
      lastDispatchedAt: draft.lastDispatchedAt.slice(0, 64),
      nextRunAt: draft.nextRunAt.slice(0, 64),
      ownerId: canCloud && user ? user.uid : 'local_owner',
    };

    setReportSchedule(updatedSchedule);

    if (canCloud && user) {
      const ref = doc(db, 'seoReportSchedules', scheduleId);
      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          await updateDoc(ref, {
            reportName: updatedSchedule.reportName,
            recipientEmails: updatedSchedule.recipientEmails,
            cadence: updatedSchedule.cadence,
            channelScope: updatedSchedule.channelScope,
            includeAnomalyAlerts: updatedSchedule.includeAnomalyAlerts,
            isActive: updatedSchedule.isActive,
            lastDispatchedAt: updatedSchedule.lastDispatchedAt,
            nextRunAt: updatedSchedule.nextRunAt,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(ref, {
            reportName: updatedSchedule.reportName,
            recipientEmails: updatedSchedule.recipientEmails,
            cadence: updatedSchedule.cadence,
            channelScope: updatedSchedule.channelScope,
            includeAnomalyAlerts: updatedSchedule.includeAnomalyAlerts,
            isActive: updatedSchedule.isActive,
            lastDispatchedAt: updatedSchedule.lastDispatchedAt,
            nextRunAt: updatedSchedule.nextRunAt,
            ownerId: user.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `seoReportSchedules/${scheduleId}`);
      }
    }
  };

  const handleCreateControlPanelTask = async (
    title: string,
    description: string,
    tags: string[]
  ) => {
    const due = formatLocalDateTimeInput(new Date(Date.now() + 86400000));
    await persistNewTask({
      listId: activeList.id,
      title: title.slice(0, 200),
      description: description.slice(0, 1500),
      priority: 'high',
      dueDate: due,
      reminderAt: '',
      estimatedMinutes: 45,
      tags: tags.slice(0, 8),
      sourceType: 'manual',
      isEncrypted: activeList.isEncrypted,
      assigneeEmail: user?.email || '',
      externalCalendarPlatform: autoTwoWaySync ? 'google:pending' : 'none',
    });
  };

  // Tasks for quick export from Kanban toolbar (either selected tasks or all filtered tasks)
  const tasksForQuickExport = useMemo(() => {
    if (selectedTaskIds.length > 0) {
      return allResolvedTasks.filter((t) => selectedTaskIds.includes(t.id));
    }
    return filteredTasks;
  }, [selectedTaskIds, allResolvedTasks, filteredTasks]);

  const exportScopeMode = selectedTaskIds.length > 0 ? 'selected' : 'all';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveView('control_center');
          }}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0"
        >
          Chronos Vault
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={() => setActiveView('control_center')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeView === 'control_center'
                ? 'text-slate-900 dark:text-white underline underline-offset-8 decoration-2 decoration-blue-600 dark:decoration-sky-400 font-semibold'
                : ''
            }`}
          >
            Panel Sterowania
          </button>
          <button
            type="button"
            onClick={() => setActiveView('mindmap')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeView === 'mindmap'
                ? 'text-slate-900 dark:text-white underline underline-offset-8 decoration-2 decoration-blue-600 dark:decoration-sky-400 font-semibold'
                : ''
            }`}
          >
            Mapa Myśli
          </button>
          <button
            type="button"
            onClick={() => setActiveView('sentinel_shield')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeView === 'sentinel_shield'
                ? 'text-slate-900 dark:text-white underline underline-offset-8 decoration-2 decoration-blue-600 dark:decoration-sky-400 font-semibold'
                : ''
            }`}
          >
            🛡️ Sentinel Shield
          </button>
          <button
            type="button"
            onClick={() => setActiveView('kanban')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeView === 'kanban'
                ? 'text-slate-900 dark:text-white underline underline-offset-8 decoration-2 decoration-blue-600 dark:decoration-sky-400 font-semibold'
                : ''
            }`}
          >
            Tablica Kanban
          </button>
          <button
            type="button"
            onClick={() => setActiveView('calendar')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeView === 'calendar'
                ? 'text-slate-900 dark:text-white underline underline-offset-8 decoration-2 decoration-blue-600 dark:decoration-sky-400 font-semibold'
                : ''
            }`}
          >
            Kalendarz Tygodniowy
          </button>
          <button
            type="button"
            onClick={() => setActiveView('clinic_devices')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeView === 'clinic_devices'
                ? 'text-slate-900 dark:text-white underline underline-offset-8 decoration-2 decoration-blue-600 dark:decoration-sky-400 font-semibold'
                : ''
            }`}
          >
            Grafiki Urządzeń
          </button>
          <button
            type="button"
            onClick={() => setActiveView('analytics')}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              activeView === 'analytics'
                ? 'text-slate-900 dark:text-white underline underline-offset-8 decoration-2 decoration-blue-600 dark:decoration-sky-400 font-semibold'
                : ''
            }`}
          >
            Analityka i Eksport
          </button>
        </nav>

        {/* Zone 3: 1 primary action + team mobile invite */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen((v) => !v)}
            className="lg:hidden px-2.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900"
          >
            {mobileSidebarOpen ? '✕ Menu' : '☰ Projekty'}
          </button>
          <button
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="px-2.5 sm:px-3 py-2 text-xs font-semibold text-slate-700 dark:text-sky-200 border border-slate-300 dark:border-sky-700/60 bg-slate-50 dark:bg-sky-950/40 hover:bg-slate-100 dark:hover:bg-sky-900/50 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span className="sm:hidden">📲 PWA</span>
            <span className="hidden sm:inline">📲 Zaproś (PWA)</span>
          </button>
          <button
            type="button"
            onClick={() => openNewTaskModal()}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-semibold amber-outline-btn dark:bg-sky-500 dark:text-slate-950 dark:border-sky-400 dark:hover:bg-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            + Nowe Zadanie
          </button>
        </div>
      </header>

      <MobileInviteOnboardingOverlay
        onSignInGoogle={handleGoogleLogin}
        userEmail={user?.email}
      />
      <WorkspaceInviteGeneratorModal
        open={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />

      {/* Mobile Floating Bottom Pill Dock (Pearl White + Glowing Amber + CTA) */}
      <nav
        aria-label="Nawigacja mobilna"
        className="md:hidden fixed bottom-3 inset-x-3 z-40 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur border border-slate-200/80 dark:border-slate-800 shadow-[0_14px_36px_rgba(15,23,42,0.12)] px-2 py-1.5 grid grid-cols-5 items-center gap-1"
      >
        {[
          { id: 'control_center', label: 'Panel', icon: '⚡' },
          { id: 'mindmap', label: 'Mapa', icon: '🌿' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setMobileSidebarOpen(false);
              setActiveView(item.id as typeof activeView);
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-semibold transition-colors ${
              activeView === item.id
                ? 'text-amber-600 dark:text-sky-400 bg-amber-50 dark:bg-sky-950/50'
                : 'text-slate-400 dark:text-slate-400'
            }`}
          >
            <span className="text-sm leading-none mb-0.5">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => openNewTaskModal()}
          aria-label="Dodaj zadanie"
          className="mx-auto w-11 h-11 rounded-full amber-pill-cta flex items-center justify-center text-xl font-bold leading-none -my-1"
        >
          +
        </button>
        {[
          { id: 'kanban', label: 'Tablica', icon: '📋' },
          { id: 'calendar', label: 'Kalend.', icon: '📅' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setMobileSidebarOpen(false);
              setActiveView(item.id as typeof activeView);
            }}
            className={`flex flex-col items-center justify-center py-1 rounded-xl text-[10px] font-semibold transition-colors ${
              activeView === item.id
                ? 'text-amber-600 dark:text-sky-400 bg-amber-50 dark:bg-sky-950/50'
                : 'text-slate-400 dark:text-slate-400'
            }`}
          >
            <span className="text-sm leading-none mb-0.5">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Workspace Layout (Sidebar + Content Viewport) */}
      <div className="flex-1 flex flex-col lg:flex-row pb-20 md:pb-0">
        {/* Left Workspace Sidebar (collapsible on mobile, 272px on desktop) */}
        <aside className={`${mobileSidebarOpen ? 'flex' : 'hidden'} lg:flex w-full lg:w-72 shrink-0 bg-white dark:bg-slate-900 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 p-5 flex-col justify-between gap-6`}>
          <div className="space-y-6">
            {/* Cloud Account & Google Calendar OAuth Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  Chmura i Google Calendar
                </span>
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {isOnline ? (user ? 'Połączono' : 'Tryb Demo') : 'Offline'}
                </span>
              </div>

              {user ? (
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="truncate">
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {user.displayName || user.email}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {googleAccessToken ? 'Kalendarz Google: Aktywny' : user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={signOutUser}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors shrink-0"
                    title="Wyloguj"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-100 transition-colors whitespace-nowrap shrink-0"
                >
                  <svg className="w-4 h-4" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                  Sign in with Google
                </button>
              )}
              {authError && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400">{authError}</p>
              )}
            </div>

            {/* Shared Task Lists / Projects Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Projekty i Listy Zadań
                </span>
                <button
                  type="button"
                  onClick={() => setIsNewListModalOpen(true)}
                  className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-sky-400 hover:underline"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  Nowy projekt
                </button>
              </div>

              <div className="space-y-1">
                {lists.map((list) => {
                  const isActive = list.id === activeList.id;
                  const count = rawTasks.filter((t) => t.listId === list.id).length;
                  return (
                    <button
                      key={list.id}
                      type="button"
                      onClick={() => setActiveListId(list.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                        isActive
                          ? 'bg-slate-900 text-white dark:bg-slate-800 dark:text-sky-400'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="truncate flex items-center gap-2">
                        {list.isEncrypted ? (
                          <Lock className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        ) : (
                          <Users className="w-3.5 h-3.5 shrink-0 opacity-80" />
                        )}
                        <span className="truncate">{list.name}</span>
                      </span>
                      <span className="font-mono tabular-nums text-[11px] opacity-75 ml-2">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Central Control, Clinic Schedules, E2EE Team & AI Tools */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                Panel Sterowania, Klinika i AI
              </span>
              <button
                type="button"
                onClick={() => setActiveView('mindmap')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  activeView === 'mindmap'
                    ? 'border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/40 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="truncate">Mapa Myśli (TaskKill Studio)</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setActiveView('control_center')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  activeView === 'control_center'
                    ? 'border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/40 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span className="truncate">Centralny Panel SEO/AEO i Cloud</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setActiveView('clinic_devices')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  activeView === 'clinic_devices'
                    ? 'border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/40 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span className="truncate">Grafiki Urządzeń i Kliniki</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setActiveView('team')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  activeView === 'team'
                    ? 'border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/40 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">Zespół i Szyfrowanie E2EE</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setActiveView('ai_security')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  activeView === 'ai_security'
                    ? 'border-blue-600 dark:border-sky-400 bg-blue-50/70 dark:bg-sky-950/40 text-slate-900 dark:text-white'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">Audyt AI i Antymalware</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setAiModalConfig({ open: true, tab: 'voice' })}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-red-500" />
                  Notatka Głosowa na Zadania
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                type="button"
                onClick={() => setAiModalConfig({ open: true, tab: 'handwriting' })}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-sky-500" />
                  Pismo Odręczne (Szkic OCR)
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Bottom Controls: Push Notifications, Theme Switch, E2EE Fingerprint, PWA Install */}
          <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800">
            <PWAInstallButton />

            <button
              type="button"
              onClick={handleEnablePushNotifications}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-amber-500" />
                Powiadomienia Push
              </span>
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                {pushPermission === 'granted' ? 'Aktywne' : 'Włącz / Testuj'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setDarkMode((d) => !d)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                {darkMode ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                )}
                Motyw Interfejsu
              </span>
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                {darkMode ? 'Ciemny' : 'Jasny'}
              </span>
            </button>

            <div className="px-2 pt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              <span>Klucz E2EE:</span>
              <span>{keyFingerprint}</span>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden space-y-6">
          {/* Mobile Navigation Bar */}
          <div className="flex md:hidden items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
            {[
              { id: 'control_center', label: 'Panel Sterowania' },
              { id: 'mindmap', label: 'Mapa Myśli' },
              { id: 'sentinel_shield', label: '🛡️ Sentinel Shield' },
              { id: 'kanban', label: 'Tablica Kanban' },
              { id: 'calendar', label: 'Kalendarz Tygodniowy' },
              { id: 'clinic_devices', label: 'Grafiki Urządzeń' },
              { id: 'analytics', label: 'Analityka i Eksport' },
              { id: 'ai_security', label: 'Audyt AI i Skaner' },
              { id: 'team', label: 'Zespół i E2EE' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveView(tab.id as typeof activeView)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
                  activeView === tab.id
                    ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notification / Action Banner */}
          {inAppBanner && (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-sky-950/50 border border-blue-200 dark:border-sky-800 flex items-center justify-between gap-4 text-xs font-medium text-blue-900 dark:text-sky-200">
              <span>{inAppBanner}</span>
              <button
                type="button"
                onClick={() => setInAppBanner(null)}
                className="p-1 rounded hover:bg-blue-100 dark:hover:bg-sky-900"
                aria-label="Zamknij powiadomienie"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Integrated Multi-MindMap Workspace (TaskKill Studio + Shared Project Notes) */}
          {activeView === 'mindmap' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-indigo-500" />
                      Mapy Myśli ({mindMaps.length}) — {activeMindMap?.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Dwukierunkowa synchronizacja na żywo ({taskKillSyncCount} zadań w wybranej mapie)
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowNewMindMapForm((v) => !v)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                    >
                      + Nowa Mapa Myśli
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowMindMapNotes((v) => !v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        showMindMapNotes
                          ? 'border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      📝 Wspólna Notatka
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveListId(TASKKILL_LIST_ID);
                        setActiveView('kanban');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 transition-colors"
                    >
                      Otwórz w Kanbanie →
                    </button>
                  </div>
                </div>

                {/* Multi-MindMap Switcher Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {mindMaps.map((m) => (
                    <div
                      key={m.id}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                        m.id === activeMindMapId
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-200'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveMindMapId(m.id)}
                        className="flex items-center gap-1.5"
                      >
                        <span>{m.name}</span>
                        <span className="text-[10px] opacity-70 font-mono">({m.id === activeMindMapId ? taskKillSyncCount : m.taskCount})</span>
                      </button>
                      {!m.isDefault && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMindMap(m.id)}
                          title="Usuń mapę myśli"
                          className="ml-1 text-slate-400 hover:text-rose-500"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Inline New MindMap Creator */}
                {showNewMindMapForm && (
                  <form
                    onSubmit={handleCreateMindMap}
                    className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800"
                  >
                    <input
                      type="text"
                      required
                      value={newMindMapName}
                      onChange={(e) => setNewMindMapName(e.target.value)}
                      placeholder="Nazwa nowej mapy myśli (np. Kampania Proktologia, Aplikacja Pacjenta)..."
                      className="flex-1 min-w-[220px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100"
                    />
                    <input
                      type="text"
                      value={newMindMapDesc}
                      onChange={(e) => setNewMindMapDesc(e.target.value)}
                      placeholder="Krótki opis (opcjonalnie)"
                      className="w-64 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      Utwórz mapę
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNewMindMapForm(false)}
                      className="px-2.5 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    >
                      Anuluj
                    </button>
                  </form>
                )}
              </div>

              <div className={`grid gap-3 ${showMindMapNotes ? 'grid-cols-1 xl:grid-cols-4' : 'grid-cols-1'}`}>
                <div
                  className={`${showMindMapNotes ? 'xl:col-span-3' : ''} rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 h-[calc(100vh-260px)] min-h-[600px]`}
                >
                  <iframe
                    key={activeMindMapId}
                    src={`/taskkill/index.html?map=${encodeURIComponent(activeMindMapId)}&title=${encodeURIComponent(activeMindMap?.name || activeMindMapId)}`}
                    title={`Mapa Myśli: ${activeMindMap?.name || activeMindMapId}`}
                    className="w-full h-full border-0"
                  />
                </div>

                {showMindMapNotes && (
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col h-[calc(100vh-260px)] min-h-[600px]">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs font-semibold text-slate-900 dark:text-white">
                        📝 Wspólna Notatka — {activeMindMap?.name}
                      </h3>
                      <span className="text-[11px] text-slate-400">{mindMapNotesStatus || 'Auto-zapis'}</span>
                    </div>
                    <textarea
                      value={mindMapNotesDraft}
                      onChange={(e) => handleSaveMindMapNotes(e.target.value)}
                      placeholder="Zapisuj tutaj ustalenia, linki, decyzje i wspólne notatki dla tego projektu..."
                      className="flex-1 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-slate-100 font-mono resize-none focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Central Control Panel View */}
          {activeView === 'sentinel_shield' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSentinelSubApp('shield')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sentinelSubApp === 'shield'
                        ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    🛡️ Sentinel Shield (Full 107)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSentinelSubApp('toolkit')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sentinelSubApp === 'toolkit'
                        ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    ⚡ Process Killer Toolkit (Remix 52)
                  </button>
                </div>
                <a
                  href={sentinelSubApp === 'toolkit' ? '/sentinel-toolkit/index.html' : '/sentinel-shield/index.html'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 hover:opacity-90 transition-opacity"
                >
                  Otwórz na pełnym ekranie ↗
                </a>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 h-[calc(100vh-220px)] min-h-[640px]">
                <iframe
                  key={sentinelSubApp}
                  src={sentinelSubApp === 'toolkit' ? '/sentinel-toolkit/index.html' : '/sentinel-shield/index.html'}
                  title={
                    sentinelSubApp === 'toolkit'
                      ? 'Process Killer Toolkit — Remix (52)'
                      : 'Sentinel Shield — Full Command Center (107)'
                  }
                  className="w-full h-full border-0"
                />
              </div>
            </div>
          )}

          {activeView === 'control_center' && (
            <CentralControlPanelView
              user={user}
              onSignInGoogle={handleGoogleLogin}
              onSignOut={signOutUser}
              seoAssets={seoAssets}
              onCreateSeoAsset={handleCreateSeoAsset}
              onUpdateSeoAsset={handleUpdateSeoAsset}
              onDeleteSeoAsset={handleDeleteSeoAsset}
              sharedProfiles={sharedProfiles}
              myProfile={myProfile}
              onSaveMyProfile={handleSaveMyProfile}
              reportSchedule={reportSchedule}
              onSaveReportSchedule={handleSaveReportSchedule}
              onCreateFollowUpTask={handleCreateControlPanelTask}
              onNavigateModule={(mod) => setActiveView(mod)}
            />
          )}

          {/* Contextual Workspace Header & Toolbar */}
          {activeView === 'kanban' && (
            <>
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>Przestrzeń robocza</span>
                    <span aria-hidden="true">/</span>
                    <span>{activeList.isEncrypted ? 'Szyfrowana E2EE (AES-256-GCM)' : 'Standardowa'}</span>
                    <span aria-hidden="true">/</span>
                    <span>Synchronizacja Google & Outlook Calendar</span>
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
                    {activeList.name}
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {activeList.description}
                  </p>
                </div>

                {/* Search, Priority Filter & Direct Export of Selected or All Tasks */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Szukaj zadań lub tagów..."
                      className="pl-9 pr-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 w-48"
                    />
                  </div>

                  <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    {[
                      { id: 'all', label: 'Wszystkie' },
                      { id: 'urgent', label: 'Krytyczne' },
                      { id: 'high', label: 'Wysokie' },
                      { id: 'medium', label: 'Średnie' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setPriorityFilter(f.id)}
                        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                          priorityFilter === f.id
                            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  {/* Quick PDF / CSV Export for Selected or All Tasks */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const generated = exportTasksToPDF(tasksForQuickExport, activeList.name, {
                          projectLabel: activeList.name,
                          periodLabel: 'Bieżący widok',
                          scopeMode: exportScopeMode,
                          reportVariant: 'productivity_and_tasks',
                          includeSearchIndexAppendix: true,
                        });
                        registerGeneratedPdfReport(generated);
                        setInAppBanner(
                          `Zaindeksowano ${generated.index.taskCount} zadań (${generated.index.uniqueTermCount} haseł) i wyeksportowano raport PDF. Przejdź do „Analityka i Eksport”, aby przeszukać dokument pełnotekstowo.`
                        );
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      <FileDown className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                      PDF ({selectedTaskIds.length > 0 ? `Zaznaczone: ${selectedTaskIds.length}` : 'Wszystkie'})
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        exportTasksToCSV(tasksForQuickExport, activeList.name, {
                          projectLabel: activeList.name,
                          periodLabel: 'Bieżący widok',
                          scopeMode: exportScopeMode,
                          reportVariant: 'productivity_and_tasks',
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                      CSV ({selectedTaskIds.length > 0 ? `Zaznaczone: ${selectedTaskIds.length}` : 'Wszystkie'})
                    </button>
                    {selectedTaskIds.length > 0 && (
                      <button
                        type="button"
                        onClick={clearSelectedTasks}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        Wyczyść ({selectedTaskIds.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile-First 1-Column Switcher (visible on smartphones < md) */}
              <div className="grid grid-cols-4 gap-1.5 md:hidden sticky top-14 z-20 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur py-2 -mx-1 px-1">
                {KANBAN_COLUMNS.map((col) => {
                  const count = filteredTasks.filter((t) => t.status === col.id).length;
                  const active = mobileKanbanCol === col.id;
                  const shortLabel =
                    col.id === 'todo'
                      ? 'Do zrob.'
                      : col.id === 'in_progress'
                      ? 'W trakcie'
                      : col.id === 'review'
                      ? 'Weryf.'
                      : 'Gotowe';
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setMobileKanbanCol(col.id)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-[11px] font-semibold transition-colors ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-400 shadow-sm'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <span className="truncate">{shortLabel}</span>
                      <span className="font-mono text-[10px] opacity-80">{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* 4-Column Kanban Board (1 focused column on mobile, 4 columns on desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 items-start">
                {KANBAN_COLUMNS.map((col) => {
                  const colTasks = filteredTasks.filter((t) => t.status === col.id);
                  const colMinutes = colTasks.reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);

                  return (
                    <div
                      key={col.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        if (draggedTaskId) {
                          handleUpdateTaskStatus(draggedTaskId, col.id);
                          setDraggedTaskId(null);
                        }
                      }}
                      className={`${col.id === mobileKanbanCol ? 'block' : 'hidden'} md:block rounded-xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 sm:p-4 space-y-2.5 sm:space-y-3 min-h-[360px] md:min-h-[420px]`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 dark:border-slate-800">
                        <div>
                          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {col.title}
                          </h2>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {col.subtitle}
                          </p>
                        </div>
                        <span className="text-xs font-mono tabular-nums text-slate-600 dark:text-slate-400">
                          {colTasks.length} · {colMinutes}m
                        </span>
                      </div>

                      {colTasks.length === 0 ? (
                        <div className="py-12 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                          Przeciągnij zadanie tutaj lub kliknij „+ Nowe Zadanie”
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {colTasks.map((task) => {
                            const prio = PRIORITY_META[task.priority] || PRIORITY_META.medium;
                            const isSelected = selectedTaskIds.includes(task.id);
                            return (
                              <article
                                key={task.id}
                                draggable
                                onDragStart={() => setDraggedTaskId(task.id)}
                                className={`p-4 rounded-lg bg-white dark:bg-slate-900 border transition-colors space-y-2.5 cursor-grab active:cursor-grabbing ${
                                  isSelected
                                    ? 'border-blue-600 dark:border-sky-400 ring-1 ring-blue-600/30'
                                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                              >
                                {/* Unboxed clean metadata kicker + Selection Checkbox */}
                                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                                  <div className="flex items-center gap-2 truncate">
                                    <button
                                      type="button"
                                      onClick={() => toggleSelectTask(task.id)}
                                      className="text-slate-400 hover:text-blue-600 dark:hover:text-sky-400 shrink-0"
                                      title="Zaznacz zadanie do eksportu PDF/CSV"
                                    >
                                      {isSelected ? (
                                        <CheckSquare className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                                      ) : (
                                        <Square className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                    <span className={prio.textClass}>{prio.label}</span>
                                    <span aria-hidden="true">·</span>
                                    <span>{SOURCE_META[task.sourceType]}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 shrink-0">
                                    {task.isEncrypted && (
                                      <span
                                        title="Zaszyfrowano End-to-End AES-256-GCM"
                                        className="text-emerald-600 dark:text-emerald-400"
                                      >
                                        <Lock className="w-3.5 h-3.5" />
                                      </span>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteTask(task.id)}
                                      className="text-slate-400 hover:text-red-600 transition-colors"
                                      title="Usuń zadanie"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                {/* Task Title */}
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                                  {task.title}
                                </h3>

                                {/* 1-Tap Mobile Quick Move (replaces drag-and-drop on touch screens) */}
                                <div className="flex md:hidden items-center gap-1.5 pt-0.5">
                                  {task.status !== 'in_progress' && (
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateTaskStatus(task.id, 'in_progress')}
                                      className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                                    >
                                      → W trakcie
                                    </button>
                                  )}
                                  {task.status !== 'done' ? (
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateTaskStatus(task.id, 'done')}
                                      className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                    >
                                      ✓ Gotowe
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateTaskStatus(task.id, 'todo')}
                                      className="flex-1 py-1.5 px-2 rounded-lg text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                    >
                                      ↺ Cofnij
                                    </button>
                                  )}
                                </div>

                                {/* Task Description */}
                                {task.description && (
                                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                                    {task.description}
                                  </p>
                                )}

                                {/* Unboxed Inline Metadata: Tags, Time, Due Date, Calendar Sync */}
                                <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {task.estimatedMinutes} min
                                  </span>
                                  {task.dueDate && (
                                    <>
                                      <span aria-hidden="true">·</span>
                                      <span>
                                        Termin: {new Date(task.dueDate).toLocaleDateString('pl-PL')}
                                      </span>
                                    </>
                                  )}
                                  {task.externalCalendarPlatform?.startsWith('google') && (
                                    <>
                                      <span aria-hidden="true">·</span>
                                      <span className="font-sans text-blue-600 dark:text-sky-400">
                                        Google Cal
                                      </span>
                                    </>
                                  )}
                                  {task.externalCalendarPlatform?.startsWith('outlook') && (
                                    <>
                                      <span aria-hidden="true">·</span>
                                      <span className="font-sans text-blue-600 dark:text-sky-400">
                                        Outlook Cal
                                      </span>
                                    </>
                                  )}
                                  {task.tags.length > 0 && (
                                    <>
                                      <span aria-hidden="true">·</span>
                                      <span className="font-sans text-slate-500 dark:text-slate-400">
                                        {task.tags.join(' / ')}
                                      </span>
                                    </>
                                  )}
                                </div>

                                {/* Quick Stage Transition Controls & Assignee */}
                                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[130px]">
                                    {task.assigneeEmail || 'Nieprzypisane'}
                                  </span>

                                  <div className="flex items-center gap-1">
                                    {col.id !== 'done' ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const order: Array<StoredTaskRecord['status']> = [
                                            'todo',
                                            'in_progress',
                                            'review',
                                            'done',
                                          ];
                                          const next =
                                            order[order.indexOf(col.id) + 1] || 'done';
                                          handleUpdateTaskStatus(task.id, next);
                                        }}
                                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[11px] font-medium text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
                                      >
                                        Przesuń dalej →
                                      </button>
                                    ) : (
                                      <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Gotowe
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {activeView === 'calendar' && (
            <CalendarSyncView
              tasks={resolvedTasks}
              clinicTreatments={clinicTreatments}
              activeListName={activeList.name}
              googleAccessToken={googleAccessToken}
              autoTwoWaySync={autoTwoWaySync}
              onToggleAutoTwoWaySync={setAutoTwoWaySync}
              onConnectGoogleCalendar={handleGoogleLogin}
              onImportCalendarTasks={handleImportCalendarTasks}
              onApplyExternalCalendarUpdates={handleApplyExternalCalendarUpdates}
              onMarkTaskSyncedWithPlatform={handleMarkTaskSyncedWithPlatform}
              onQuickAddDateTask={(dateIso) => {
                openNewTaskModal(dateIso);
              }}
              onOpenClinicDevicesView={() => setActiveView('clinic_devices')}
            />
          )}

          {activeView === 'clinic_devices' && (
            <ClinicEquipmentView
              devices={clinicDevices}
              treatments={clinicTreatments}
              onCreateDevice={handleCreateClinicDevice}
              onUpdateDevice={handleUpdateClinicDevice}
              onDeleteDevice={handleDeleteClinicDevice}
              onCreateTreatment={handleCreateClinicTreatment}
              onUpdateTreatment={handleUpdateClinicTreatment}
              onDeleteTreatment={handleDeleteClinicTreatment}
              onLogTreatmentWearToDevice={handleLogTreatmentWearToDevice}
              onPromoteTreatmentToTask={handlePromoteTreatmentToTask}
            />
          )}

          {activeView === 'analytics' && (
            <AnalyticsAndReportsView
              allTasks={allResolvedTasks}
              lists={lists}
              activeListId={activeList.id}
              selectedTaskIds={selectedTaskIds}
              onToggleSelectTask={toggleSelectTask}
              onSelectMultipleTasks={selectMultipleTasks}
              onClearSelection={clearSelectedTasks}
              generatedReports={generatedPdfReports}
              activeReportId={activePdfReportId}
              onSelectReport={setActivePdfReportId}
              onRegisterGeneratedReport={registerGeneratedPdfReport}
            />
          )}

          {activeView === 'ai_security' && (
            <AIWorkOptimizerAndMalwareView
              tasks={resolvedTasks}
              activeListName={activeList.name}
              onApplyTaskOptimization={handleApplyTaskOptimization}
              onCreateSuggestedTasks={handleCreateSuggestedTasks}
            />
          )}

          {activeView === 'team' && (
            <TeamAndSecurityView
              activeList={activeList}
              rawTasksPreview={rawTasks
                .filter((t) => t.listId === activeList.id)
                .map((t) => ({
                  id: t.id,
                  rawTitle: t.title,
                  decryptedTitle: decryptedMap[t.id]?.title || t.title,
                  isEncrypted: t.isEncrypted,
                }))}
              e2eePassphrase={e2eePassphrase}
              keyFingerprint={keyFingerprint}
              onUpdatePassphrase={setE2eePassphrase}
              onAddCollaborator={handleAddCollaboratorToActiveList}
              onRemoveCollaborator={handleRemoveCollaboratorFromActiveList}
              onToggleListEncryption={handleToggleListEncryption}
            />
          )}
        </main>
      </div>

      {/* Modal: Create New Task */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Utwórz Nowe Zadanie
              </h2>
              <button
                type="button"
                onClick={() => setIsNewTaskModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {taskFormError && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-700 dark:text-red-300">
                {taskFormError}
              </div>
            )}

            <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Projekt / Lista docelowa
                </label>
                <select
                  value={taskListId}
                  onChange={(e) => {
                    const nextId = e.target.value;
                    setTaskListId(nextId);
                    const matched = lists.find((l) => l.id === nextId);
                    if (matched) {
                      setTaskEncrypted(matched.isEncrypted);
                    }
                  }}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                >
                  {lists.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name} {l.isEncrypted ? '(Szyfrowana E2EE)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tytuł zadania *
                </label>
                <input
                  type="text"
                  required
                  maxLength={200}
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Np. Wdrożenie dwukierunkowej synchronizacji kalendarza"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Opis / Notatki szczegółowe
                </label>
                <textarea
                  rows={3}
                  maxLength={1500}
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  placeholder="Zakres prac, linki referencyjne lub wymagania bezpieczeństwa..."
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Priorytet
                  </label>
                  <select
                    value={taskPriority}
                    onChange={(e) =>
                      setTaskPriority(e.target.value as StoredTaskRecord['priority'])
                    }
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  >
                    <option value="low">Niski</option>
                    <option value="medium">Średni</option>
                    <option value="high">Wysoki</option>
                    <option value="urgent">Krytyczny</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Szacowany czas (minuty)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={10080}
                    value={taskMinutesInput}
                    onChange={(e) => setTaskMinutesInput(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Termin wykonania (Kalendarz)
                    </label>
                    {taskDueDate && (
                      <button
                        type="button"
                        onClick={() => setTaskDueDate('')}
                        className="text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        Wyczyść
                      </button>
                    )}
                  </div>
                  <input
                    type="datetime-local"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Docelowy kalendarz synchronizacji
                  </label>
                  <select
                    value={taskTargetCalendar}
                    disabled={!taskDueDate}
                    onChange={(e) =>
                      setTaskTargetCalendar(e.target.value as 'google' | 'outlook' | 'local')
                    }
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 disabled:opacity-50"
                  >
                    <option value="google">Google Calendar (2-kierunkowo)</option>
                    <option value="outlook">Outlook Calendar (2-kierunkowo)</option>
                    <option value="local">Tylko kalendarz w aplikacji</option>
                  </select>
                  {!taskDueDate && (
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Wybierz termin wykonania, aby przypisać zadanie do kalendarza.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                      Przypomnienie Push
                    </label>
                    {taskReminderAt && (
                      <button
                        type="button"
                        onClick={() => setTaskReminderAt('')}
                        className="text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                      >
                        Wyczyść
                      </button>
                    )}
                  </div>
                  <input
                    type="datetime-local"
                    value={taskReminderAt}
                    onChange={(e) => setTaskReminderAt(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Przypisz współpracownika (e-mail)
                  </label>
                  <input
                    type="email"
                    maxLength={254}
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value)}
                    placeholder="np. anna.kowalska@zespol.pl"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Tagi (oddzielone przecinkiem, maks. 8)
                </label>
                <input
                  type="text"
                  value={taskTagsInput}
                  onChange={(e) => setTaskTagsInput(e.target.value)}
                  placeholder="Sprint, Bezpieczeństwo"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <label className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={taskEncrypted}
                  onChange={(e) => setTaskEncrypted(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="text-xs">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    Zaszyfruj zadanie End-to-End (Web Crypto AES-256-GCM)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Tytuł i opis zostaną zaszyfrowane przed wysłaniem do chmury Firestore.
                  </p>
                </div>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  disabled={isSubmittingTask}
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingTask}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold disabled:opacity-50"
                >
                  {isSubmittingTask ? 'Zapisywanie...' : 'Zapisz Zadanie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mandatory User Confirmation Dialog to push newly created task to Google Calendar API */}
      {pendingNewTaskGoogleSync && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Potwierdzenie zapisu w Google Calendar
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Czy potwierdzasz utworzenie nowego wydarzenia w Twoim głównym kalendarzu Google Calendar dla właśnie zapisanego zadania?
            </p>
            <div className="rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 space-y-1 text-xs">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                {pendingNewTaskGoogleSync.title}
              </div>
              <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                Termin: {pendingNewTaskGoogleSync.dueDate.replace('T', ' ')} · Czas: {pendingNewTaskGoogleSync.estimatedMinutes} min
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isSyncingNewTaskToGoogle}
                onClick={() => setPendingNewTaskGoogleSync(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Pomiń teraz
              </button>
              <button
                type="button"
                disabled={isSyncingNewTaskToGoogle}
                onClick={handleConfirmNewTaskGoogleSync}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold disabled:opacity-50"
              >
                {isSyncingNewTaskToGoogle ? 'Tworzenie...' : 'Potwierdź i Dodaj do Google Calendar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Shared Task List */}
      {isNewListModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Nowy Projekt / Współdzielona Lista Zadań
              </h2>
              <button
                type="button"
                onClick={() => setIsNewListModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateListSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nazwa projektu / listy *
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Np. Zespół DevOps — Q4"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Opis przestrzeni roboczej
                </label>
                <input
                  type="text"
                  maxLength={500}
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  placeholder="Krótki opis przeznaczenia listy"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Adresy e-mail współpracowników (oddzielone przecinkiem, maks. 10)
                </label>
                <input
                  type="text"
                  value={newListEmails}
                  onChange={(e) => setNewListEmails(e.target.value)}
                  placeholder="anna@firma.pl, marek@firma.pl"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newListEncrypted}
                  onChange={(e) => setNewListEncrypted(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span>Domyślnie szyfruj wszystkie zadania na tej liście (E2EE AES-256-GCM)</span>
              </label>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewListModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 text-xs font-semibold"
                >
                  Utwórz Projekt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Voice Transcription & Handwriting OCR */}
      <VoiceAndHandwritingModal
        isOpen={aiModalConfig.open}
        initialTab={aiModalConfig.tab}
        onClose={() => setAiModalConfig((prev) => ({ ...prev, open: false }))}
        onCreateTasks={handleCreateAIExtractedTasks}
      />

      {/* Offline Mode Indicator Banner */}
      <OfflineIndicator />
    </div>
  );
}
