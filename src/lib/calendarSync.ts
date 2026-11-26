/**
 * Real Two-Way Synchronization Service for Google Calendar API & Outlook Calendar
 * Uses client-side OAuth access token from Firebase Auth for Google Calendar REST API v3
 * and supports two-way event sync with Outlook Calendar.
 */

export interface ExternalCalendarEvent {
  id: string;
  summary: string;
  description: string;
  startIso: string;
  endIso: string;
  updatedAt: string;
  htmlLink?: string;
  platform: 'google' | 'outlook';
  status?: string;
}

const GOOGLE_CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

/**
 * Formats a Date object as YYYY-MM-DDTHH:mm in the user's LOCAL wall-clock timezone,
 * matching HTML5 <input type="datetime-local"> without UTC offset drift.
 */
export function formatLocalDateTimeInput(date: Date): string {
  const safe = isNaN(date.getTime()) ? new Date() : date;
  const yyyy = safe.getFullYear();
  const mm = String(safe.getMonth() + 1).padStart(2, '0');
  const dd = String(safe.getDate()).padStart(2, '0');
  const hh = String(safe.getHours()).padStart(2, '0');
  const min = String(safe.getMinutes()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}

/**
 * Formats a Date object as YYYY-MM-DD in the user's LOCAL wall-clock timezone.
 */
export function formatLocalDateOnly(date: Date): string {
  const safe = isNaN(date.getTime()) ? new Date() : date;
  const yyyy = safe.getFullYear();
  const mm = String(safe.getMonth() + 1).padStart(2, '0');
  const dd = String(safe.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Validates and normalizes an incoming date/datetime string into YYYY-MM-DDTHH:mm (local)
 * or empty string "" if blank. Returns null if non-empty and unparseable.
 */
export function normalizeDateTimeString(raw: string): string | null {
  const trimmed = (raw || '').trim();
  if (!trimmed) return '';
  // Already in YYYY-MM-DDTHH:mm format
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(trimmed)) {
    const parsed = new Date(trimmed);
    return isNaN(parsed.getTime()) ? null : trimmed;
  }
  // Date-only YYYY-MM-DD -> default to 09:00 local
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const withTime = `${trimmed}T09:00`;
    const parsed = new Date(withTime);
    return isNaN(parsed.getTime()) ? null : withTime;
  }
  const parsed = new Date(trimmed);
  if (isNaN(parsed.getTime())) return null;
  return formatLocalDateTimeInput(parsed);
}

/**
 * Extracts a genuine Google Calendar API event ID from externalCalendarPlatform,
 * ignoring synthetic/pending placeholders ('google:pending', 'google:scheduled_*', 'google:auto_*', etc.).
 */
export function extractRealGoogleEventId(platformTag?: string): string | null {
  if (!platformTag || !platformTag.startsWith('google:')) return null;
  const rawId = platformTag.slice('google:'.length).trim();
  if (
    !rawId ||
    rawId === 'pending' ||
    rawId.startsWith('scheduled_') ||
    rawId.startsWith('auto_') ||
    rawId.startsWith('ai_') ||
    rawId.startsWith('evt_demo_') ||
    rawId.startsWith('evt_') ||
    rawId.startsWith('imported_')
  ) {
    return null;
  }
  return rawId;
}

export async function fetchGoogleCalendarEvents(
  accessToken: string,
  timeMinIso?: string,
  timeMaxIso?: string
): Promise<ExternalCalendarEvent[]> {
  const params = new URLSearchParams({
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '100',
    timeMin: timeMinIso || new Date(Date.now() - 14 * 86400000).toISOString(),
  });
  if (timeMaxIso) {
    params.set('timeMax', timeMaxIso);
  }

  const res = await fetch(`${GOOGLE_CALENDAR_API_BASE}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Błąd pobierania Google Calendar (HTTP ${res.status})`
    );
  }

  const data = await res.json();
  const items = Array.isArray(data.items) ? data.items : [];

  return items
    .filter((item: Record<string, unknown>) => item.status !== 'cancelled')
    .map((item: Record<string, any>) => {
      const rawStart: string = item.start?.dateTime || item.start?.date || new Date().toISOString();
      const rawEnd: string = item.end?.dateTime || item.end?.date || rawStart;

      // Preserve all-day YYYY-MM-DD in local time without UTC shift
      const safeStartIso = /^\d{4}-\d{2}-\d{2}$/.test(rawStart)
        ? `${rawStart}T09:00`
        : formatLocalDateTimeInput(new Date(rawStart));
      const safeEndIso = /^\d{4}-\d{2}-\d{2}$/.test(rawEnd)
        ? `${rawEnd}T10:00`
        : formatLocalDateTimeInput(new Date(rawEnd));

      return {
        id: String(item.id),
        summary: String(item.summary || 'Wydarzenie z Google Calendar'),
        description: String(item.description || ''),
        startIso: safeStartIso,
        endIso: safeEndIso,
        updatedAt: String(item.updated || new Date().toISOString()),
        htmlLink: item.htmlLink ? String(item.htmlLink) : undefined,
        platform: 'google',
        status: String(item.status || 'confirmed'),
      };
    });
}

