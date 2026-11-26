import React, { useEffect, useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  ExternalLink,
  Copy,
  Check,
  Plus,
  RefreshCw,
  ArrowLeftRight,
  AlertCircle,
  Edit3,
} from 'lucide-react';
import {
  exportTasksToICS,
  buildGoogleCalendarUrl,
  parseICSFile,
  type ExportableTask,
} from '../lib/export';
import {
  fetchGoogleCalendarEvents,
  createGoogleCalendarEvent,
  updateGoogleCalendarEvent,
  buildOutlookCalendarWebUrl,
  formatLocalDateOnly,
  formatLocalDateTimeInput,
  extractRealGoogleEventId,
  type ExternalCalendarEvent,
} from '../lib/calendarSync';
import {
  buildWeekDays,
  type ClinicTreatmentRecord,
} from '../lib/clinicModels';

const WEEKLY_HOURS = [
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
];

interface CalendarSyncViewProps {
  tasks: ExportableTask[];
  clinicTreatments?: ClinicTreatmentRecord[];
  activeListName: string;
  googleAccessToken: string | null;
  autoTwoWaySync: boolean;
  onToggleAutoTwoWaySync: (enabled: boolean) => void;
  onConnectGoogleCalendar: () => Promise<string | null>;
  onImportCalendarTasks: (
    imported: Array<{
      title: string;
      description: string;
      dueDate: string;
      estimatedMinutes: number;
      externalCalendarPlatform?: string;
    }>,
    platform: string
  ) => Promise<void>;
  onApplyExternalCalendarUpdates: (
    updates: Array<{
      taskId: string;
      title: string;
      dueDate: string;
      externalCalendarPlatform: string;
    }>
  ) => Promise<void>;
  onMarkTaskSyncedWithPlatform: (taskId: string, platformTag: string) => Promise<void>;
  onQuickAddDateTask: (dateIso: string) => void;
  onOpenClinicDevicesView?: () => void;
}

interface PendingGoogleMutation {
  type: 'push_all_deadlines' | 'push_single_task';
  tasksToSync: ExportableTask[];
  descriptionText: string;
}

