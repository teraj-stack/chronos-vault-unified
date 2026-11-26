import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  buildTaskSearchIndex,
  attachExactPdfPagesToIndex,
  foldPolishDiacritics,
  searchIndexedPDFReport,
  type PreExportSearchIndex,
} from './pdfSearchIndex';

export interface ExportableTask {
  id: string;
  listId: string;
  listName?: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  reminderAt: string;
  estimatedMinutes: number;
  tags: string[];
  sourceType: 'manual' | 'voice' | 'handwriting' | 'calendar';
  isEncrypted: boolean;
  assigneeEmail: string;
  externalCalendarPlatform: string;
}

export interface ReportExportOptions {
  projectLabel: string;
  periodLabel: string;
  scopeMode: 'all' | 'selected';
  reportVariant: 'productivity_and_tasks' | 'tasks_only';
  includeSearchIndexAppendix?: boolean;
  highlightQuery?: string;
  downloadImmediately?: boolean;
  preBuiltIndex?: PreExportSearchIndex;
}

export interface GeneratedPDFReport {
  id: string;
  fileName: string;
  generatedAt: string;
  projectLabel: string;
  periodLabel: string;
  scopeMode: 'all' | 'selected';
  reportVariant: 'productivity_and_tasks' | 'tasks_only';
  pageCount: number;
  blob: Blob;
  blobUrl: string;
  index: PreExportSearchIndex;
  highlightQuery?: string;
}

const STATUS_LABELS: Record<ExportableTask['status'], string> = {
  todo: 'Do zrobienia',
  in_progress: 'W trakcie',
  review: 'Weryfikacja',
  done: 'Ukończone',
};

const PRIORITY_LABELS: Record<ExportableTask['priority'], string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
  urgent: 'Krytyczny',
};

const SOURCE_LABELS: Record<ExportableTask['sourceType'], string> = {
  manual: 'Ręczne',
  voice: 'Notatka głosowa AI',
  handwriting: 'Pismo odręczne (OCR)',
  calendar: 'Synchronizacja kalendarza',
};

function sanitizePdfAscii(str: string): string {
  return foldPolishDiacritics(str)
    .replace(/[—–]/g, '-')
    .replace(/[„”]/g, '"');
}

