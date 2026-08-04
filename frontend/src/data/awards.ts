import awardsData from "./awards.json";

export type Award = {
  image: string;
  alt: string;
  year: string;
  name: string;
};

function nameFromImagePath(image: string): string {
  const file = image.split("/").pop() ?? image;
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/\s*\(\d+\)\s*$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\bjgp\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const AWARDS: Award[] = (awardsData as Omit<Award, "name">[]).map(
  (award) => ({
    ...award,
    name: nameFromImagePath(award.image),
  }),
);

export const AWARDS_BY_YEAR = Object.entries(
  AWARDS.reduce<Record<string, Award[]>>((acc, award) => {
    (acc[award.year] ??= []).push(award);
    return acc;
  }, {}),
)
  .map(([year, awards]) => ({ year, awards }))
  .sort((a, b) => Number(b.year) - Number(a.year));

export type AwardYearSegment = (typeof AWARDS_BY_YEAR)[number];

/** Pair consecutive years that have ≤3 awards so they sit side-by-side */
export function groupAwardYearRows(
  segments: AwardYearSegment[],
  sparseLimit = 3,
) {
  const rows: AwardYearSegment[][] = [];
  let i = 0;

  while (i < segments.length) {
    const curr = segments[i];
    const next = segments[i + 1];
    const currSparse = curr.awards.length <= sparseLimit;
    const nextSparse = Boolean(next && next.awards.length <= sparseLimit);

    if (currSparse && nextSparse) {
      rows.push([curr, next]);
      i += 2;
    } else {
      rows.push([curr]);
      i += 1;
    }
  }

  return rows;
}
