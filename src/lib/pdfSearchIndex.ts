import type { ExportableTask } from './export';

export type IndexedFieldType =
  | 'title'
  | 'description'
  | 'tags'
  | 'project'
  | 'assignee'
  | 'status';

export const FIELD_LABELS_PL: Record<IndexedFieldType, string> = {
  title: 'Tytuł',
  description: 'Opis',
  tags: 'Tagi',
  project: 'Projekt',
  assignee: 'Współpracownik',
  status: 'Status i priorytet',
};

const FIELD_WEIGHTS: Record<IndexedFieldType, number> = {
  title: 4.0,
  tags: 3.2,
  description: 2.2,
  project: 1.6,
  assignee: 1.8,
  status: 1.3,
};

const STOPWORDS = new Set([
  'i',
  'w',
  'z',
  'na',
  'do',
  'od',
  'po',
  'za',
  'ze',
  'o',
  'u',
  'a',
  'oraz',
  'lub',
  'dla',
  'czy',
  'sie',
  'nie',
  'tak',
  'to',
  'jest',
  'sa',
  'jak',
  'the',
  'and',
  'for',
  'with',
  'from',
]);

const STATUS_TEXT: Record<ExportableTask['status'], string> = {
  todo: 'Do zrobienia',
  in_progress: 'W trakcie',
  review: 'Weryfikacja',
  done: 'Ukończone',
};

const PRIORITY_TEXT: Record<ExportableTask['priority'], string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
  urgent: 'Krytyczny',
};

export interface IndexedTaskDocument {
  taskId: string;
  refCode: string;
  orderIndex: number;
  pageNumber: number;
  title: string;
  description: string;
  tagsText: string;
  projectText: string;
  assigneeText: string;
  statusText: string;
  dueDateText: string;
  estimatedMinutes: number;
  tokenCount: number;
}

export interface InvertedIndexPosting {
  taskId: string;
  refCode: string;
  field: IndexedFieldType;
  frequency: number;
  originalForms: string[];
}

export interface TopIndexedTerm {
  term: string;
  displayTerm: string;
  totalOccurrences: number;
  documentFrequency: number;
  taskRefs: string[];
  taskIds: string[];
}

export interface PreExportSearchIndex {
  indexId: string;
  createdAt: string;
  buildDurationMs: number;
  taskCount: number;
  uniqueTermCount: number;
  totalTokenCount: number;
  documents: IndexedTaskDocument[];
  invertedIndex: Record<string, InvertedIndexPosting[]>;
  topTerms: TopIndexedTerm[];
}

export interface HighlightSegment {
  text: string;
  highlight: boolean;
}

export interface FieldSnippet {
  field: IndexedFieldType;
  fieldLabel: string;
  segments: HighlightSegment[];
}

export interface SearchHitResult {
  taskId: string;
  refCode: string;
  pageNumber: number;
  title: string;
  titleSegments: HighlightSegment[];
  project: string;
  statusLabel: string;
  priorityLabel: string;
  dueDateLabel: string;
  estimatedMinutes: number;
  score: number;
  totalMatches: number;
  matchedFields: IndexedFieldType[];
  matchedFieldLabels: string[];
  matchedTerms: string[];
  snippets: FieldSnippet[];
}

/**
 * Folds Polish diacritics to ASCII lowercase so queries with or without Polish accents
 * match identically across both UI search and ASCII-folded PDF text layers.
 */
export function foldPolishDiacritics(input: string): string {
  return String(input ?? '')
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z')
    .replace(/Ą/g, 'A')
    .replace(/Ć/g, 'C')
    .replace(/Ę/g, 'E')
    .replace(/Ł/g, 'L')
    .replace(/Ń/g, 'N')
    .replace(/Ó/g, 'O')
    .replace(/Ś/g, 'S')
    .replace(/Ź/g, 'Z')
    .replace(/Ż/g, 'Z');
}

export function normalizeSearchText(input: string): string {
  return foldPolishDiacritics(input).toLowerCase().trim();
}

interface ExtractedToken {
  normalized: string;
  original: string;
}

