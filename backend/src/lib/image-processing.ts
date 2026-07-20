import sharp from "sharp";

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 2000;
const TARGET_BYTES = 100 * 1024; // ~100KB, for fast-loading landing pages
const MIN_QUALITY = 35;
const MIN_WIDTH = 480;

/**
 * Compress + convert workshop hero images to WebP for fast landing pages.
 * Iteratively steps quality down (and, if that's not enough, dimensions too)
 * until the output is at or under TARGET_BYTES, without going below floors
 * that would make the image look bad. GIFs are kept as-is (animation).
 */
export async function optimizeWorkshopImage(
  buffer: Buffer,
  mimetype: string,
): Promise<{ buffer: Buffer; mimetype: string }> {
  if (mimetype === "image/gif") {
    return { buffer, mimetype };
  }

  const base = sharp(buffer, { failOn: "none" }).rotate();

  let width = MAX_WIDTH;
  let quality = 82;
  let best: Buffer | null = null;

  // Two nested passes: for each width tier, step quality down; if even the
  // lowest quality at this width is still too big, shrink the width and
  // try again. Keeps the smallest-so-far result in case we never hit target.
  while (width >= MIN_WIDTH) {
    quality = 82;
    while (quality >= MIN_QUALITY) {
      const attempt = await base
        .clone()
        .resize({
          width,
          height: MAX_HEIGHT,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality, effort: 4 })
        .toBuffer();

      if (!best || attempt.length < best.length) best = attempt;
      if (attempt.length <= TARGET_BYTES) {
        return { buffer: attempt, mimetype: "image/webp" };
      }
      quality -= 15;
    }
    width = Math.round(width * 0.75);
  }

  // Never hit the target — return the smallest attempt we produced.
  return { buffer: best as Buffer, mimetype: "image/webp" };
}
