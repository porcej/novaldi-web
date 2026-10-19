import { rsvpLimits, type RsvpRecord, type RsvpSummary } from '../src/content/rsvp';
import type { D1Database } from './types';

interface RsvpRow {
  id: number;
  name: string;
  guests: number;
  needs_accommodations: number;
  accommodation_details: string | null;
  created_at: string;
}

export interface RsvpInput {
  name: string;
  guests: number;
  needsAccommodations: boolean;
  accommodationDetails: string | null;
}

export type ParseResult = { ok: true; value: RsvpInput } | { ok: false; error: string };

export async function ensureSchema(db: D1Database): Promise<void> {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS graduation_rsvps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        guests INTEGER NOT NULL,
        needs_accommodations INTEGER NOT NULL,
        accommodation_details TEXT,
        created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      )`,
    )
    .run();
}

export function parseRsvp(form: FormData): ParseResult {
  const name = String(form.get('name') ?? '').trim();
  if (!name) return { ok: false, error: 'Please enter your name.' };
  if (name.length > rsvpLimits.nameMaxLength) {
    return { ok: false, error: `Name must be ${rsvpLimits.nameMaxLength} characters or fewer.` };
  }

  const guestsRaw = String(form.get('guests') ?? '').trim();
  const guests = Number(guestsRaw);
  if (!/^\d+$/.test(guestsRaw) || guests > rsvpLimits.maxGuests) {
    return { ok: false, error: `Number of guests must be a whole number from 0 to ${rsvpLimits.maxGuests}.` };
  }

  const accommodations = String(form.get('accommodations') ?? '');
  if (accommodations !== 'yes' && accommodations !== 'no') {
    return { ok: false, error: 'Please tell us whether you need accommodations.' };
  }
  const needsAccommodations = accommodations === 'yes';

  const details = String(form.get('accommodationDetails') ?? '').trim();
  if (details.length > rsvpLimits.detailsMaxLength) {
    return {
      ok: false,
      error: `Accommodation details must be ${rsvpLimits.detailsMaxLength} characters or fewer.`,
    };
  }

  return {
    ok: true,
    value: {
      name,
      guests,
      needsAccommodations,
      accommodationDetails: needsAccommodations && details ? details : null,
    },
  };
}

export async function insertRsvp(db: D1Database, input: RsvpInput): Promise<void> {
  await ensureSchema(db);
  await db
    .prepare(
      `INSERT INTO graduation_rsvps (name, guests, needs_accommodations, accommodation_details)
       VALUES (?, ?, ?, ?)`,
    )
    .bind(input.name, input.guests, input.needsAccommodations ? 1 : 0, input.accommodationDetails)
    .run();
}

export async function listRsvps(
  db: D1Database,
): Promise<{ rsvps: RsvpRecord[]; summary: RsvpSummary }> {
  await ensureSchema(db);
  const { results } = await db
    .prepare(
      `SELECT id, name, guests, needs_accommodations, accommodation_details, created_at
       FROM graduation_rsvps
       ORDER BY created_at DESC, id DESC`,
    )
    .all<RsvpRow>();

  const rsvps = results.map((row) => ({
    id: row.id,
    name: row.name,
    guests: row.guests,
    needsAccommodations: row.needs_accommodations === 1,
    accommodationDetails: row.accommodation_details,
    createdAt: row.created_at,
  }));

  return {
    rsvps,
    summary: {
      responses: rsvps.length,
      totalGuests: rsvps.reduce((sum, rsvp) => sum + rsvp.guests, 0),
      needingAccommodations: rsvps.filter((rsvp) => rsvp.needsAccommodations).length,
    },
  };
}