function tokenizeFieldText(rawText: string): ExtractedToken[] {
  if (!rawText) return [];
  const matches = rawText.match(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9_@.-]{2,}/g);
  if (!matches) return [];

  const tokens: ExtractedToken[] = [];
  for (const raw of matches) {
    const cleanedOriginal = raw.replace(/^[.-]+|[.-]+$/g, '');
    if (cleanedOriginal.length < 2) continue;
    const normalized = normalizeSearchText(cleanedOriginal);
    if (normalized.length < 2 || STOPWORDS.has(normalized)) continue;
    tokens.push({ normalized, original: cleanedOriginal });

    // Also split compound hyphenated/email tokens (e.g. "aes-256-gcm" -> "aes", "256", "gcm")
    if (/[-_.@]/.test(cleanedOriginal)) {
      const subParts = cleanedOriginal.split(/[-_.@]+/);
      for (const sub of subParts) {
        const subNorm = normalizeSearchText(sub);
        if (subNorm.length >= 2 && !STOPWORDS.has(subNorm) && subNorm !== normalized) {
          tokens.push({ normalized: subNorm, original: sub });
        }
      }
    }
  }
  return tokens;
}

/**
 * Builds an inverted full-text index of all task fields BEFORE generating the PDF export.
 */
export function buildTaskSearchIndex(
  tasks: ExportableTask[],
  defaultListName = 'Projekt'
): PreExportSearchIndex {
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

  const documents: IndexedTaskDocument[] = [];
  const invertedIndex: Record<string, InvertedIndexPosting[]> = {};
  const displayFormCounts: Record<string, Record<string, number>> = {};
  let totalTokenCount = 0;

  tasks.forEach((task, idx) => {
    const refCode = `#${String(idx + 1).padStart(2, '0')}`;
    const projectText = task.listName || defaultListName;
    const statusLabel = STATUS_TEXT[task.status] || task.status;
    const priorityLabel = PRIORITY_TEXT[task.priority] || task.priority;
    const statusCombined = `${statusLabel} ${priorityLabel}`;
    const tagsText = task.tags.join(', ');
    const assigneeText = task.assigneeEmail || 'Nieprzypisane';
    const dueDateText = task.dueDate
      ? new Date(task.dueDate).toLocaleString('pl-PL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : 'Brak terminu';

    const fieldSources: Array<{ field: IndexedFieldType; value: string }> = [
      { field: 'title', value: task.title || '' },
      { field: 'description', value: task.description || '' },
      { field: 'tags', value: tagsText },
      { field: 'project', value: projectText },
      { field: 'assignee', value: assigneeText },
      { field: 'status', value: `${statusCombined} ${dueDateText}` },
    ];

    let docTokenCount = 0;

    for (const { field, value } of fieldSources) {
      const tokens = tokenizeFieldText(value);
      docTokenCount += tokens.length;
      totalTokenCount += tokens.length;

      const byTermInField: Record<string, { count: number; originals: Set<string> }> = {};

      for (const tok of tokens) {
        if (!byTermInField[tok.normalized]) {
          byTermInField[tok.normalized] = { count: 0, originals: new Set() };
        }
        byTermInField[tok.normalized].count += 1;
        byTermInField[tok.normalized].originals.add(tok.original);

        if (!displayFormCounts[tok.normalized]) {
          displayFormCounts[tok.normalized] = {};
        }
        const lowerOrig = tok.original.toLowerCase();
        displayFormCounts[tok.normalized][lowerOrig] =
          (displayFormCounts[tok.normalized][lowerOrig] || 0) + 1;
      }

      for (const [normTerm, meta] of Object.entries(byTermInField)) {
        if (!invertedIndex[normTerm]) {
          invertedIndex[normTerm] = [];
        }
        invertedIndex[normTerm].push({
          taskId: task.id,
          refCode,
          field,
          frequency: meta.count,
          originalForms: Array.from(meta.originals),
        });
      }
    }

    documents.push({
      taskId: task.id,
      refCode,
      orderIndex: idx,
      // Estimated initial page (refined to exact rendered PDF page during jsPDF layout)
      pageNumber: Math.floor(idx / 8) + 1,
      title: task.title || '',
      description: task.description || '',
      tagsText,
      projectText,
      assigneeText,
      statusText: statusCombined,
      dueDateText,
      estimatedMinutes: task.estimatedMinutes || 0,
      tokenCount: docTokenCount,
    });
  });

  // Compute ranked top terms for PDF appendix & quick search chips
  const topTerms: TopIndexedTerm[] = Object.entries(invertedIndex)
    .map(([term, postings]) => {
      const totalOccurrences = postings.reduce((acc, p) => acc + p.frequency, 0);
      const uniqueTaskRefs = Array.from(new Set(postings.map((p) => p.refCode)));
      const uniqueTaskIds = Array.from(new Set(postings.map((p) => p.taskId)));

      const formsMap = displayFormCounts[term] || {};
      const bestDisplay =
        Object.entries(formsMap).sort((a, b) => b[1] - a[1])[0]?.[0] || term;

      return {
        term,
        displayTerm: bestDisplay,
        totalOccurrences,
        documentFrequency: uniqueTaskIds.length,
        taskRefs: uniqueTaskRefs,
        taskIds: uniqueTaskIds,
      };
    })
    .sort((a, b) => {
      if (b.totalOccurrences !== a.totalOccurrences) {
        return b.totalOccurrences - a.totalOccurrences;
      }
      return a.displayTerm.localeCompare(b.displayTerm, 'pl');
    });

  const endTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const buildDurationMs = Math.max(0.1, Number((endTime - startTime).toFixed(2)));

  return {
    indexId: `idx_${Date.now()}_${tasks.length}`,
    createdAt: new Date().toISOString(),
    buildDurationMs,
    taskCount: tasks.length,
    uniqueTermCount: Object.keys(invertedIndex).length,
    totalTokenCount,
    documents,
    invertedIndex,
    topTerms,
  };
}

/**
 * Updates the pre-export search index with exact page numbers captured during jsPDF rendering.
 */
export function attachExactPdfPagesToIndex(
  index: PreExportSearchIndex,
  pageByTaskId: Record<string, number>
): PreExportSearchIndex {
  return {
    ...index,
    documents: index.documents.map((docItem) => ({
      ...docItem,
      pageNumber: pageByTaskId[docItem.taskId] || docItem.pageNumber || 1,
    })),
  };
}

/**
 * Splits a text string into highlighted and non-highlighted segments matching normalized query terms.
 */
export function buildHighlightSegments(
  text: string,
  normalizedQueryTerms: string[],
  maxSnippetLength?: number
): { segments: HighlightSegment[]; matchCount: number } {
  if (!text) return { segments: [], matchCount: 0 };
  const cleanTerms = Array.from(
    new Set(normalizedQueryTerms.map((t) => normalizeSearchText(t)).filter((t) => t.length >= 1))
  );
  if (cleanTerms.length === 0) {
    const truncated =
      maxSnippetLength && text.length > maxSnippetLength
        ? `${text.slice(0, maxSnippetLength)}…`
        : text;
    return { segments: [{ text: truncated, highlight: false }], matchCount: 0 };
  }

  // Since foldPolishDiacritics preserves 1:1 string character length, indices align 1:1 with `text`!
  const foldedLower = normalizeSearchText(text);
  const intervals: Array<[number, number]> = [];

  for (const term of cleanTerms) {
    let searchFrom = 0;
    while (searchFrom < foldedLower.length) {
      const idx = foldedLower.indexOf(term, searchFrom);
      if (idx === -1) break;
      intervals.push([idx, idx + term.length]);
      searchFrom = idx + Math.max(1, term.length);
    }
  }

  if (intervals.length === 0) {
    const truncated =
      maxSnippetLength && text.length > maxSnippetLength
        ? `${text.slice(0, maxSnippetLength)}…`
        : text;
    return { segments: [{ text: truncated, highlight: false }], matchCount: 0 };
  }

  // Sort and merge overlapping intervals
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const merged: Array<[number, number]> = [];
  for (const iv of intervals) {
    if (merged.length === 0 || iv[0] > merged[merged.length - 1][1]) {
      merged.push([iv[0], iv[1]]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], iv[1]);
    }
  }

  // Optional windowing around the first match for long descriptions
  let windowStart = 0;
  let windowEnd = text.length;
  if (maxSnippetLength && text.length > maxSnippetLength) {
    const firstHitStart = merged[0][0];
    windowStart = Math.max(0, firstHitStart - 45);
    windowEnd = Math.min(text.length, windowStart + maxSnippetLength);
  }

  const segments: HighlightSegment[] = [];
  if (windowStart > 0) {
    segments.push({ text: '…', highlight: false });
  }

  let cursor = windowStart;
  for (const [s, e] of merged) {
    if (e <= windowStart || s >= windowEnd) continue;
    const clampedStart = Math.max(s, windowStart);
    const clampedEnd = Math.min(e, windowEnd);
    if (clampedStart > cursor) {
      segments.push({ text: text.slice(cursor, clampedStart), highlight: false });
    }
    segments.push({ text: text.slice(clampedStart, clampedEnd), highlight: true });
    cursor = clampedEnd;
  }

  if (cursor < windowEnd) {
    segments.push({ text: text.slice(cursor, windowEnd), highlight: false });
  }
  if (windowEnd < text.length) {
    segments.push({ text: '…', highlight: false });
  }

  return { segments, matchCount: intervals.length };
}

