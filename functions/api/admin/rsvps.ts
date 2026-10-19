import { listRsvps } from '../../../server/rsvp';
import type { PagesContext } from '../../../server/types';

export async function onRequestGet({ env }: PagesContext): Promise<Response> {
  if (!env.DB) {
    return Response.json({ error: 'The DB binding is not configured.' }, { status: 503 });
  }

  try {
    return Response.json(await listRsvps(env.DB));
  } catch (error) {
    console.error('Failed to list RSVPs', error);
    return Response.json({ error: 'Could not load RSVPs.' }, { status: 500 });
  }
}
