/** Static workshop program types — mirrored on frontend */

export const WORKSHOP_PROGRAMS = [
  {
    slug: "train-the-trainer-1-day",
    title: "Train The Trainer - 1 Day",
  },
  {
    slug: "life-counselling-4-day",
    title: "Life Counselling - 4 Day",
  },
] as const;

export type WorkshopProgramSlug = (typeof WORKSHOP_PROGRAMS)[number]["slug"];

export function isWorkshopProgramSlug(
  value: string,
): value is WorkshopProgramSlug {
  return WORKSHOP_PROGRAMS.some((p) => p.slug === value);
}

export function getWorkshopProgramTitle(slug: string) {
  return WORKSHOP_PROGRAMS.find((p) => p.slug === slug)?.title ?? slug;
}