/**
 * Full-text search over a PreExportSearchIndex using inverted index lookup + prefix & phrase boosting.
 */
export function searchIndexedPDFReport(
  index: PreExportSearchIndex,
  rawQuery: string,
  fieldFilter: 'all' | IndexedFieldType = 'all'
): SearchHitResult[] {
  const normalizedFullPhrase = normalizeSearchText(rawQuery);
  if (!normalizedFullPhrase) {
    return [];
  }

  const rawQueryTokens = normalizedFullPhrase
    .split(/\s+/)
    .map((t) => t.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, ''))
    .filter((t) => t.length >= 1);

  const queryTerms = rawQueryTokens.length > 0 ? rawQueryTokens : [normalizedFullPhrase];

  const docById: Record<string, IndexedTaskDocument> = {};
  for (const d of index.documents) {
    docById[d.taskId] = d;
  }

  interface DocScoreAcc {
    score: number;
    matchedFields: Set<IndexedFieldType>;
    matchedTerms: Set<string>;
    matchedQueryTokens: Set<string>;
  }

  const accByTaskId: Record<string, DocScoreAcc> = {};
  const ensureAcc = (taskId: string): DocScoreAcc => {
    if (!accByTaskId[taskId]) {
      accByTaskId[taskId] = {
        score: 0,
        matchedFields: new Set(),
        matchedTerms: new Set(),
        matchedQueryTokens: new Set(),
      };
    }
    return accByTaskId[taskId];
  };

  // 1. Inverted index lookup (exact term + prefix/substring term match)
  const allIndexedTerms = Object.keys(index.invertedIndex);

  for (const qToken of queryTerms) {
    for (const indexedTerm of allIndexedTerms) {
      const isExact = indexedTerm === qToken;
      const isPrefix = !isExact && qToken.length >= 2 && indexedTerm.startsWith(qToken);
      const isSubstring =
        !isExact && !isPrefix && qToken.length >= 3 && indexedTerm.includes(qToken);

      if (!isExact && !isPrefix && !isSubstring) continue;

      const matchQualityMultiplier = isExact ? 1.0 : isPrefix ? 0.75 : 0.5;
      const postings = index.invertedIndex[indexedTerm];
      const idf = Math.log(1 + index.taskCount / Math.max(1, postings.length)) + 1;

      for (const post of postings) {
        if (fieldFilter !== 'all' && post.field !== fieldFilter) continue;
        const acc = ensureAcc(post.taskId);
        const weight = FIELD_WEIGHTS[post.field] || 1.0;
        acc.score += post.frequency * weight * idf * matchQualityMultiplier;
        acc.matchedFields.add(post.field);
        acc.matchedTerms.add(qToken);
        acc.matchedQueryTokens.add(qToken);
      }
    }
  }

  // 2. Direct phrase match check (catches multi-word exact phrases or short numbers/symbols)
  for (const docItem of index.documents) {
    const fieldValues: Array<{ field: IndexedFieldType; text: string }> = [
      { field: 'title', text: docItem.title },
      { field: 'description', text: docItem.description },
      { field: 'tags', text: docItem.tagsText },
      { field: 'project', text: docItem.projectText },
      { field: 'assignee', text: docItem.assigneeText },
      { field: 'status', text: `${docItem.statusText} ${docItem.dueDateText}` },
    ];

    for (const fv of fieldValues) {
      if (fieldFilter !== 'all' && fv.field !== fieldFilter) continue;
      const normField = normalizeSearchText(fv.text);
      if (normField.includes(normalizedFullPhrase)) {
        const acc = ensureAcc(docItem.taskId);
        acc.score += (FIELD_WEIGHTS[fv.field] || 1) * 3.5;
        acc.matchedFields.add(fv.field);
        acc.matchedTerms.add(normalizedFullPhrase);
        queryTerms.forEach((qt) => acc.matchedQueryTokens.add(qt));
      }
    }
  }

  // Require all query tokens to match if multiple tokens were entered (AND semantics with fallback)
  const multiTokenMatches = Object.entries(accByTaskId).filter(
    ([, acc]) => acc.matchedQueryTokens.size === queryTerms.length
  );
  const candidateEntries =
    multiTokenMatches.length > 0 ? multiTokenMatches : Object.entries(accByTaskId);

  const highlightTokens = Array.from(new Set([normalizedFullPhrase, ...queryTerms]));

  const results: SearchHitResult[] = candidateEntries
    .map(([taskId, acc]) => {
      const docItem = docById[taskId];
      if (!docItem) return null;

      const snippets: FieldSnippet[] = [];
      let totalMatches = 0;

      const titleSeg = buildHighlightSegments(docItem.title, highlightTokens);
      totalMatches += titleSeg.matchCount;

      const candidateFields: Array<{
        field: IndexedFieldType;
        value: string;
        maxLen?: number;
      }> = [
        { field: 'description', value: docItem.description, maxLen: 180 },
        { field: 'tags', value: docItem.tagsText },
        { field: 'project', value: docItem.projectText },
        { field: 'assignee', value: docItem.assigneeText },
        { field: 'status', value: `${docItem.statusText} · ${docItem.dueDateText}` },
      ];

      for (const cf of candidateFields) {
        if (fieldFilter !== 'all' && cf.field !== fieldFilter) continue;
        if (!cf.value) continue;
        const segResult = buildHighlightSegments(cf.value, highlightTokens, cf.maxLen);
        if (segResult.matchCount > 0) {
          totalMatches += segResult.matchCount;
          snippets.push({
            field: cf.field,
            fieldLabel: FIELD_LABELS_PL[cf.field],
            segments: segResult.segments,
          });
        }
      }

      // If match was only in title and description exists, include a quiet context preview of description
      if (snippets.length === 0 && docItem.description) {
        snippets.push({
          field: 'description',
          fieldLabel: 'Opis',
          segments: [
            {
              text:
                docItem.description.length > 140
                  ? `${docItem.description.slice(0, 140)}…`
                  : docItem.description,
              highlight: false,
            },
          ],
        });
      }

      const orderedFields = Array.from(acc.matchedFields);
      const statusParts = docItem.statusText.split(' ');
      const priorityLabel = statusParts[statusParts.length - 1] || '';
      const statusLabel = statusParts.slice(0, -1).join(' ') || docItem.statusText;

      return {
        taskId,
        refCode: docItem.refCode,
        pageNumber: docItem.pageNumber,
        title: docItem.title,
        titleSegments: titleSeg.segments,
        project: docItem.projectText,
        statusLabel,
        priorityLabel,
        dueDateLabel: docItem.dueDateText,
        estimatedMinutes: docItem.estimatedMinutes,
        score: Number(acc.score.toFixed(2)),
        totalMatches: Math.max(1, totalMatches),
        matchedFields: orderedFields,
        matchedFieldLabels: orderedFields.map((f) => FIELD_LABELS_PL[f]),
        matchedTerms: Array.from(acc.matchedTerms),
        snippets,
      };
    })
    .filter((item): item is SearchHitResult => item !== null)
    .sort((a, b) => b.score - a.score || a.pageNumber - b.pageNumber);

  return results;
}
