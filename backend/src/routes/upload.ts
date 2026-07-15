import { Router } from "express";
import multer from "multer";
import { requireAuth } from "../lib/auth.js";
import { isS3Configured, uploadImageBuffer, UploadError } from "../lib/s3.js";
import { asyncHandler } from "../middleware/error.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const router = Router();

router.post(
  "/",
  upload.single("file"),
  asyncHandler(async (req, res) => {
    await requireAuth(req);
    if (!req.file) throw new UploadError("file is required");

    const folderRaw = String(req.body.folder || "workshops").trim();
    const folder = ["workshops", "events"].includes(folderRaw)
      ? folderRaw
      : "workshops";

    const result = await uploadImageBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      folder,
    );

    res.json({ ...result, s3Configured: isS3Configured() });
  }),
);

export default router;
