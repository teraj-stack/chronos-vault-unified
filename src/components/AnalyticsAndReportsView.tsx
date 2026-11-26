import React, { useMemo, useState } from 'react';
import {
  FileDown,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  TrendingUp,
  Filter,
  CheckSquare,
  Square,
  BarChart3,
  Layers,
} from 'lucide-react';
import {
  exportTasksToCSV,
  exportTasksToPDF,
  type ExportableTask,
  type GeneratedPDFReport,
} from '../lib/export';
import { PDFReportSearchPanel } from './PDFReportSearchPanel';
import { type WorkspaceListModel } from './TeamAndSecurityModal';

interface AnalyticsAndReportsViewProps {
  allTasks: ExportableTask[];
  lists: WorkspaceListModel[];
  activeListId: string;
  selectedTaskIds: string[];
  onToggleSelectTask: (taskId: string) => void;
  onSelectMultipleTasks: (taskIds: string[]) => void;
  onClearSelection: () => void;
  generatedReports: GeneratedPDFReport[];
  activeReportId: string | null;
  onSelectReport: (reportId: string) => void;
  onRegisterGeneratedReport: (report: GeneratedPDFReport) => void;
}

type TimeRangeOption = '7d' | '14d' | '30d' | 'all';

const PERIOD_LABELS: Record<TimeRangeOption, string> = {
  '7d': 'Ostatnie i nadchodzące 7 dni',
  '14d': 'Okno 14 dni',
  '30d': 'Okno 30 dni',
  all: 'Cały okres (Wszystkie daty)',
};

const STATUS_NAMES: Record<ExportableTask['status'], string> = {
  todo: 'Do zrobienia',
  in_progress: 'W trakcie',
  review: 'Weryfikacja',
  done: 'Ukończone',
};

const PRIORITY_NAMES: Record<ExportableTask['priority'], string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
  urgent: 'Krytyczny',
};

