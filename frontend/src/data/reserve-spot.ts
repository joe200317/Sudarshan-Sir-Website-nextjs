export const PROFESSIONS = [
  "Teacher / Educator",
  "Business Owner / Entrepreneur",
  "Coach and Consultant",
  "Other",
] as const;

export const INCOME_SLABS = [
  "₹1L – ₹3L",
  "₹3L – ₹4L",
  "₹4L – ₹5L",
  "₹5L – ₹10L",
  "₹10L – ₹15L",
  "₹15L & Above",
] as const;

export type WorkshopBookingInfo = {
  slug: string;
  programSlug: string;
  programTitle: string;
  fees: number | null;
  includePayment: boolean;
  /** Raw Pixel ID or full Meta Pixel snippet (per landing page) */
  metaPixelCode?: string;
};
