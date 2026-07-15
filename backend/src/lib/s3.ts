import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_BYTES = 5 * 1024 * 1024;

export type UploadResult = {
  url: string;
  key: string;
  storage: "s3" | "local";
};

function getS3Config() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY?.trim();
  const region = process.env.AWS_REGION?.trim() || "ap-south-1";
  const bucket = process.env.AWS_S3_BUCKET?.trim();
  const publicUrl = process.env.AWS_S3_PUBLIC_URL?.trim();

  if (!accessKeyId || !secretAccessKey || !bucket) return null;

  return {
    client: new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    }),
    bucket,
    region,
    publicUrl,
  };
}

function extFromMime(mime: string) {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  if (mime === "image/gif") return "gif";
  return "jpg";
}

function buildKey(filename: string, mime: string, folder: string) {
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 40);
  const ext = path.extname(safe) || `.${extFromMime(mime)}`;
  const base = path.basename(safe, ext) || "image";
  const stamp = new Date().toISOString().slice(0, 10);
  return `${folder}/${stamp}/${randomUUID()}-${base}${ext}`;
}

async function uploadToS3(
  buffer: Buffer,
  key: string,
  mime: string,
): Promise<UploadResult> {
  const cfg = getS3Config();
  if (!cfg) throw new Error("S3 is not configured");

  await cfg.client.send(
    new PutObjectCommand({
      Bucket: cfg.bucket,
      Key: key,
      Body: buffer,
      ContentType: mime,
    }),
  );

  const url = cfg.publicUrl
    ? `${cfg.publicUrl.replace(/\/$/, "")}/${key}`
    : `https://${cfg.bucket}.s3.${cfg.region}.amazonaws.com/${key}`;

  return { url, key, storage: "s3" };
}

async function uploadLocal(
  buffer: Buffer,
  key: string,
): Promise<UploadResult> {
  const dest = path.join(process.cwd(), "uploads", key);
  await mkdir(path.dirname(dest), { recursive: true });
  await writeFile(dest, buffer);
  const base =
    process.env.PUBLIC_BASE_URL?.replace(/\/$/, "") || "http://localhost:4000";
  return { url: `${base}/uploads/${key}`, key, storage: "local" };
}

export async function uploadImageBuffer(
  buffer: Buffer,
  originalname: string,
  mimetype: string,
  folder = "workshops",
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.has(mimetype)) {
    throw new UploadError("Only JPEG, PNG, WEBP or GIF images are allowed");
  }
  if (buffer.length > MAX_BYTES) {
    throw new UploadError("Image must be 5MB or smaller");
  }

  const key = buildKey(originalname || "image", mimetype, folder);

  if (getS3Config()) {
    try {
      return await uploadToS3(buffer, key, mimetype);
    } catch (err) {
      console.error("S3 upload failed, falling back to local storage:", err);
    }
  }

  return uploadLocal(buffer, key);
}

export function isS3Configured() {
  return Boolean(getS3Config());
}

export class UploadError extends Error {}
