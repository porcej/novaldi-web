import { CALENDAR_URL_KEY, getSetting } from '../../server/settings';
import type { PagesContext } from '../../server/types';

export async function onRequestGet({ env }: PagesContext): Promise<Response> {
  if (!env.DB) {
    return Response.json({ error: 'The DB binding is not configured.' }, { status: 503 });
  }

  try {
    const url = await getSetting(env.DB, CALENDAR_URL_KEY);
    return Response.json({ url }, { headers: { 'Cache-Control': 'public, max-age=60' } });
  } catch (error) {
    console.error('Failed to load calendar URL', error);
    return Response.json({ error: 'Could not load the calendar.' }, { status: 500 });
  }
}