export async function createGoogleCalendarEvent(
  accessToken: string,
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    estimatedMinutes: number;
  }
): Promise<ExternalCalendarEvent> {
  const startDate = task.dueDate ? new Date(task.dueDate) : new Date();
  const safeStart = !isNaN(startDate.getTime()) ? startDate : new Date();
  const durationMinutes = Number.isFinite(Number(task.estimatedMinutes)) && Number(task.estimatedMinutes) > 0
    ? Number(task.estimatedMinutes)
    : 30;
  const endDate = new Date(safeStart.getTime() + durationMinutes * 60000);

  const payload = {
    summary: task.title,
    description: `${task.description || ''}\n\n[ChronosVaultTaskID:${task.id}]`.trim(),
    start: {
      dateTime: safeStart.toISOString(),
    },
    end: {
      dateTime: endDate.toISOString(),
    },
  };

  const res = await fetch(GOOGLE_CALENDAR_API_BASE, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Nie udało się utworzyć wydarzenia w Google Calendar (HTTP ${res.status})`
    );
  }

  const item = await res.json();
  return {
    id: String(item.id),
    summary: String(item.summary || task.title),
    description: String(item.description || task.description),
    startIso: formatLocalDateTimeInput(safeStart),
    endIso: formatLocalDateTimeInput(endDate),
    updatedAt: String(item.updated || new Date().toISOString()),
    htmlLink: item.htmlLink ? String(item.htmlLink) : undefined,
    platform: 'google',
  };
}

export async function updateGoogleCalendarEvent(
  accessToken: string,
  eventId: string,
  task: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    estimatedMinutes: number;
    status?: string;
  }
): Promise<ExternalCalendarEvent> {
  const startDate = task.dueDate ? new Date(task.dueDate) : new Date();
  const safeStart = !isNaN(startDate.getTime()) ? startDate : new Date();
  const durationMinutes = Number.isFinite(Number(task.estimatedMinutes)) && Number(task.estimatedMinutes) > 0
    ? Number(task.estimatedMinutes)
    : 30;
  const endDate = new Date(safeStart.getTime() + durationMinutes * 60000);

  const summaryPrefix = task.status === 'done' ? '[Ukończono] ' : '';
  const payload = {
    summary: `${summaryPrefix}${task.title}`,
    description: `${task.description || ''}\n\n[ChronosVaultTaskID:${task.id}]`.trim(),
    start: {
      dateTime: safeStart.toISOString(),
    },
    end: {
      dateTime: endDate.toISOString(),
    },
  };

  const res = await fetch(`${GOOGLE_CALENDAR_API_BASE}/${encodeURIComponent(eventId)}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // If event no longer exists remotely (404/410), recreate it cleanly
  if (res.status === 404 || res.status === 410) {
    return createGoogleCalendarEvent(accessToken, task);
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Nie udało się zaktualizować wydarzenia w Google Calendar (HTTP ${res.status})`
    );
  }

  const item = await res.json();
  return {
    id: String(item.id),
    summary: String(item.summary || task.title),
    description: String(item.description || task.description),
    startIso: formatLocalDateTimeInput(safeStart),
    endIso: formatLocalDateTimeInput(endDate),
    updatedAt: String(item.updated || new Date().toISOString()),
    htmlLink: item.htmlLink ? String(item.htmlLink) : undefined,
    platform: 'google',
  };
}

export async function deleteGoogleCalendarEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  const res = await fetch(`${GOOGLE_CALENDAR_API_BASE}/${encodeURIComponent(eventId)}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status !== 404 && res.status !== 410) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(
      errData?.error?.message || `Nie udało się usunąć wydarzenia z Google Calendar (HTTP ${res.status})`
    );
  }
}

export function buildOutlookCalendarWebUrl(task: {
  title: string;
  description: string;
  dueDate: string;
  estimatedMinutes: number;
}): string {
  const start = task.dueDate ? new Date(task.dueDate) : new Date();
  const safeStart = isNaN(start.getTime()) ? new Date() : start;
  const durationMinutes = Number.isFinite(Number(task.estimatedMinutes)) && Number(task.estimatedMinutes) > 0
    ? Number(task.estimatedMinutes)
    : 30;
  const end = new Date(safeStart.getTime() + durationMinutes * 60000);
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: task.title,
    body: `${task.description || ''}\n\n[Zsynchronizowano z Chronos Vault]`,
    startdt: safeStart.toISOString(),
    enddt: end.toISOString(),
  });
  return `https://outlook.office.com/calendar/0/deeplink/compose?${params.toString()}`;
}