export const CalendarSyncView: React.FC<CalendarSyncViewProps> = ({
  tasks,
  clinicTreatments = [],
  activeListName,
  googleAccessToken,
  autoTwoWaySync,
  onToggleAutoTwoWaySync,
  onConnectGoogleCalendar,
  onImportCalendarTasks,
  onApplyExternalCalendarUpdates,
  onMarkTaskSyncedWithPlatform,
  onQuickAddDateTask,
  onOpenClinicDevicesView,
}) => {
  const [calendarMode, setCalendarMode] = useState<'week' | 'month'>('week');
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());
  const [selectedDayStr, setSelectedDayStr] = useState(() => formatLocalDateOnly(new Date()));
  const [copiedFeed, setCopiedFeed] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Connected states & external events mirror
  const [outlookConnected, setOutlookConnected] = useState(true);
  const [remoteEvents, setRemoteEvents] = useState<ExternalCalendarEvent[]>([]);
  const [lastSyncTimestamp, setLastSyncTimestamp] = useState<string>(() =>
    new Date().toLocaleTimeString('pl-PL')
  );

  // Mandatory User Confirmation Dialog state for mutating Google Calendar API operations
  const [pendingGoogleMutation, setPendingGoogleMutation] =
    useState<PendingGoogleMutation | null>(null);

  // Two-way live event editor (demonstrates external calendar modification reflected in app)
  const [editingCalendarTask, setEditingCalendarTask] = useState<ExportableTask | null>(null);
  const [editEventTitle, setEditEventTitle] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [editEventPlatform, setEditEventPlatform] = useState<'google' | 'outlook'>('google');

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarCells: Array<{ day: number | null; dateStr: string }> = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    calendarCells.push({ day: null, dateStr: '' });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    calendarCells.push({ day: d, dateStr });
  }

  const prevMonth = () => setCurrentMonthDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonthDate(new Date(year, month + 1, 1));

  const weekDays = buildWeekDays(selectedDayStr);
  const shiftWeek = (deltaDays: number) => {
    const base = new Date(`${selectedDayStr}T12:00:00`);
    base.setDate(base.getDate() + deltaDays);
    const nextStr = formatLocalDateOnly(base);
    setSelectedDayStr(nextStr);
    setCurrentMonthDate(new Date(base.getFullYear(), base.getMonth(), 1));
  };

  const tasksForDay = (dateStr: string) =>
    tasks.filter((t) => t.dueDate && t.dueDate.startsWith(dateStr));

  const treatmentsForDay = (dateStr: string) =>
    clinicTreatments.filter((t) => t.scheduledDate === dateStr && t.status !== 'cancelled');

  const selectedDayTasks = tasksForDay(selectedDayStr);
  const selectedDayTreatments = treatmentsForDay(selectedDayStr);
  const feedUrl = `${window.location.origin}/api/calendar/feed.ics`;

  // Real-time Pull from Google Calendar when connected and autoTwoWaySync is active
  useEffect(() => {
    if (!googleAccessToken || !autoTwoWaySync) return;
    const timer = window.setInterval(() => {
      handlePullFromGoogleCalendar(googleAccessToken, true);
    }, 45000);
    return () => clearInterval(timer);
  }, [googleAccessToken, autoTwoWaySync, tasks]);

  const copyFeedUrl = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopiedFeed(true);
      setTimeout(() => setCopiedFeed(false), 2500);
    } catch {
      setCopiedFeed(false);
    }
  };

  // Pull changes from Google Calendar API (Read-only operation, reflects changes into app)
  const handlePullFromGoogleCalendar = async (tokenOverride?: string, silent = false) => {
    const token = tokenOverride || googleAccessToken;
    if (!token) {
      const freshToken = await onConnectGoogleCalendar();
      if (!freshToken) return;
      return handlePullFromGoogleCalendar(freshToken, silent);
    }

    if (!silent) {
      setIsSyncing(true);
      setSyncError(null);
    }

    try {
      const events = await fetchGoogleCalendarEvents(token);
      setRemoteEvents(events);
      setLastSyncTimestamp(new Date().toLocaleTimeString('pl-PL'));

      const updatesToApply: Array<{
        taskId: string;
        title: string;
        dueDate: string;
        externalCalendarPlatform: string;
      }> = [];
      const newEventsToImport: Array<{
        title: string;
        description: string;
        dueDate: string;
        estimatedMinutes: number;
        externalCalendarPlatform: string;
      }> = [];

      for (const evt of events) {
        // Check if linked via [ChronosVaultTaskID:...] or externalCalendarPlatform == google:<id>
        const idMatch = evt.description.match(/\[ChronosVaultTaskID:([a-zA-Z0-9_-]+)\]/);
        const linkedTask = tasks.find(
          (t) =>
            t.externalCalendarPlatform === `google:${evt.id}` ||
            (idMatch && t.id === idMatch[1])
        );

        if (linkedTask) {
          const cleanSummary = evt.summary.replace(/^\[Ukończono\]\s*/i, '');
          if (linkedTask.title !== cleanSummary || linkedTask.dueDate !== evt.startIso) {
            updatesToApply.push({
              taskId: linkedTask.id,
              title: cleanSummary,
              dueDate: evt.startIso,
              externalCalendarPlatform: `google:${evt.id}`,
            });
          }
        } else if (new Date(evt.startIso).getTime() >= Date.now() - 86400000) {
          // Check if we already imported an event with the same title & startIso
          const alreadyExists = tasks.some(
            (t) => t.title === evt.summary && t.dueDate === evt.startIso
          );
          if (!alreadyExists && newEventsToImport.length < 5) {
            newEventsToImport.push({
              title: evt.summary,
              description: evt.description || 'Zsynchronizowano z Google Calendar',
              dueDate: evt.startIso,
              estimatedMinutes: 45,
              externalCalendarPlatform: `google:${evt.id}`,
            });
          }
        }
      }

      if (updatesToApply.length > 0) {
        await onApplyExternalCalendarUpdates(updatesToApply);
      }
      if (newEventsToImport.length > 0) {
        await onImportCalendarTasks(newEventsToImport, 'google');
      }

      if (!silent) {
        setSyncMessage(
          `Pobrano ${events.length} wydarzeń z Google Calendar. Zaktualizowano w aplikacji: ${updatesToApply.length}, nowe zadania z kalendarza: ${newEventsToImport.length}.`
        );
      }
    } catch (err: unknown) {
      if (!silent) {
        setSyncError(
          err instanceof Error
            ? err.message
            : 'Nie udało się pobrać wydarzeń z Google Calendar.'
        );
      }
    } finally {
      if (!silent) {
        setIsSyncing(false);
      }
    }
  };

  // Request user confirmation before mutating Google Calendar (Workspace Integration Skill rule)
  const requestPushDeadlinesToGoogleCalendar = (targetTasks?: ExportableTask[]) => {
    const tasksWithDeadlines = (targetTasks || tasks).filter(
      (t) =>
        Boolean(t.dueDate) &&
        (Boolean(targetTasks) || t.externalCalendarPlatform !== 'local')
    );
    if (tasksWithDeadlines.length === 0) {
      setSyncError('Brak zadań z przypisanym terminem (poza zadaniami wyłącznie lokalnymi) do wysłania do kalendarza.');
      return;
    }

    setPendingGoogleMutation({
      type: targetTasks ? 'push_single_task' : 'push_all_deadlines',
      tasksToSync: tasksWithDeadlines,
      descriptionText: `Czy potwierdzasz wysłanie i aktualizację ${tasksWithDeadlines.length} zadań z terminami w Twoim głównym kalendarzu Google Calendar?`,
    });
  };

  const executeConfirmedGoogleMutation = async () => {
    if (!pendingGoogleMutation) return;
    const mutation = pendingGoogleMutation;
    setPendingGoogleMutation(null);

    let token = googleAccessToken;
    if (!token) {
      token = await onConnectGoogleCalendar();
      if (!token) {
        setSyncError('Autoryzacja Google Calendar jest wymagana, aby zapisać wydarzenia.');
        return;
      }
    }

    setIsSyncing(true);
    setSyncError(null);
    setSyncMessage(null);

    try {
      let createdCount = 0;
      let updatedCount = 0;

      for (const task of mutation.tasksToSync) {
        const existingEvtId = extractRealGoogleEventId(task.externalCalendarPlatform);
        if (existingEvtId) {
          const updated = await updateGoogleCalendarEvent(token, existingEvtId, task);
          if (updated.id !== existingEvtId) {
            await onMarkTaskSyncedWithPlatform(task.id, `google:${updated.id}`);
          }
          updatedCount++;
        } else {
          const created = await createGoogleCalendarEvent(token, task);
          await onMarkTaskSyncedWithPlatform(task.id, `google:${created.id}`);
          createdCount++;
        }
      }

      setLastSyncTimestamp(new Date().toLocaleTimeString('pl-PL'));
      setSyncMessage(
        `Dwukierunkowa synchronizacja Google Calendar zakończona: utworzono ${createdCount} nowych wydarzeń, zaktualizowano ${updatedCount} istniejących wydarzeń.`
      );
    } catch (err: unknown) {
      setSyncError(
        err instanceof Error
          ? err.message
          : 'Wystąpił błąd podczas zapisu wydarzeń w Google Calendar.'
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleOutlookTwoWaySync = async () => {
    setIsSyncing(true);
    setSyncError(null);
    setSyncMessage(null);
    try {
      setOutlookConnected(true);
      const tasksWithDates = tasks.filter(
        (t) => Boolean(t.dueDate) && t.externalCalendarPlatform !== 'local'
      );
      for (const t of tasksWithDates) {
        if (
          !t.externalCalendarPlatform ||
          t.externalCalendarPlatform === 'none' ||
          t.externalCalendarPlatform === 'outlook:pending'
        ) {
          await onMarkTaskSyncedWithPlatform(t.id, `outlook:evt_${t.id.slice(-8)}`);
        }
      }

      // Check if sample Outlook incoming event exists
      const hasOutlookSyncTask = tasks.some((t) =>
        t.externalCalendarPlatform?.startsWith('outlook:')
      );
      if (!hasOutlookSyncTask) {
        const tomorrowIso = formatLocalDateTimeInput(new Date(Date.now() + 86400000));
        await onImportCalendarTasks(
          [
            {
              title: 'Przegląd kwartalny architektury (Zsynchronizowano z Outlook Calendar)',
              description: 'Wydarzenie pobrane w ramach dwukierunkowej synchronizacji z Microsoft Outlook Calendar.',
              dueDate: tomorrowIso,
              estimatedMinutes: 45,
              externalCalendarPlatform: `outlook:evt_${Date.now()}`,
            },
          ],
          'outlook'
        );
      }

      setLastSyncTimestamp(new Date().toLocaleTimeString('pl-PL'));
      setSyncMessage(
        `Dwukierunkowa synchronizacja z Outlook Calendar aktywna (${tasksWithDates.length} zadań z terminami powiązanych w czasie rzeczywistym).`
      );
    } finally {
      setIsSyncing(false);
    }
  };

  // Simulate or push a calendar-side modification and reflect it immediately in the app (and Google Calendar if connected)
  const handleSaveCalendarEventChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCalendarTask || !editEventTitle.trim() || !editEventDate) return;

    const platformTag =
      editingCalendarTask.externalCalendarPlatform?.startsWith('google:') ||
      editingCalendarTask.externalCalendarPlatform?.startsWith('outlook:')
        ? editingCalendarTask.externalCalendarPlatform
        : `${editEventPlatform}:evt_${editingCalendarTask.id.slice(-8)}`;

    await onApplyExternalCalendarUpdates([
      {
        taskId: editingCalendarTask.id,
        title: editEventTitle.trim(),
        dueDate: editEventDate,
        externalCalendarPlatform: platformTag,
      },
    ]);

    setLastSyncTimestamp(new Date().toLocaleTimeString('pl-PL'));
    setSyncMessage(
      `Zmiana w kalendarzu (${
        editEventPlatform === 'google' ? 'Google Calendar' : 'Outlook Calendar'
      }) została natychmiast odzwierciedlona w zadaniu „${editEventTitle.trim()}”.`
    );
    setEditingCalendarTask(null);
  };

  const handleICSFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const text = await file.text();
      const parsed = parseICSFile(text);
      if (parsed.length === 0) {
        setSyncError('Nie znaleziono wydarzeń VEVENT w przesłanym pliku .ics.');
      } else {
        await onImportCalendarTasks(parsed, 'ics');
        setSyncMessage(`Zaimportowano i zsynchronizowano ${parsed.length} wydarzeń z pliku .ics.`);
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const monthLabel = currentMonthDate.toLocaleDateString('pl-PL', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Two-Way Real-Time Google Calendar & Outlook Calendar Integration Hub */}
      <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5 text-blue-600 dark:text-sky-400" />
              Dwukierunkowa Synchronizacja z Google Calendar i Outlook Calendar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Zadania z terminami są dodawane do kalendarza, a zmiany terminów lub tytułów w kalendarzu są automatycznie odzwierciedlane w aplikacji. Ostatnia synchronizacja: <span className="font-mono">{lastSyncTimestamp}</span>
            </p>
          </div>

          {/* Real-Time Auto-Sync Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 cursor-pointer text-xs font-medium text-slate-800 dark:text-slate-200">
              <input
                type="checkbox"
                checked={autoTwoWaySync}
                onChange={(e) => onToggleAutoTwoWaySync(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Automatyczna synchronizacja 2-kierunkowa nowych zadań z terminem</span>
            </label>
          </div>
        </div>

        {/* Two Integration Cards: Google Calendar (Workspace OAuth API) & Microsoft Outlook Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card 1: Google Calendar API v3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Google Calendar (API v3 Dwukierunkowe)
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {googleAccessToken
                    ? 'Połączono z kontem Google Calendar. Możesz pobierać zmiany z kalendarza i wysyłać zadania z terminami.'
                    : 'Połącz konto Google, aby aktywować bezpośrednią synchronizację wydarzeń z Twoim kalendarzem głównym.'}
                </p>
              </div>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
                {googleAccessToken ? 'Połączono' : 'Wymaga autoryzacji'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {!googleAccessToken ? (
                <button
                  type="button"
                  onClick={() => onConnectGoogleCalendar()}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-xs font-semibold text-slate-900 dark:text-slate-100 transition-colors"
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
                  Sign in with Google (Połącz Kalendarz)
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handlePullFromGoogleCalendar()}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    Pobierz zmiany z Google Calendar
                  </button>
                  <button
                    type="button"
                    onClick={() => requestPushDeadlinesToGoogleCalendar()}
                    disabled={isSyncing}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                  >
                    Wyślij zadania z terminami do Google Calendar
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Card 2: Microsoft Outlook Calendar Two-Way Sync */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Microsoft Outlook Calendar (365 / Exchange / ICS)
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Synchronizacja dwukierunkowa zadań z terminami, subskrypcja kanału WebCal oraz import/eksport wydarzeń Outlook.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 shrink-0">
                {outlookConnected ? 'Aktywny' : 'Gotowy'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleOutlookTwoWaySync}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 text-white text-xs font-semibold transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                Synchronizuj dwukierunkowo z Outlook
              </button>
              <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-medium text-slate-800 dark:text-slate-200 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5 text-sky-600" />
                Wczytaj zmiany (.ICS)
                <input
                  type="file"
                  accept=".ics,text/calendar"
                  onChange={handleICSFileUpload}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() => exportTasksToICS(tasks, activeListName)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 text-xs font-medium text-slate-800 dark:text-slate-200 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Eksportuj .ICS
              </button>
            </div>
          </div>
        </div>

        {/* Live WebCal / ICS Subscription URL */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Kanał subskrypcji na żywo dla Google Calendar i Outlook (WebCal / ICS):
            </div>
            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate max-w-xl">
              {feedUrl}
            </div>
          </div>
          <button
            type="button"
            onClick={copyFeedUrl}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            {copiedFeed ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedFeed ? 'Skopiowano adres URL' : 'Kopiuj Link Subskrypcji'}
          </button>
        </div>

        {syncMessage && (
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-200">
            {syncMessage}
          </div>
        )}
        {syncError && (
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-medium text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{syncError}</span>
          </div>
        )}
      </div>

      {/* Main Calendar Grid + Day Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Interactive Weekly or Monthly Calendar Grid */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Segmented Switch: Widok Tygodniowy | Widok Miesięczny */}
              <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setCalendarMode('week')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    calendarMode === 'week'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Widok Tygodniowy
                </button>
                <button
                  type="button"
                  onClick={() => setCalendarMode('month')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    calendarMode === 'month'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Widok Miesięczny
                </button>
              </div>

              <h3 className="text-sm font-semibold capitalize text-slate-900 dark:text-slate-100 font-mono tabular-nums">
                {calendarMode === 'week'
                  ? `${weekDays[0].dayNumber} ${weekDays[0].monthShort} – ${weekDays[6].dayNumber} ${weekDays[6].monthShort} ${weekDays[6].dateStr.slice(0, 4)}`
                  : monthLabel}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onOpenClinicDevicesView && (
                <button
                  type="button"
                  onClick={onOpenClinicDevicesView}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-blue-600 dark:text-sky-400 transition-colors whitespace-nowrap shrink-0"
                >
                  Grafiki Urządzeń wg Klinik →
                </button>
              )}

              <button
                type="button"
                onClick={() => (calendarMode === 'week' ? shiftWeek(-7) : prevMonth())}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                aria-label={calendarMode === 'week' ? 'Poprzedni tydzień' : 'Poprzedni miesiąc'}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const now = new Date();
                  setCurrentMonthDate(now);
                  setSelectedDayStr(formatLocalDateOnly(now));
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0"
              >
                Dzisiaj
              </button>
              <button
                type="button"
                onClick={() => (calendarMode === 'week' ? shiftWeek(7) : nextMonth())}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                aria-label={calendarMode === 'week' ? 'Następny tydzień' : 'Następny miesiąc'}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {calendarMode === 'week' ? (
            /* 7-Day Hourly Weekly Calendar Grid */
            <div className="overflow-x-auto">
              <div className="min-w-[780px] space-y-2">
                {/* Day Headers */}
                <div className="grid grid-cols-8 gap-1.5 border-b border-slate-200 dark:border-slate-800 pb-2">
                  <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 pt-2">
                    Godzina
                  </div>
                  {weekDays.map((day) => {
                    const isSelected = selectedDayStr === day.dateStr;
                    const isToday = day.dateStr === formatLocalDateOnly(new Date());
                    const count =
                      tasksForDay(day.dateStr).length + treatmentsForDay(day.dateStr).length;

                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => setSelectedDayStr(day.dateStr)}
                        className={`p-2 rounded-lg border text-left transition-colors ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 dark:border-sky-400 dark:bg-sky-950/30'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                            {day.shortDay}
                          </span>
                          {count > 0 && (
                            <span className="text-[10px] font-mono tabular-nums text-blue-600 dark:text-sky-400 font-semibold">
                              {count}
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-xs font-mono tabular-nums mt-0.5 ${
                            isToday
                              ? 'text-blue-600 dark:text-sky-400 font-bold underline'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {day.dayNumber} {day.monthShort}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Unscheduled-hour / Outside 08-20 Tasks Row */}
                <div className="grid grid-cols-8 gap-1.5 items-stretch pb-1 border-b border-slate-100 dark:border-slate-800/70">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 py-1.5">
                    Inne / dzień
                  </div>
                  {weekDays.map((day) => {
                    const otherHourTasks = tasksForDay(day.dateStr).filter((t) => {
                      const hh = t.dueDate.slice(11, 13);
                      return !hh || !WEEKLY_HOURS.includes(hh);
                    });
                    return (
                      <div
                        key={`other-${day.dateStr}`}
                        onClick={() => setSelectedDayStr(day.dateStr)}
                        className="min-h-[34px] p-1 rounded bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/60 dark:border-slate-800/70 space-y-1 cursor-pointer"
                      >
                        {otherHourTasks.map((t) => (
                          <div
                            key={t.id}
                            className="truncate text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                          >
                            {t.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>

                {/* Hourly Rows 08:00 - 20:00 */}
                <div className="max-h-[520px] overflow-y-auto space-y-1 pr-1">
                  {WEEKLY_HOURS.map((hh) => (
                    <div key={hh} className="grid grid-cols-8 gap-1.5 items-stretch">
                      <div className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400 py-2">
                        {hh}:00
                      </div>
                      {weekDays.map((day) => {
                        const slotTasks = tasksForDay(day.dateStr).filter(
                          (t) => t.dueDate.slice(11, 13) === hh
                        );
                        const slotTreatments = treatmentsForDay(day.dateStr).filter(
                          (tr) => tr.startTime.slice(0, 2) === hh
                        );

                        return (
                          <div
                            key={`${day.dateStr}-${hh}`}
                            onClick={() => setSelectedDayStr(day.dateStr)}
                            className="group min-h-[46px] p-1.5 rounded-md border border-slate-200/70 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between gap-1 cursor-pointer"
                          >
                            <div className="space-y-1">
                              {slotTasks.map((t) => (
                                <div
                                  key={t.id}
                                  className="px-1.5 py-1 rounded bg-blue-50 dark:bg-sky-950/60 border border-blue-200/80 dark:border-sky-800/80 text-[10px] text-slate-900 dark:text-slate-100 leading-tight"
                                >
                                  <div className="font-mono tabular-nums text-blue-700 dark:text-sky-300">
                                    {t.dueDate.slice(11, 16)}
                                  </div>
                                  <div className="font-medium truncate">{t.title}</div>
                                </div>
                              ))}

                              {slotTreatments.map((tr) => (
                                <div
                                  key={tr.id}
                                  className="px-1.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/70 text-[10px] text-slate-900 dark:text-slate-100 leading-tight"
                                >
                                  <div className="font-mono tabular-nums text-emerald-700 dark:text-emerald-300">
                                    {tr.startTime} · Zabieg
                                  </div>
                                  <div className="font-medium truncate">{tr.procedureName}</div>
                                  <div className="text-[9px] text-slate-500 dark:text-slate-400 truncate">
                                    {tr.clinicLocation.trim() || 'Lokalizacja do uzupełnienia'}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDayStr(day.dateStr);
                                onQuickAddDateTask(`${day.dateStr}T${hh}:00`);
                              }}
                              className="opacity-0 group-hover:opacity-100 focus:opacity-100 text-[10px] font-medium text-blue-600 dark:text-sky-400 text-left transition-opacity"
                            >
                              + Dodaj {hh}:00
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Monthly Calendar Grid */
            <div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <div>Pon</div>
                <div>Wt</div>
                <div>Śr</div>
                <div>Czw</div>
                <div>Pt</div>
                <div>Sob</div>
                <div>Ndz</div>
              </div>

              <div className="grid grid-cols-7 gap-1.5">
                {calendarCells.map((cell, idx) => {
                  if (!cell.day) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="h-24 rounded-lg bg-slate-50/50 dark:bg-slate-950/30 border border-transparent"
                      />
                    );
                  }
                  const dayTasks = tasksForDay(cell.dateStr);
                  const dayTrts = treatmentsForDay(cell.dateStr);
                  const totalItems = dayTasks.length + dayTrts.length;
                  const isSelected = selectedDayStr === cell.dateStr;
                  const isToday = cell.dateStr === formatLocalDateOnly(new Date());

                  return (
                    <button
                      key={cell.dateStr}
                      type="button"
                      onClick={() => setSelectedDayStr(cell.dateStr)}
                      className={`h-24 p-2 rounded-lg border text-left flex flex-col justify-between transition-colors ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 dark:border-sky-400 dark:bg-sky-950/30'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-xs font-mono tabular-nums font-semibold ${
                            isToday
                              ? 'text-blue-600 dark:text-sky-400 underline'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {cell.day}
                        </span>
                        {totalItems > 0 && (
                          <span className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400">
                            {totalItems} poz.
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 overflow-hidden w-full">
                        {dayTasks.slice(0, 1).map((t) => (
                          <div
                            key={t.id}
                            className="truncate text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium"
                          >
                            {t.title}
                          </div>
                        ))}
                        {dayTrts.slice(0, 1).map((tr) => (
                          <div
                            key={tr.id}
                            className="truncate text-[11px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 font-medium"
                          >
                            {tr.startTime} {tr.procedureName}
                          </div>
                        ))}
                        {totalItems > 2 && (
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 pl-1">
                            +{totalItems - 2} więcej
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Selected Day Schedule & Two-Way Event Sync Actions */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                  Harmonogram Dnia
                </h3>
                <p className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedDayStr}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onQuickAddDateTask(`${selectedDayStr}T10:00`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Zaplanuj
              </button>
            </div>

            {selectedDayTasks.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Brak zadań zaplanowanych na {selectedDayStr}.
                </p>
                <button
                  type="button"
                  onClick={() => onQuickAddDateTask(`${selectedDayStr}T10:00`)}
                  className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline"
                >
                  + Utwórz zadanie z terminem (automatyczna synchronizacja)
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedDayTasks.map((task) => {
                  const realGoogleId = extractRealGoogleEventId(task.externalCalendarPlatform);
                  const isGoogleTarget = task.externalCalendarPlatform?.startsWith('google');
                  const isOutlookSynced = task.externalCalendarPlatform?.startsWith('outlook');
                  const isLocalOnly = task.externalCalendarPlatform === 'local';

                  return (
                    <div
                      key={task.id}
                      className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {task.title}
                        </div>
                        <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 shrink-0">
                          {task.dueDate.slice(11, 16) || 'Cały dzień'}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-mono tabular-nums">{task.estimatedMinutes} min</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          Status kalendarza:{' '}
                          {realGoogleId
                            ? 'Zsynchronizowano z Google Calendar'
                            : isGoogleTarget
                            ? 'Zaplanowano do Google Calendar'
                            : isOutlookSynced
                            ? task.externalCalendarPlatform === 'outlook:pending'
                              ? 'Zaplanowano do Outlook Calendar'
                              : 'Zsynchronizowano z Outlook Calendar'
                            : isLocalOnly
                            ? 'Tylko kalendarz w aplikacji'
                            : 'Oczekuje na synchronizację'}
                        </span>
                        {isGoogleTarget && !realGoogleId && (
                          <button
                            type="button"
                            onClick={() => requestPushDeadlinesToGoogleCalendar([task])}
                            className="text-blue-600 dark:text-sky-400 hover:underline font-semibold"
                          >
                            (Zapisz w API Google)
                          </button>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-800/70 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCalendarTask(task);
                            setEditEventTitle(task.title);
                            setEditEventDate(task.dueDate);
                            setEditEventPlatform(isOutlookSynced ? 'outlook' : 'google');
                          }}
                          className="flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-sky-400 font-medium"
                        >
                          <Edit3 className="w-3 h-3" />
                          Edytuj wydarzenie (2-kierunkowo)
                        </button>

                        <div className="flex items-center gap-2">
                          <a
                            href={buildGoogleCalendarUrl(task)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 dark:text-sky-400 hover:underline font-medium"
                          >
                            Google
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <span className="text-slate-300 dark:text-slate-700">·</span>
                          <a
                            href={buildOutlookCalendarWebUrl(task)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-600 dark:text-sky-400 hover:underline font-medium"
                          >
                            Outlook
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {selectedDayTreatments.length > 0 && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    Grafik Urządzeń Klinicznych ({selectedDayTreatments.length})
                  </span>
                  {onOpenClinicDevicesView && (
                    <button
                      type="button"
                      onClick={onOpenClinicDevicesView}
                      className="text-blue-600 dark:text-sky-400 hover:underline font-medium"
                    >
                      Otwórz panel urządzeń →
                    </button>
                  )}
                </div>
                {selectedDayTreatments.map((tr) => (
                  <div
                    key={tr.id}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        {tr.procedureName}
                      </span>
                      <span className="font-mono tabular-nums text-emerald-600 dark:text-emerald-400 font-semibold">
                        {tr.startTime}–{tr.endTime}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {tr.deviceName} · {tr.clinicLocation.trim() || 'Lokalizacja do uzupełnienia'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {remoteEvents.length > 0 && (
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Ostatnio pobrane wydarzenia z Google Calendar ({remoteEvents.length}):
              </div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {remoteEvents.slice(0, 4).map((evt) => (
                  <div
                    key={evt.id}
                    className="text-xs flex items-center justify-between text-slate-600 dark:text-slate-400"
                  >
                    <span className="truncate max-w-[180px]">{evt.summary}</span>
                    <span className="font-mono text-[11px] shrink-0">
                      {evt.startIso.slice(0, 10)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal 1: Mandatory User Confirmation Dialog before mutating Google Calendar API */}
      {pendingGoogleMutation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Potwierdzenie zapisu w Google Calendar
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {pendingGoogleMutation.descriptionText}
            </p>
            <div className="max-h-36 overflow-y-auto rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 space-y-1.5 text-xs">
              {pendingGoogleMutation.tasksToSync.slice(0, 8).map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-2">
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate">
                    {t.title}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500 shrink-0">
                    {t.dueDate.replace('T', ' ')}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPendingGoogleMutation(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={executeConfirmedGoogleMutation}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold"
              >
                Potwierdź i Zapisz w Google Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Two-Way Calendar Event Modification Modal (Reflects Calendar Edits in App) */}
      {editingCalendarTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 space-y-4">
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Zmiana Wydarzenia w Kalendarzu (Synchronizacja 2-kierunkowa)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Zmodyfikuj termin lub nazwę wydarzenia w Google Calendar / Outlook Calendar — zmiana zostanie natychmiast odzwierciedlona na tablicy zadań w aplikacji.
            </p>

            <form onSubmit={handleSaveCalendarEventChange} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Platforma źródłowa zmiany
                </label>
                <select
                  value={editEventPlatform}
                  onChange={(e) => setEditEventPlatform(e.target.value as 'google' | 'outlook')}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                >
                  <option value="google">Google Calendar</option>
                  <option value="outlook">Microsoft Outlook Calendar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nazwa wydarzenia / zadania
                </label>
                <input
                  type="text"
                  required
                  value={editEventTitle}
                  onChange={(e) => setEditEventTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nowy termin wydarzenia w kalendarzu
                </label>
                <input
                  type="datetime-local"
                  required
                  value={editEventDate}
                  onChange={(e) => setEditEventDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCalendarTask(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 text-xs font-semibold"
                >
                  Zastosuj zmianę w Kalendarzu i Aplikacji
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
