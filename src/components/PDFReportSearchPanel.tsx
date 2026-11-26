import React, { useEffect, useMemo, useState } from 'react';
import {
  Search,
  FileText,
  FileDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  downloadGeneratedPDFReport,
  exportTasksToPDF,
  type ExportableTask,
  type GeneratedPDFReport,
} from '../lib/export';
import {
  buildTaskSearchIndex,
  searchIndexedPDFReport,
  type HighlightSegment,
  type IndexedFieldType,
  type PreExportSearchIndex,
} from '../lib/pdfSearchIndex';

interface PDFReportSearchPanelProps {
  tasksToExport: ExportableTask[];
  projectLabel: string;
  periodLabel: string;
  scopeMode: 'all' | 'selected';
  reportVariant: 'productivity_and_tasks' | 'tasks_only';
  includeIndexAppendix: boolean;
  onToggleIndexAppendix: (enabled: boolean) => void;
  generatedReports: GeneratedPDFReport[];
  activeReportId: string | null;
  onSelectReport: (reportId: string) => void;
  onRegisterGeneratedReport: (report: GeneratedPDFReport) => void;
}

const RenderHighlightedText: React.FC<{ segments: HighlightSegment[] }> = ({ segments }) => {
  return (
    <>
      {segments.map((seg, idx) =>
        seg.highlight ? (
          <mark
            key={idx}
            className="bg-amber-200/90 dark:bg-amber-500/30 text-slate-950 dark:text-amber-100 rounded-xs px-0.5 font-semibold"
          >
            {seg.text}
          </mark>
        ) : (
          <React.Fragment key={idx}>{seg.text}</React.Fragment>
        )
      )}
    </>
  );
};