export function triggerBlobDownload(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadGeneratedPDFReport(report: GeneratedPDFReport): void {
  triggerBlobDownload(report.blob, report.fileName);
}

export function exportTasksToCSV(
  tasks: ExportableTask[],
  listName: string,
  options?: Partial<ReportExportOptions>
): void {
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const completionRate = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;
  const totalMinutes = tasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
  const doneMinutes = tasks
    .filter((t) => t.status === 'done')
    .reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);

  const escapeCSV = (val: string | number | boolean) => {
    const str = String(val ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const summaryRows: string[][] = [];
  if (options?.reportVariant !== 'tasks_only') {
    summaryRows.push(
      ['RAPORT PRODUKTYWNOSCI CHRONOS VAULT', ''],
      ['Projekt / Zakres list', options?.projectLabel || listName],
      ['Okres analizy', options?.periodLabel || 'Caly okres'],
      [
        'Zakres eksportowanych zadan',
        options?.scopeMode === 'selected'
          ? `Tylko zaznaczone zadania (${tasks.length})`
          : `Wszystkie zadania w widoku (${tasks.length})`,
      ],
      ['Liczba ukonczonych zadan', `${doneCount} z ${tasks.length} (${completionRate}%)`],
      ['Czas poswiecony na ukonczone zadania (min)', String(doneMinutes)],
      ['Calkowity zaplanowany czas pracy (min)', String(totalMinutes)],
      ['Data wygenerowania', new Date().toLocaleString('pl-PL')],
      []
    );
  }

  const headers = [
    'ID',
    'Projekt / Lista',
    'Tytuł zadania',
    'Opis szczegółowy',
    'Status',
    'Priorytet',
    'Termin wykonania',
    'Przypomnienie Push',
    'Czas (min)',
    'Źródło',
    'Szyfrowanie E2EE',
    'Przypisano do',
    'Synchronizacja Kalendarza',
    'Tagi',
  ];

  const rows = tasks.map((t) => [
    t.id,
    t.listName || listName,
    t.title,
    t.description || '',
    STATUS_LABELS[t.status] || t.status,
    PRIORITY_LABELS[t.priority] || t.priority,
    t.dueDate ? new Date(t.dueDate).toLocaleString('pl-PL') : 'Brak',
    t.reminderAt ? new Date(t.reminderAt).toLocaleString('pl-PL') : 'Brak',
    t.estimatedMinutes,
    SOURCE_LABELS[t.sourceType] || t.sourceType,
    t.isEncrypted ? 'TAK (AES-256-GCM)' : 'NIE',
    t.assigneeEmail || 'Nieprzypisane',
    t.externalCalendarPlatform || 'Lokalny',
    t.tags.join('; '),
  ]);

  const csvLines = [
    ...summaryRows.map((r) => r.map(escapeCSV).join(',')),
    headers.map(escapeCSV).join(','),
    ...rows.map((r) => r.map(escapeCSV).join(',')),
  ];

  const csvContent = '\uFEFF' + csvLines.join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const suffix = options?.scopeMode === 'selected' ? 'zaznaczone' : 'wszystkie';
  const safeSlug = sanitizePdfAscii(listName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  triggerBlobDownload(
    blob,
    `raport-chronos-${safeSlug || 'projekt'}-${suffix}-${new Date().toISOString().slice(0, 10)}.csv`
  );
}

/**
 * Step 1: Indexes all task contents prior to PDF creation (`buildTaskSearchIndex`).
 * Step 2: Generates a searchable multi-section PDF with embedded metadata keywords,
 *         full task descriptions/tags, exact per-task page tracking, optional query
 *         highlighting, and a clickable alphabetical Full-Text Index Appendix.
 */
export function exportTasksToPDF(
  tasks: ExportableTask[],
  listName: string,
  options?: Partial<ReportExportOptions>
): GeneratedPDFReport {
  // 1. Pre-export task content indexing stage
  const rawIndex =
    options?.preBuiltIndex && options.preBuiltIndex.taskCount === tasks.length
      ? options.preBuiltIndex
      : buildTaskSearchIndex(tasks, options?.projectLabel || listName);

  const highlightQuery = options?.highlightQuery?.trim() || '';
  const preSearchHits = highlightQuery ? searchIndexedPDFReport(rawIndex, highlightQuery) : [];
  const highlightedTaskIds = new Set(preSearchHits.map((h) => h.taskId));

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  const projectLabel = options?.projectLabel || listName;
  const periodLabel = options?.periodLabel || 'Caly okres';
  const scopeMode: 'all' | 'selected' = options?.scopeMode || 'all';
  const reportVariant: 'productivity_and_tasks' | 'tasks_only' =
    options?.reportVariant || 'productivity_and_tasks';
  const includeAppendix = options?.includeSearchIndexAppendix !== false;

  // Embed searchable PDF metadata keywords extracted from the pre-export index
  const keywordList = rawIndex.topTerms
    .slice(0, 40)
    .map((k) => sanitizePdfAscii(k.displayTerm))
    .join(', ');

  doc.setProperties({
    title: sanitizePdfAscii(`Raport Chronos Vault - ${projectLabel}`),
    subject: sanitizePdfAscii(
      `Zaindeksowany pelnotekstowo raport zadan (${rawIndex.taskCount} zadan, ${rawIndex.uniqueTermCount} hasel)`
    ),
    author: 'Chronos Vault',
    keywords: keywordList,
    creator: 'Chronos Vault Pre-Export Full-Text Indexer',
  });

  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const reviewCount = tasks.filter((t) => t.status === 'review').length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const completionRate = tasks.length > 0 ? Math.round((doneCount / tasks.length) * 100) : 0;
  const totalMinutes = tasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
  const completedMinutes = tasks
    .filter((t) => t.status === 'done')
    .reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
  const encryptedCount = tasks.filter((t) => t.isEncrypted).length;

  const scopeText =
    scopeMode === 'selected'
      ? `Wybrane zadania: ${tasks.length}`
      : `Wszystkie zadania w widoku: ${tasks.length}`;

  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text(
    sanitizePdfAscii(
      reportVariant === 'tasks_only'
        ? `Zaindeksowana Lista Zadan - Chronos Vault (${projectLabel})`
        : `Raport Produktywnosci i Pelnotekstowy Katalog Zadan - Chronos Vault (${projectLabel})`
    ),
    14,
    14
  );

  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(
    sanitizePdfAscii(
      `Wygenerowano: ${new Date().toLocaleString('pl-PL')} | Okres: ${periodLabel} | ${scopeText}`
    ),
    14,
    19.5
  );

  doc.setFontSize(8.5);
  doc.setTextColor(30, 64, 175);
  doc.text(
    sanitizePdfAscii(
      `Indeks pelnotekstowy: ${rawIndex.taskCount} zadan | ${rawIndex.uniqueTermCount} unikalnych hasel | ${rawIndex.totalTokenCount} tokenow (indeksacja przed eksportem: ${rawIndex.buildDurationMs} ms)`
    ),
    14,
    24.5
  );

  let currentY = 28;

  if (highlightQuery) {
    doc.setFontSize(8.5);
    doc.setTextColor(180, 83, 9);
    doc.text(
      sanitizePdfAscii(
        `Aktywne podswietlenie wyszukiwania pelnotekstowego dla frazy: "${highlightQuery}" - dopasowano zadan: ${preSearchHits.length}`
      ),
      14,
      currentY
    );
    currentY += 5;
  }

  if (reportVariant !== 'tasks_only') {
    autoTable(doc, {
      startY: currentY,
      head: [
        [
          'Wskaznik Ukonczenia',
          'Czas Ukonczonych Zadan',
          'Calkowity Budzet Czasu',
          'Rozklad Etapow Kanban',
          'Szyfrowanie i Indeks PDF',
        ],
      ],
      body: [
        [
          `${completionRate}% (${doneCount} z ${tasks.length})`,
          `${completedMinutes} min (${(completedMinutes / 60).toFixed(1)} h)`,
          `${totalMinutes} min (${(totalMinutes / 60).toFixed(1)} h)`,
          `Do zrobienia: ${todoCount} | W trakcie: ${inProgressCount} | Weryfikacja: ${reviewCount} | Ukonczone: ${doneCount}`,
          `E2EE: ${encryptedCount} zadan | Hasla indeksu: ${rawIndex.uniqueTermCount}`,
        ],
      ],
      styles: {
        fontSize: 8,
        cellPadding: 2.2,
      },
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
      },
    });
    currentY = (doc as unknown as { lastAutoTable?: { finalY?: number } }).lastAutoTable?.finalY
      ? (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 5
      : currentY + 20;
  }

  // Track exact rendered PDF page number for every task row
  const pageByTaskId: Record<string, number> = {};

  autoTable(doc, {
    startY: currentY,
    head: [
      [
        'Ref',
        'Projekt',
        'Tytul, Pelny Opis i Tagi (Warstwa Wyszukiwania)',
        'Status i Priorytet',
        'Termin',
        'Czas',
        'Kalendarz / Przypisano',
      ],
    ],
    body: tasks.map((t, idx) => {
      const refCode = `#${String(idx + 1).padStart(2, '0')}`;
      const descLine = t.description ? `\nOpis: ${t.description}` : '';
      const tagsLine = t.tags.length > 0 ? `\nTagi: ${t.tags.join(', ')}` : '';
      const fullContentCell = sanitizePdfAscii(`${t.title}${descLine}${tagsLine}`);

      const calLabel = t.externalCalendarPlatform?.startsWith('google')
        ? 'Google Cal'
        : t.externalCalendarPlatform?.startsWith('outlook')
        ? 'Outlook Cal'
        : t.externalCalendarPlatform === 'local'
        ? 'Kalendarz lokalny'
        : 'Brak';

      return [
        refCode,
        sanitizePdfAscii((t.listName || listName).slice(0, 32)),
        fullContentCell,
        sanitizePdfAscii(
          `${STATUS_LABELS[t.status] || t.status}\nPriorytet: ${PRIORITY_LABELS[t.priority] || t.priority}`
        ),
        t.dueDate ? new Date(t.dueDate).toLocaleString('pl-PL') : '-',
        `${t.estimatedMinutes || 0} min`,
        sanitizePdfAscii(`${calLabel}\n${t.assigneeEmail || 'Nieprzypisane'}`),
      ];
    }),
    columnStyles: {
      0: { cellWidth: 13, fontStyle: 'bold' },
      1: { cellWidth: 34 },
      2: { cellWidth: 112 },
      3: { cellWidth: 32 },
      4: { cellWidth: 28 },
      5: { cellWidth: 16 },
      6: { cellWidth: 34 },
    },
    styles: {
      fontSize: 8,
      cellPadding: 2.3,
      valign: 'top',
    },
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    didParseCell: (hookData) => {
      if (hookData.section === 'body') {
        const rowTask = tasks[hookData.row.index];
        if (rowTask && highlightedTaskIds.has(rowTask.id)) {
          hookData.cell.styles.fillColor = [254, 243, 199]; // Subtle amber highlight for matched query rows
          hookData.cell.styles.textColor = [15, 23, 42];
        }
      }
    },
    didDrawCell: (hookData) => {
      if (hookData.section === 'body' && hookData.column.index === 0) {
        const rowTask = tasks[hookData.row.index];
        if (rowTask && !pageByTaskId[rowTask.id]) {
          pageByTaskId[rowTask.id] = doc.getCurrentPageInfo().pageNumber;
        }
      }
    },
  });

  // 2. Bind exact PDF page numbers into the pre-export search index
  const finalizedIndex = attachExactPdfPagesToIndex(rawIndex, pageByTaskId);
  const exactPageByTaskId: Record<string, number> = {};
  for (const d of finalizedIndex.documents) {
    exactPageByTaskId[d.taskId] = d.pageNumber;
  }

  // 3. Optional Full-Text Search Index Appendix (Skorowidz Hasel i Stron) with clickable PDF page links
  if (includeAppendix && finalizedIndex.topTerms.length > 0) {
    doc.addPage();
    doc.setFontSize(13);
    doc.setTextColor(15, 23, 42);
    doc.text(
      'Skorowidz Pelnotekstowy Zadan (Indeks Hasel, Referencji i Stron PDF)',
      14,
      15
    );
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(
      sanitizePdfAscii(
        `Alfabetyczny indeks kluczowych terminow wyodrebnionych przed eksportem. Kliknij numer strony, aby przejsc do zadania w dokumencie.`
      ),
      14,
      20.5
    );

    const sortedTermsForAppendix = [...finalizedIndex.topTerms]
      .slice(0, 60)
      .sort((a, b) =>
        sanitizePdfAscii(a.displayTerm).localeCompare(sanitizePdfAscii(b.displayTerm), 'en')
      );

    const appendixRows = sortedTermsForAppendix.map((entry) => {
      const pages = Array.from(
        new Set(entry.taskIds.map((tid) => exactPageByTaskId[tid] || 1))
      ).sort((a, b) => a - b);

      return {
        termLabel: sanitizePdfAscii(entry.displayTerm),
        occurrences: String(entry.totalOccurrences),
        refs: entry.taskRefs.join(', '),
        pagesText: pages.map((p) => `str. ${p}`).join(', '),
        firstTargetPage: pages[0] || 1,
      };
    });

    autoTable(doc, {
      startY: 25,
      head: [
        [
          'Haslo indeksowe (Token)',
          'Liczba wystapien',
          'Powiazane zadania (Ref)',
          'Lokalizacja w PDF (Kliknij strone)',
        ],
      ],
      body: appendixRows.map((r) => [r.termLabel, r.occurrences, r.refs, r.pagesText]),
      columnStyles: {
        0: { cellWidth: 65, fontStyle: 'bold' },
        1: { cellWidth: 35 },
        2: { cellWidth: 105 },
        3: { cellWidth: 64, textColor: [37, 99, 235] },
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252],
      },
      didDrawCell: (hookData) => {
        if (hookData.section === 'body' && hookData.column.index === 3) {
          const rowMeta = appendixRows[hookData.row.index];
          if (rowMeta) {
            doc.link(
              hookData.cell.x,
              hookData.cell.y,
              hookData.cell.width,
              hookData.cell.height,
              { pageNumber: rowMeta.firstTargetPage }
            );
          }
        }
      },
    });
  }

  // 4. Stamp page numbers across all pages
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(
      sanitizePdfAscii(
        `Chronos Vault - Zaindeksowany Raport PDF (${finalizedIndex.indexId}) | Strona ${p} z ${totalPages}`
      ),
      14,
      203
    );
  }

  const suffix = scopeMode === 'selected' ? 'zaznaczone' : 'wszystkie';
  const safeSlug = sanitizePdfAscii(listName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const querySuffix = highlightQuery
    ? `-szukaj-${sanitizePdfAscii(highlightQuery)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, 20)}`
    : '';
  const fileName = `raport-chronos-${safeSlug || 'projekt'}-${suffix}${querySuffix}-${new Date()
    .toISOString()
    .slice(0, 10)}.pdf`;

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  if (options?.downloadImmediately !== false) {
    triggerBlobDownload(blob, fileName);
  }

  return {
    id: `pdf_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    fileName,
    generatedAt: new Date().toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    projectLabel,
    periodLabel,
    scopeMode,
    reportVariant,
    pageCount: totalPages,
    blob,
    blobUrl,
    index: finalizedIndex,
    highlightQuery: highlightQuery || undefined,
  };
}

export function exportTasksToICS(tasks: ExportableTask[], listName: string): void {
  const formatICSDate = (iso: string) => {
    const d = iso ? new Date(iso) : new Date();
    const safeDate = isNaN(d.getTime()) ? new Date() : d;
    return safeDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const events = tasks
    .filter((t) => t.dueDate)
    .map((t) => {
      const start = formatICSDate(t.dueDate);
      const endDate = new Date(new Date(t.dueDate).getTime() + (t.estimatedMinutes || 30) * 60000);
      const end = formatICSDate(endDate.toISOString());

      return [
        'BEGIN:VEVENT',
        `UID:${t.id}@chronosvault.app`,
        `DTSTAMP:${formatICSDate(new Date().toISOString())}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${t.title.replace(/\r?\n/g, ' ')}`,
        `DESCRIPTION:${(t.description || '').replace(/\r?\n/g, '\\n')}`,
        `STATUS:${t.status === 'done' ? 'COMPLETED' : 'CONFIRMED'}`,
        'END:VEVENT',
      ].join('\r\n');
    });

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Chronos Vault//Calendar Sync//PL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Chronos Vault - ${listName}`,
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8;' });
  triggerBlobDownload(
    blob,
    `kalendarz-chronos-${sanitizePdfAscii(listName).toLowerCase().replace(/\s+/g, '-')}.ics`
  );
}

export function buildGoogleCalendarUrl(task: ExportableTask): string {
  const start = task.dueDate ? new Date(task.dueDate) : new Date();
  const safeStart = isNaN(start.getTime()) ? new Date() : start;
  const end = new Date(safeStart.getTime() + (task.estimatedMinutes || 30) * 60000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: task.title,
    details: `${task.description || ''}\n\n[Zsynchronizowano z Chronos Vault]`,
    dates: `${fmt(safeStart)}/${fmt(end)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function parseICSFile(icsText: string): Array<{
  title: string;
  description: string;
  dueDate: string;
  estimatedMinutes: number;
}> {
  const blocks = icsText.split('BEGIN:VEVENT').slice(1);
  const results: Array<{
    title: string;
    description: string;
    dueDate: string;
    estimatedMinutes: number;
  }> = [];

  for (const block of blocks) {
    const endIdx = block.indexOf('END:VEVENT');
    const body = endIdx !== -1 ? block.slice(0, endIdx) : block;
    const lines = body.split(/\r?\n/);
    let summary = '';
    let description = '';
    let dtStart = '';

    for (const line of lines) {
      if (line.startsWith('SUMMARY:')) {
        summary = line.slice('SUMMARY:'.length).trim();
      } else if (line.startsWith('DESCRIPTION:')) {
        description = line.slice('DESCRIPTION:'.length).replace(/\\n/g, '\n').trim();
      } else if (line.startsWith('DTSTART')) {
        const val = line.split(':')[1]?.trim() || '';
        if (val.length >= 8) {
          const year = val.slice(0, 4);
          const month = val.slice(4, 6);
          const day = val.slice(6, 8);
          const hour = val.slice(9, 11) || '09';
          const min = val.slice(11, 13) || '00';
          const parsed = new Date(`${year}-${month}-${day}T${hour}:${min}:00`);
          if (!isNaN(parsed.getTime())) {
            dtStart = parsed.toISOString().slice(0, 16);
          }
        }
      }
    }

    if (summary) {
      results.push({
        title: summary.slice(0, 120),
        description: description.slice(0, 1000),
        dueDate: dtStart || new Date(Date.now() + 86400000).toISOString().slice(0, 16),
        estimatedMinutes: 30,
      });
    }
  }

  return results;
}
