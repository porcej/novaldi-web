import type { D1Database } from './types';

export const CALENDAR_URL_KEY = 'calendar_url';
const MAX_INPUT_LENGTH = 4000;

export type CalendarUrlResult = { ok: true; value: string | null } | { ok: false; error: string };

export async function ensureSettingsSchema(db: D1Database): Promise<void> {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS site_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      )`,
    )
    .run();
}

export async function getSetting(db: D1Database, key: string): Promise<string | null> {
  await ensureSettingsSchema(db);
  const { results } = await db
    .prepare('SELECT value FROM site_settings WHERE key = ?')
    .bind(key)
    .all<{ value: string }>();
  return results[0]?.value ?? null;
}

export async function setSetting(db: D1Database, key: string, value: string | null): Promise<void> {
  await ensureSettingsSchema(db);
  if (value === null) {
    await db.prepare('DELETE FROM site_settings WHERE key = ?').bind(key).run();
    return;
  }
  await db
    .prepare(
      `INSERT INTO site_settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value,
         updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`,
    )
    .bind(key, value)
    .run();
}

function embedUrlForCalendarId(calendarId: string): string {
  const url = new URL('https://calendar.google.com/calendar/embed');
  url.searchParams.set('src', calendarId);
  url.searchParams.set('ctz', 'America/New_York');
  return url.toString();
}

/**
 * Accepts a Google Calendar embed URL, the full <iframe> embed code, a public
 * calendar link (?cid=...), or a bare calendar ID, and returns an embed URL.
 * An empty input clears the setting.
 */
export function normalizeCalendarUrl(input: unknown): CalendarUrlResult {
  let raw = String(input ?? '').trim();
  if (!raw) return { ok: true, value: null };
  if (raw.length > MAX_INPUT_LENGTH) return { ok: false, error: 'That calendar link is too long.' };

  if (/<iframe/i.test(raw)) {
    const src = raw.match(/\ssrc\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!src) return { ok: false, error: 'Could not find a src link in the embed code.' };
    raw = src.replaceAll('&amp;', '&');
  }

  if (!/^https?:\/\//i.test(raw)) {
    if (/^[^\s/@]+@[^\s/@]+$/.test(raw)) return { ok: true, value: embedUrlForCalendarId(raw) };
    return { ok: false, error: 'Enter a Google Calendar embed link, embed code, or calendar ID.' };
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { ok: false, error: 'That is not a valid link.' };
  }

  if (url.hostname !== 'calendar.google.com' || !url.pathname.startsWith('/calendar')) {
    return { ok: false, error: 'The link must be a Google Calendar link (calendar.google.com).' };
  }
  url.protocol = 'https:';

  if (url.pathname.includes('/embed')) return { ok: true, value: url.toString() };

  const cid = url.searchParams.get('cid');
  if (cid) {
    let calendarId = cid;
    try {
      const decoded = atob(cid.replace(/-/g, '+').replace(/_/g, '/'));
      if (decoded.includes('@')) calendarId = decoded;
    } catch {
      // cid is sometimes the plain calendar ID rather than base64.
    }
    return { ok: true, value: embedUrlForCalendarId(calendarId) };
  }

  return {
    ok: false,
    error:
      'Use the embed link from Google Calendar → Settings → Integrate calendar → "Embed code" or "Public URL".',
  };
}