export const PDFReportSearchPanel: React.FC<PDFReportSearchPanelProps> = ({
  tasksToExport,
  projectLabel,
  periodLabel,
  scopeMode,
  reportVariant,
  includeIndexAppendix,
  onToggleIndexAppendix,
  generatedReports,
  activeReportId,
  onSelectReport,
  onRegisterGeneratedReport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fieldFilter, setFieldFilter] = useState<'all' | IndexedFieldType>('all');
  const [activePdfPage, setActivePdfPage] = useState<number>(1);
  const [rebuildTick, setRebuildTick] = useState<number>(0);

  // 1. Pre-Export Task Content Index (built automatically prior to export)
  const preExportIndex: PreExportSearchIndex = useMemo(() => {
    void rebuildTick;
    return buildTaskSearchIndex(tasksToExport, projectLabel);
  }, [tasksToExport, projectLabel, rebuildTick]);

  const activeReport = useMemo(() => {
    if (generatedReports.length === 0) return null;
    return (
      generatedReports.find((r) => r.id === activeReportId) || generatedReports[0]
    );
  }, [generatedReports, activeReportId]);

  useEffect(() => {
    setActivePdfPage(1);
  }, [activeReport?.id]);

  // Active index used for searching: finalized PDF report index (with exact rendered page numbers)
  // if a PDF report is selected, otherwise the live pre-export index.
  const activeSearchIndex = activeReport ? activeReport.index : preExportIndex;

  const searchHits = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchIndexedPDFReport(activeSearchIndex, searchQuery, fieldFilter);
  }, [activeSearchIndex, searchQuery, fieldFilter]);

  const handleGeneratePreviewReport = (withDownload: boolean, highlightPhrase?: string) => {
    if (tasksToExport.length === 0) return;
    const report = exportTasksToPDF(tasksToExport, projectLabel, {
      projectLabel,
      periodLabel,
      scopeMode,
      reportVariant,
      includeSearchIndexAppendix: includeIndexAppendix,
      highlightQuery: highlightPhrase?.trim() || undefined,
      downloadImmediately: withDownload,
      preBuiltIndex: preExportIndex,
    });
    onRegisterGeneratedReport(report);
    setActivePdfPage(1);
  };

  const handleJumpToHitPage = (pageNumber: number) => {
    if (!activeReport && tasksToExport.length > 0) {
      // Generate in-app PDF preview automatically so user immediately views the matched page
      const report = exportTasksToPDF(tasksToExport, projectLabel, {
        projectLabel,
        periodLabel,
        scopeMode,
        reportVariant,
        includeSearchIndexAppendix: includeIndexAppendix,
        highlightQuery: searchQuery.trim() || undefined,
        downloadImmediately: false,
        preBuiltIndex: preExportIndex,
      });
      onRegisterGeneratedReport(report);
      const matchedDoc = report.index.documents.find((d) => d.pageNumber === pageNumber);
      setActivePdfPage(matchedDoc ? matchedDoc.pageNumber : pageNumber);
      return;
    }
    setActivePdfPage(Math.max(1, Math.min(pageNumber, activeReport?.pageCount || 1)));
  };

  return (
    <section className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Header & Pre-Export Indexing Controls */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Indeksacja Treści Zadań i Wyszukiwanie Pełnotekstowe w Raportach PDF
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Przed eksportem aplikacja buduje odwrócony indeks pełnotekstowy tytułów, opisów, tagów i przypisań, osadzając warstwę wyszukiwania oraz klikalny skorowidz stron wewnątrz raportu PDF.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setRebuildTick((t) => t + 1)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Przebuduj indeks
            </button>

            <button
              type="button"
              disabled={tasksToExport.length === 0}
              onClick={() => handleGeneratePreviewReport(false, searchQuery)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-900 dark:text-slate-100 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              Generuj podgląd raportu PDF
            </button>

            <button
              type="button"
              disabled={tasksToExport.length === 0}
              onClick={() => handleGeneratePreviewReport(true, searchQuery)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              Indeksuj i pobierz PDF ({tasksToExport.length})
            </button>
          </div>
        </div>

        {/* Pre-Export Index Quantitative Strip + Appendix Toggle */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-slate-600 dark:text-slate-400 font-mono tabular-nums">
            <span>
              Zaindeksowane zadania: <strong className="text-slate-900 dark:text-slate-100">{preExportIndex.taskCount}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Unikalne hasła w indeksie: <strong className="text-slate-900 dark:text-slate-100">{preExportIndex.uniqueTermCount}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Wystąpienia tokenów: <strong className="text-slate-900 dark:text-slate-100">{preExportIndex.totalTokenCount}</strong>
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Czas indeksacji przed eksportem: <strong className="text-slate-900 dark:text-slate-100">{preExportIndex.buildDurationMs} ms</strong>
            </span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 dark:text-slate-300 shrink-0">
            <input
              type="checkbox"
              checked={includeIndexAppendix}
              onChange={(e) => onToggleIndexAppendix(e.target.checked)}
              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>Dołącz alfabetyczny skorowidz haseł i stron na końcu pliku PDF</span>
          </label>
        </div>

        {/* Top Indexed Keywords Quick Filter Buttons */}
        {activeSearchIndex.topTerms.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-500 dark:text-slate-400 mr-1">
              Najczęstsze hasła w indeksie:
            </span>
            {activeSearchIndex.topTerms.slice(0, 10).map((termItem) => {
              const isSelectedTerm =
                searchQuery.trim().toLowerCase() === termItem.displayTerm.toLowerCase();
              return (
                <button
                  key={termItem.term}
                  type="button"
                  onClick={() =>
                    setSearchQuery(isSelectedTerm ? '' : termItem.displayTerm)
                  }
                  className={`px-2.5 py-1 rounded-md text-xs font-mono tabular-nums transition-colors whitespace-nowrap shrink-0 ${
                    isSelectedTerm
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {termItem.displayTerm} ({termItem.totalOccurrences})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Search Controls Bar + Generated PDF Selector */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Full-Text Search Input */}
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj pełnotekstowo w raporcie PDF (tytuły, opisy, tagi, e-maile, np. E2EE, audyt, kalendarz)..."
              className="w-full pl-10 pr-9 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                aria-label="Wyczyść wyszukiwanie"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Field Scope Segmented Filter */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {(
              [
                { id: 'all', label: 'Wszystkie pola' },
                { id: 'title', label: 'Tytuł' },
                { id: 'description', label: 'Opis' },
                { id: 'tags', label: 'Tagi' },
                { id: 'assignee', label: 'Współpracownik' },
              ] as Array<{ id: 'all' | IndexedFieldType; label: string }>
            ).map((scope) => (
              <button
                key={scope.id}
                type="button"
                onClick={() => setFieldFilter(scope.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  fieldFilter === scope.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {scope.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Generated Report Selector & Highlighted Export Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-slate-600 dark:text-slate-400">
            <span>Przeszukiwany dokument:</span>
            {generatedReports.length > 0 ? (
              <select
                value={activeReport?.id || ''}
                onChange={(e) => onSelectReport(e.target.value)}
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-900 dark:text-slate-100"
              >
                {generatedReports.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.fileName} ({rep.generatedAt} · {rep.pageCount} str. · {rep.index.taskCount} zad.)
                  </option>
                ))}
              </select>
            ) : (
              <span className="font-medium text-slate-800 dark:text-slate-200">
                Indeks przedeksportowy ({preExportIndex.taskCount} zadań) — kliknij wynik lub „Generuj podgląd raportu PDF”, aby otworzyć dokument
              </span>
            )}
          </div>

          {searchQuery.trim() && tasksToExport.length > 0 && (
            <button
              type="button"
              onClick={() => handleGeneratePreviewReport(true, searchQuery)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <FileDown className="w-3.5 h-3.5" />
              Eksportuj PDF z podświetleniem frazy „{searchQuery.trim().slice(0, 22)}”
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Split Workspace: Full-Text Search Results + Embedded Generated PDF Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 items-stretch">
        {/* Left Column (5 cols): Search Hits / Indexed Document Catalog */}
        <div className="lg:col-span-5 p-5 flex flex-col justify-between max-h-[560px] overflow-y-auto">
          {searchQuery.trim() ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800 font-mono tabular-nums">
                <span>
                  Wyniki dla „{searchQuery.trim()}”: <strong className="text-slate-900 dark:text-slate-100">{searchHits.length}</strong> z {activeSearchIndex.taskCount}
                </span>
                <span>
                  Wystąpienia: {searchHits.reduce((s, h) => s + h.totalMatches, 0)}
                </span>
              </div>

              {searchHits.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Brak trafień dla frazy „{searchQuery.trim()}”
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Sprawdź pisownię, przełącz filtr zakresu na „Wszystkie pola” lub wybierz jedno z najczęstszych haseł indeksu powyżej.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {searchHits.map((hit) => (
                    <div
                      key={hit.taskId}
                      onClick={() => handleJumpToHitPage(hit.pageNumber)}
                      className="py-3.5 first:pt-1 last:pb-1 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg px-2.5 -mx-2.5 transition-colors space-y-1.5"
                    >
                      {/* Clean Unboxed Metadata Line */}
                      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-semibold text-blue-600 dark:text-sky-400">
                            {hit.refCode}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>Strona {hit.pageNumber}</span>
                          <span aria-hidden="true">·</span>
                          <span>Trafienia: {hit.totalMatches}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-sans">
                            {hit.matchedFieldLabels.join(' / ')}
                          </span>
                        </div>
                        <span className="text-blue-600 dark:text-sky-400 font-sans font-medium shrink-0">
                          Otwórz str. {hit.pageNumber} →
                        </span>
                      </div>

                      {/* Highlighted Task Title */}
                      <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                        <RenderHighlightedText segments={hit.titleSegments} />
                      </div>

                      {/* Highlighted Field Snippets */}
                      {hit.snippets.map((snip, sIdx) => (
                        <p
                          key={sIdx}
                          className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                        >
                          <span className="font-medium text-slate-500 dark:text-slate-400">
                            {snip.fieldLabel}:{' '}
                          </span>
                          <RenderHighlightedText segments={snip.segments} />
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                <span>Zaindeksowany katalog zadań w raporcie ({activeSearchIndex.documents.length})</span>
                <span className="font-mono tabular-nums">Strona w PDF</span>
              </div>

              {activeSearchIndex.documents.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500 dark:text-slate-400">
                  Brak zadań w wybranym zakresie eksportu. Zmień filtr projektu lub zaznaczenie powyżej.
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-800">
                  {activeSearchIndex.documents.map((docItem) => (
                    <button
                      key={docItem.taskId}
                      type="button"
                      onClick={() => handleJumpToHitPage(docItem.pageNumber)}
                      className="w-full text-left py-2.5 px-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <div className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                          <span className="font-mono text-slate-500 dark:text-slate-400 mr-1.5">
                            {docItem.refCode}
                          </span>
                          {docItem.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {docItem.projectText} · {docItem.tokenCount} tokenów w indeksie
                          {docItem.tagsText ? ` · ${docItem.tagsText}` : ''}
                        </div>
                      </div>
                      <span className="text-xs font-mono tabular-nums text-blue-600 dark:text-sky-400 shrink-0">
                        str. {docItem.pageNumber}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column (7 cols): Live Generated PDF Report Viewer & Page Navigator */}
        <div className="lg:col-span-7 p-5 flex flex-col justify-between bg-slate-50/60 dark:bg-slate-950/50 min-h-[460px]">
          {activeReport ? (
            <div className="flex flex-col h-full gap-3">
              {/* Viewer Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 truncate">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-sky-400 shrink-0" />
                  <span className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-[240px]">
                    {activeReport.fileName}
                  </span>
                  {activeReport.highlightQuery && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-700 dark:text-amber-400">
                        Podświetlono: „{activeReport.highlightQuery}”
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    disabled={activePdfPage <= 1}
                    onClick={() => setActivePdfPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                    aria-label="Poprzednia strona PDF"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono tabular-nums text-xs text-slate-700 dark:text-slate-300">
                    Strona {activePdfPage} z {activeReport.pageCount}
                  </span>
                  <button
                    type="button"
                    disabled={activePdfPage >= activeReport.pageCount}
                    onClick={() =>
                      setActivePdfPage((p) => Math.min(activeReport.pageCount, p + 1))
                    }
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 disabled:opacity-40"
                    aria-label="Następna strona PDF"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadGeneratedPDFReport(activeReport)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Pobierz PDF
                  </button>
                </div>
              </div>

              {/* Embedded Generated PDF Frame */}
              <iframe
                key={`${activeReport.id}-page-${activePdfPage}`}
                src={`${activeReport.blobUrl}#page=${activePdfPage}&view=FitH`}
                title={`Podgląd wygenerowanego raportu PDF — strona ${activePdfPage}`}
                className="w-full flex-1 min-h-[420px] rounded-lg border border-slate-200 dark:border-slate-800 bg-white"
              />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-3">
              <FileText className="w-8 h-8 text-slate-400 dark:text-slate-500" />
              <div className="space-y-1 max-w-md">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Indeks pełnotekstowy jest gotowy ({preExportIndex.uniqueTermCount} unikalnych haseł)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Wyszukaj dowolną frazę po lewej stronie lub wygeneruj raport PDF, aby przeglądać wygenerowany dokument strona po stronie i przechodzić bezpośrednio do dopasowanych zadań.
                </p>
              </div>
              <button
                type="button"
                disabled={tasksToExport.length === 0}
                onClick={() => handleGeneratePreviewReport(false, searchQuery)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 whitespace-nowrap shrink-0"
              >
                Wygeneruj i Otwórz Raport PDF ({tasksToExport.length} zadań)
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
