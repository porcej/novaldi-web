export const rsvpLimits = {
  nameMaxLength: 120,
  maxGuests: 20,
  detailsMaxLength: 1000,
} as const;

export interface RsvpRecord {
  id: number;
  name: string;
  guests: number;
  needsAccommodations: boolean;
  accommodationDetails: string | null;
  createdAt: string;
}

export interface RsvpSummary {
  responses: number;
  totalGuests: number;
  needingAccommodations: number;
}
