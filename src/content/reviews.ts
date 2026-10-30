/**
 * Real client reviews, supplied by the client in writing. Intentionally EMPTY:
 * no quote, name or rating may be invented.
 *
 * To show the moving review cards on the Clientele page:
 *   1. Add each review below (only with the client's written permission).
 *   2. Set `showTestimonialQuotes` to true in `src/config/site.ts`.
 */
export type ClientReview = {
  /** Exactly what the client wrote. */
  quote: string;
  /** Name as the client wants it shown. */
  name: string;
  /** Project or place, e.g. "Residence, Velachery". */
  project?: string;
};

export const clientReviews: ClientReview[] = [];
