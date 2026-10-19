import { insertRsvp, parseRsvp } from '../../server/rsvp';
import type { PagesContext } from '../../server/types';

const FORM_PATH = '/graduation-rsvp/';

function respond(request: Request, status: number, body: { ok: boolean; error?: string }): Response {
  if (request.headers.get('Accept')?.includes('application/json')) {
    return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
  }
  const location = new URL(FORM_PATH, request.url);
  if (body.ok) location.searchParams.set('submitted', '1');
  else location.searchParams.set('error', body.error ?? 'Something went wrong.');
  return Response.redirect(location.toString(), 303);
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(request, 400, { ok: false, error: 'Invalid form submission.' });
  }

  // Honeypot field: real visitors never see or fill it.
  if (String(form.get('company') ?? '').trim()) return respond(request, 200, { ok: true });

  const parsed = parseRsvp(form);
  if (!parsed.ok) return respond(request, 400, { ok: false, error: parsed.error });

  if (!env.DB) {
    return respond(request, 503, {
      ok: false,
      error: 'RSVPs are temporarily unavailable. Please email info@novaldi.us.',
    });
  }

  try {
    await insertRsvp(env.DB, parsed.value);
  } catch (error) {
    console.error('Failed to save RSVP', error);
    return respond(request, 500, {
      ok: false,
      error: 'We could not save your RSVP. Please try again or email info@novaldi.us.',
    });
  }

  return respond(request, 200, { ok: true });
}
