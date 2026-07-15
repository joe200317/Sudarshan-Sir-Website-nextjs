export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Unique slug helper — appends -2, -3… if base is taken */
export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
) {
  let slug = slugify(base) || `item-${Date.now()}`;
  if (!(await exists(slug))) return slug;
  let n = 2;
  while (await exists(`${slug}-${n}`)) n += 1;
  return `${slug}-${n}`;
}

export function parseOptionalFloat(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  return n;
}

export function toDate(value: unknown): Date | null {
  if (!value || typeof value !== "string") return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}