export const AnalyticsAndReportsView: React.FC<AnalyticsAndReportsViewProps> = ({
  allTasks,
  lists,
  activeListId,
  selectedTaskIds,
  onToggleSelectTask,
  onSelectMultipleTasks,
  onClearSelection,
  generatedReports,
  activeReportId,
  onSelectReport,
  onRegisterGeneratedReport,
}) => {
  // Filter state: by Project/List and by Time Period
  const [projectFilter, setProjectFilter] = useState<string>(activeListId || 'all');
  const [timeRange, setTimeRange] = useState<TimeRangeOption>('14d');

  // Export configuration state
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv'>('pdf');
  const [exportScope, setExportScope] = useState<'all' | 'selected'>('all');
  const [reportVariant, setReportVariant] = useState<'productivity_and_tasks' | 'tasks_only'>(
    'productivity_and_tasks'
  );
  const [includeIndexAppendix, setIncludeIndexAppendix] = useState<boolean>(true);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  // Filter tasks by project and time range
  const filteredTasks = useMemo(() => {
    const now = new Date();
    const rangeDays =
      timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : timeRange === '30d' ? 30 : null;

    return allTasks.filter((task) => {
      const matchesProject = projectFilter === 'all' || task.listId === projectFilter;
      if (!matchesProject) return false;

      if (rangeDays !== null && task.dueDate) {
        const taskDate = new Date(task.dueDate);
        if (!isNaN(taskDate.getTime())) {
          const diffDays = Math.abs(taskDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
          if (diffDays > rangeDays) return false;
        }
      }
      return true;
    });
  }, [allTasks, projectFilter, timeRange]);

  const selectedInFiltered = useMemo(
    () => filteredTasks.filter((t) => selectedTaskIds.includes(t.id)),
    [filteredTasks, selectedTaskIds]
  );

  const tasksToExport = useMemo(() => {
    if (exportScope === 'selected') {
      return selectedInFiltered.length > 0
        ? selectedInFiltered
        : allTasks.filter((t) => selectedTaskIds.includes(t.id));
    }
    return filteredTasks;
  }, [exportScope, selectedInFiltered, allTasks, selectedTaskIds, filteredTasks]);

  const currentProjectLabel = useMemo(() => {
    if (projectFilter === 'all') return 'Wszystkie Projekty';
    return lists.find((l) => l.id === projectFilter)?.name || 'Wybrany Projekt';
  }, [projectFilter, lists]);

  // Metrics
  const total = filteredTasks.length;
  const todoCount = filteredTasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = filteredTasks.filter((t) => t.status === 'in_progress').length;
  const reviewCount = filteredTasks.filter((t) => t.status === 'review').length;
  const doneCount = filteredTasks.filter((t) => t.status === 'done').length;

  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const totalMinutes = filteredTasks.reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);
  const completedMinutes = filteredTasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);
  const inProgressMinutes = filteredTasks
    .filter((t) => t.status === 'in_progress' || t.status === 'review')
    .reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);

  const timeEfficiencyRate =
    totalMinutes > 0 ? Math.round((completedMinutes / totalMinutes) * 100) : 0;

  // Overall productivity score (weighted: 60% task completion + 40% time completion)
  const overallProductivityScore =
    total > 0 ? Math.round(completionRate * 0.6 + timeEfficiencyRate * 0.4) : 0;

  // Chart 1 Data: Completed vs Scheduled Tasks Over Time (7-bucket timeline around current window)
  const timelineBuckets = useMemo(() => {
    const buckets: Array<{
      dateKey: string;
      label: string;
      completedCount: number;
      totalCount: number;
      minutesSpent: number;
    }> = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build 7 daily buckets (-2 days to +4 days) to show active timeline
    for (let offset = -2; offset <= 4; offset++) {
      const d = new Date(today.getTime() + offset * 86400000);
      const dateKey = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('pl-PL', { weekday: 'short', day: '2-digit', month: '2-digit' });

      const dayTasks = filteredTasks.filter((t) => t.dueDate && t.dueDate.startsWith(dateKey));
      const completed = dayTasks.filter((t) => t.status === 'done');
      const mins = dayTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);

      buckets.push({
        dateKey,
        label,
        completedCount: completed.length,
        totalCount: dayTasks.length,
        minutesSpent: mins,
      });
    }
    return buckets;
  }, [filteredTasks]);

  const maxTimelineTasks = Math.max(...timelineBuckets.map((b) => b.totalCount), 4);

  // Chart 2 Data: Time Spent & Scheduled by Project and Priority
  const projectTimeBreakdown = useMemo(() => {
    return lists.map((list) => {
      const listTasks = filteredTasks.filter((t) => t.listId === list.id);
      const doneMins = listTasks
        .filter((t) => t.status === 'done')
        .reduce((s, t) => s + (t.estimatedMinutes || 0), 0);
      const totalMins = listTasks.reduce((s, t) => s + (t.estimatedMinutes || 0), 0);
      return {
        id: list.id,
        name: list.name,
        taskCount: listTasks.length,
        doneCount: listTasks.filter((t) => t.status === 'done').length,
        doneMinutes: doneMins,
        totalMinutes: totalMins,
      };
    });
  }, [lists, filteredTasks]);

  const maxProjectMinutes = Math.max(...projectTimeBreakdown.map((p) => p.totalMinutes), 60);

  // Priority breakdown
  const priorities: Array<{ key: ExportableTask['priority']; label: string; color: string }> = [
    { key: 'urgent', label: 'Krytyczny', color: '#DC2626' },
    { key: 'high', label: 'Wysoki', color: '#D97706' },
    { key: 'medium', label: 'Średni', color: '#2563EB' },
    { key: 'low', label: 'Niski', color: '#64748B' },
  ];

  const priorityStats = priorities.map((p) => {
    const matching = filteredTasks.filter((t) => t.priority === p.key);
    const minutes = matching.reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);
    const doneMins = matching
      .filter((t) => t.status === 'done')
      .reduce((sum, t) => sum + (t.estimatedMinutes || 0), 0);
    return {
      ...p,
      count: matching.length,
      minutes,
      doneMins,
    };
  });

  const maxPriorityMinutes = Math.max(...priorityStats.map((s) => s.minutes), 60);

  // Donut chart math
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const segments = [
    { label: 'Ukończone', count: doneCount, color: '#16A34A' },
    { label: 'Weryfikacja', count: reviewCount, color: '#0284C7' },
    { label: 'W trakcie', count: inProgressCount, color: '#D97706' },
    { label: 'Do zrobienia', count: todoCount, color: '#64748B' },
  ];
  let cumulativePercent = 0;

  const handleRunExport = () => {
    if (exportScope === 'selected' && tasksToExport.length === 0) {
      setExportFeedback(
        'Zaznacz przynajmniej jedno zadanie w tabeli poniżej lub przełącz zakres na „Wszystkie zadania”.'
      );
      return;
    }

    const opts = {
      projectLabel: currentProjectLabel,
      periodLabel: PERIOD_LABELS[timeRange],
      scopeMode: exportScope,
      reportVariant,
      includeSearchIndexAppendix: includeIndexAppendix,
    };

    if (exportFormat === 'pdf') {
      const generated = exportTasksToPDF(tasksToExport, currentProjectLabel, opts);
      onRegisterGeneratedReport(generated);
      setExportFeedback(
        `Zaindeksowano ${generated.index.taskCount} zadań (${generated.index.uniqueTermCount} haseł w ${generated.index.buildDurationMs} ms) i wyeksportowano plik PDF (${generated.pageCount} str.). Dokument jest gotowy do wyszukiwania pełnotekstowego poniżej.`
      );
    } else {
      exportTasksToCSV(tasksToExport, currentProjectLabel, opts);
      setExportFeedback(
        `Wygenerowano plik CSV (${tasksToExport.length} zadań · ${
          exportScope === 'selected' ? 'Tylko zaznaczone' : 'Wszystkie w widoku'
        }).`
      );
    }
  };

  const allFilteredSelected =
    filteredTasks.length > 0 && filteredTasks.every((t) => selectedTaskIds.includes(t.id));

  const handleToggleSelectAllVisible = () => {
    if (allFilteredSelected) {
      onClearSelection();
    } else {
      onSelectMultipleTasks(filteredTasks.map((t) => t.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Interactive Filter Bar (By Project & Time Period) */}
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Moduł Analityki Produktywności i Eksportu Raportów
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Analizuj ukończone zadania w czasie, alokację godzin roboczych oraz eksportuj wybrane lub wszystkie zadania do PDF i CSV
            </p>
          </div>

          {/* Project & Time Range Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Projekt:
              </label>
              <select
                value={projectFilter}
                onChange={(e) => setProjectFilter(e.target.value)}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Wszystkie projekty ({lists.length})</option>
                {lists.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              {(
                [
                  { id: '7d', label: '7 dni' },
                  { id: '14d', label: '14 dni' },
                  { id: '30d', label: '30 dni' },
                  { id: 'all', label: 'Cały okres' },
                ] as Array<{ id: TimeRangeOption; label: string }>
              ).map((period) => (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => setTimeRange(period.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    timeRange === period.id
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dedicated Export Configuration Studio (PDF / CSV, Selected vs All Tasks) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Format choice */}
            <div className="space-y-1">
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                1. Format eksportu
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setExportFormat('pdf')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    exportFormat === 'pdf'
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-500'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <FileDown className="w-3.5 h-3.5" />
                  PDF (Czytelny raport)
                </button>
                <button
                  type="button"
                  onClick={() => setExportFormat('csv')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    exportFormat === 'csv'
                      ? 'bg-slate-900 text-white border-slate-900 dark:bg-sky-500 dark:text-slate-950 dark:border-sky-500'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  CSV (Analiza danych)
                </button>
              </div>
            </div>

            {/* Scope choice: All vs Selected */}
            <div className="space-y-1">
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                2. Zakres zadań
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setExportScope('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                    exportScope === 'all'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Wszystkie w filtrze ({filteredTasks.length})
                </button>
                <button
                  type="button"
                  onClick={() => setExportScope('selected')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                    exportScope === 'selected'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  Tylko zaznaczone ({selectedTaskIds.length})
                </button>
              </div>
            </div>

            {/* Content variant */}
            <div className="space-y-1">
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                3. Zawartość dokumentu
              </span>
              <select
                value={reportVariant}
                onChange={(e) =>
                  setReportVariant(
                    e.target.value as 'productivity_and_tasks' | 'tasks_only'
                  )
                }
                className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-800 dark:text-slate-200"
              >
                <option value="productivity_and_tasks">
                  Pełny Raport Produktywności + Lista Zadań
                </option>
                <option value="tasks_only">Tylko Lista Zadań (Tabela)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleRunExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              {exportFormat === 'pdf' ? (
                <FileDown className="w-4 h-4" />
              ) : (
                <FileSpreadsheet className="w-4 h-4" />
              )}
              Eksportuj {exportFormat.toUpperCase()} ({tasksToExport.length} zad.)
            </button>
          </div>
        </div>

        {exportFeedback && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-200">
            {exportFeedback}
          </div>
        )}
      </div>

      {/* Pre-Export Indexing & Full-Text Search in Generated PDF Reports */}
      <PDFReportSearchPanel
        tasksToExport={tasksToExport}
        projectLabel={currentProjectLabel}
        periodLabel={PERIOD_LABELS[timeRange]}
        scopeMode={exportScope}
        reportVariant={reportVariant}
        includeIndexAppendix={includeIndexAppendix}
        onToggleIndexAppendix={setIncludeIndexAppendix}
        generatedReports={generatedReports}
        activeReportId={activeReportId}
        onSelectReport={onSelectReport}
        onRegisterGeneratedReport={onRegisterGeneratedReport}
      />

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Ogólna Produktywność</span>
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-sky-400" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            {overallProductivityScore}/100
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            Skuteczność zadań ({completionRate}%) i czasu ({timeEfficiencyRate}%)
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Ukończone Zadania</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            {doneCount} / {total}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            Wskaźnik realizacji: {completionRate}%
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Czas Poświęcony na Zadania</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            {Math.floor(completedMinutes / 60)}h {completedMinutes % 60}m
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            Z {Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m zaplanowanych ({inProgressMinutes}m w toku)
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>Średni Czas na Zadanie</span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
            {total > 0 ? Math.round(totalMinutes / total) : 0} min
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            W trakcie: {inProgressCount} · Weryfikacja: {reviewCount}
          </div>
        </div>
      </div>

      {/* Chart Row 1: Completed Tasks Over Time + Kanban Overall Productivity Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Completed Tasks Over Time (Vertical Bar & Time Trend) */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Ukończone i Zaplanowane Zadania w Czasie (Oś Dziennego Postępu)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Porównanie liczby zadań ukończonych (zielony) względem wszystkich zaplanowanych na dany dzień
            </p>
          </div>

          <div className="grid grid-cols-7 gap-3 items-end h-48 pt-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            {timelineBuckets.map((bucket) => {
              const totalHeightPct = Math.round((bucket.totalCount / maxTimelineTasks) * 100);
              const doneHeightPct = Math.round((bucket.completedCount / maxTimelineTasks) * 100);

              return (
                <div
                  key={bucket.dateKey}
                  className="flex flex-col items-center justify-end h-full gap-2"
                >
                  <div className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                    {bucket.completedCount}/{bucket.totalCount}
                  </div>
                  <div className="w-full max-w-[36px] h-32 bg-slate-100 dark:bg-slate-800 rounded-t-md relative flex items-end overflow-hidden">
                    {/* Scheduled bar */}
                    <div
                      className="w-full bg-slate-300 dark:bg-slate-700 transition-all duration-300 rounded-t-md"
                      style={{ height: `${Math.max(totalHeightPct, bucket.totalCount > 0 ? 12 : 0)}%` }}
                    />
                    {/* Completed overlay bar */}
                    <div
                      className="w-full bg-emerald-600 dark:bg-emerald-500 absolute bottom-0 left-0 right-0 transition-all duration-300 rounded-t-md"
                      style={{
                        height: `${Math.max(doneHeightPct, bucket.completedCount > 0 ? 12 : 0)}%`,
                      }}
                    />
                  </div>
                  <div className="text-[11px] font-mono tabular-nums text-slate-600 dark:text-slate-400 text-center">
                    {bucket.label}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-emerald-600 inline-block" />
                Ukończone zadania
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-slate-300 dark:bg-slate-700 inline-block" />
                Zaplanowane w terminie
              </span>
            </div>
            <span className="font-mono tabular-nums">
              Łącznie w oknie: {timelineBuckets.reduce((s, b) => s + b.minutesSpent, 0)} min
            </span>
          </div>
        </div>

        {/* Chart 2: Overall Productivity & Stage Distribution Donut */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Struktura Produktywności i Etapów Pracy (Kanban)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
            Udział poszczególnych statusów w wybranym projekcie i przedziale czasu
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 148 148">
                <circle
                  cx="74"
                  cy="74"
                  r={radius}
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="16"
                  className="text-slate-100 dark:text-slate-800"
                />
                {total > 0 &&
                  segments.map((seg, idx) => {
                    const pct = seg.count / total;
                    const strokeDasharray = `${pct * circumference} ${circumference}`;
                    const strokeDashoffset = -cumulativePercent * circumference;
                    cumulativePercent += pct;
                    return (
                      <circle
                        key={idx}
                        cx="74"
                        cy="74"
                        r={radius}
                        fill="transparent"
                        stroke={seg.color}
                        strokeWidth="16"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                      />
                    );
                  })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                  {completionRate}%
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Ukończono</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-3">
              {segments.map((seg) => {
                const pct = total > 0 ? Math.round((seg.count / total) * 100) : 0;
                return (
                  <div key={seg.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {seg.label}
                      </span>
                      <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                        {seg.count} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${pct}%`, backgroundColor: seg.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Row 2: Time Spent by Project & Time Spent by Priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Spent by Project */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              Czas Poświęcony na Zadania według Projektów
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zrealizowany czas pracy na tle całkowitego budżetu minut w każdym projekcie
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {projectTimeBreakdown.map((proj) => {
              const totalPct = Math.round((proj.totalMinutes / maxProjectMinutes) * 100);
              const donePct =
                proj.totalMinutes > 0
                  ? Math.round((proj.doneMinutes / proj.totalMinutes) * 100)
                  : 0;
              return (
                <div key={proj.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {proj.name} ({proj.doneCount}/{proj.taskCount} zad.)
                    </span>
                    <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {proj.doneMinutes} min ukończone / {proj.totalMinutes} min łącznie ({donePct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <div
                      className="h-full bg-slate-300 dark:bg-slate-700 rounded-lg"
                      style={{ width: `${Math.max(totalPct, proj.totalMinutes > 0 ? 8 : 0)}%` }}
                    />
                    <div
                      className="h-full bg-blue-600 dark:bg-sky-500 rounded-lg absolute top-0 left-0"
                      style={{
                        width: `${Math.round((proj.doneMinutes / maxProjectMinutes) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Allocation by Priority */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Czas Poświęcony na Zadania według Priorytetów
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Alokacja minut roboczych w podziale na krytyczność zadań
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {priorityStats.map((stat) => {
              const widthPct = Math.round((stat.minutes / maxPriorityMinutes) * 100);
              return (
                <div key={stat.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {stat.label} ({stat.count} zad.)
                    </span>
                    <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      Ukończono: {stat.doneMins} min / Łącznie: {stat.minutes} min
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-300"
                      style={{
                        width: `${Math.max(widthPct, stat.minutes > 0 ? 6 : 0)}%`,
                        backgroundColor: stat.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Task Selection Table for Custom PDF/CSV Report Export */}
      <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Wybór Zadań do Eksportu ({selectedTaskIds.length} zaznaczonych z {filteredTasks.length} widocznych)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zaznacz dowolne zadania poniżej, aby wyeksportować spersonalizowany raport PDF lub plik CSV
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleToggleSelectAllVisible}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0"
            >
              {allFilteredSelected ? 'Odznacz wszystkie' : 'Zaznacz wszystkie w tabeli'}
            </button>
            {selectedTaskIds.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setExportScope('selected');
                  const selectedList = allTasks.filter((t) => selectedTaskIds.includes(t.id));
                  if (exportFormat === 'pdf') {
                    const generated = exportTasksToPDF(selectedList, currentProjectLabel, {
                      projectLabel: currentProjectLabel,
                      periodLabel: PERIOD_LABELS[timeRange],
                      scopeMode: 'selected',
                      reportVariant,
                      includeSearchIndexAppendix: includeIndexAppendix,
                    });
                    onRegisterGeneratedReport(generated);
                  } else {
                    exportTasksToCSV(selectedList, currentProjectLabel, {
                      projectLabel: currentProjectLabel,
                      periodLabel: PERIOD_LABELS[timeRange],
                      scopeMode: 'selected',
                      reportVariant,
                    });
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                Eksportuj zaznaczone ({selectedTaskIds.length}) do {exportFormat.toUpperCase()}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4 w-10">Wybór</th>
                <th className="py-3 px-4">Tytuł zadania</th>
                <th className="py-3 px-4">Projekt / Lista</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Priorytet</th>
                <th className="py-3 px-4">Termin</th>
                <th className="py-3 px-4 text-right">Czas (min)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 dark:text-slate-400">
                    Brak zadań spełniających wybrane kryteria filtrowania projektu i okresu czasu.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => {
                  const isChecked = selectedTaskIds.includes(task.id);
                  return (
                    <tr
                      key={task.id}
                      onClick={() => onToggleSelectTask(task.id)}
                      className={`cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-blue-50/50 dark:bg-sky-950/30'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <td className="py-2.5 px-4">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSelectTask(task.id);
                          }}
                          className="text-slate-500 dark:text-slate-400 hover:text-blue-600"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                        {task.title}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">
                        {task.listName || currentProjectLabel}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">
                        {STATUS_NAMES[task.status] || task.status}
                      </td>
                      <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">
                        {PRIORITY_NAMES[task.priority] || task.priority}
                      </td>
                      <td className="py-2.5 px-4 font-mono tabular-nums text-slate-500 dark:text-slate-400">
                        {task.dueDate
                          ? new Date(task.dueDate).toLocaleString('pl-PL', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '—'}
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono tabular-nums font-semibold text-slate-800 dark:text-slate-200">
                        {task.estimatedMinutes} min
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
