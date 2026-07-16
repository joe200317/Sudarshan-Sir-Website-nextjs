import sharp from "sharp";

const MAX_WIDTH = 1600;
const MAX_HEIGHT = 2000;
const WEBP_QUALITY = 82;

/**
 * Compress + convert workshop hero images to WebP for fast landing pages.
 * GIFs are kept as-is (animation).
 */
export async function optimizeWorkshopImage(
  buffer: Buffer,
  mimetype: string,
): Promise<{ buffer: Buffer; mimetype: string }> {
  if (mimetype === "image/gif") {
    return { buffer, mimetype };
  }

  const optimized = await sharp(buffer, { failOn: "none" })
    .rotate()
    .resize({
      width: MAX_WIDTH,
      height: MAX_HEIGHT,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toBuffer();

  return { buffer: optimized, mimetype: "image/webp" };
}
