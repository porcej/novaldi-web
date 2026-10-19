import { CALENDAR_URL_KEY, getSetting, normalizeCalendarUrl, setSetting } from '../../../server/settings';
import type { PagesContext } from '../../../server/types';

export async function onRequestGet({ env }: PagesContext): Promise<Response> {
  if (!env.DB) {
    return Response.json({ error: 'The DB binding is not configured.' }, { status: 503 });
  }

  try {
    return Response.json({ url: await getSetting(env.DB, CALENDAR_URL_KEY) });
  } catch (error) {
    console.error('Failed to load calendar URL', error);
    return Response.json({ error: 'Could not load the calendar setting.' }, { status: 500 });
  }
}

export async function onRequestPut({ request, env }: PagesContext): Promise<Response> {
  if (!env.DB) {
    return Response.json({ error: 'The DB binding is not configured.' }, { status: 503 });
  }
  // Requiring JSON forces a CORS preflight, so other sites can't submit this with the admin's saved credentials.
  if (!request.headers.get('Content-Type')?.includes('application/json')) {
    return Response.json({ error: 'Expected a JSON request.' }, { status: 415 });
  }

  const body = (await request.json().catch(() => null)) as { url?: unknown } | null;
  const parsed = normalizeCalendarUrl(body?.url);
  if (!parsed.ok) return Response.json({ error: parsed.error }, { status: 400 });

  try {
    await setSetting(env.DB, CALENDAR_URL_KEY, parsed.value);
    return Response.json({ url: parsed.value });
  } catch (error) {
    console.error('Failed to save calendar URL', error);
    return Response.json({ error: 'Could not save the calendar setting.' }, { status: 500 });
  }
}
