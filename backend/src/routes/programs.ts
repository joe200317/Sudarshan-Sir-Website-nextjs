import { Router } from "express";
import { Program } from "../models/Program.js";
import { Workshop } from "../models/Workshop.js";
import {
  AuthError,
  requirePermission,
  requireSuperAdmin,
} from "../lib/auth.js";
import { slugify, uniqueSlug } from "../lib/utils.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

function serializeProgram(p: {
  _id: { toString(): string };
  title: string;
  slug: string;
  description?: string | null;
  isActive?: boolean | null;
  createdAt?: Date;
}) {
  return {
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    description: p.description || "",
    isActive: p.isActive ?? true,
    createdAt: p.createdAt,
  };
}

router.get(
  "/",
  asyncHandler(async (req, res) => {
    await requirePermission(req, "workshops");
    const programs = await Program.find({ isActive: true })
      .sort({ title: 1 })
      .lean();
    res.json({ programs: programs.map(serializeProgram) });
  }),
);

router.get(
  "/all",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const programs = await Program.find().sort({ createdAt: -1 }).lean();
    res.json({ programs: programs.map(serializeProgram) });
  }),
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const session = await requirePermission(req, "programs");
    const title = String(req.body.title || "").trim();
    const description = String(req.body.description || "").trim();

    if (!title) {
      throw new AuthError("Title is required", 400);
    }

    const slug = await uniqueSlug(title, async (s) =>
      Boolean(await Program.findOne({ slug: s }).select("_id").lean()),
    );

    const program = await Program.create({
      title,
      slug,
      description,
      createdById: session.userId,
    });

    res.json({ program: serializeProgram(program) });
  }),
);

router.patch(
  "/:id",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const program = await Program.findById(req.params.id);
    if (!program) throw new AuthError("Program not found", 404);

    if (req.body.title !== undefined) {
      program.title = String(req.body.title).trim();
    }
    if (req.body.slug !== undefined) {
      const slug = slugify(String(req.body.slug));
      if (slug !== program.slug) {
        const clash = await Program.findOne({ slug });
        if (clash) throw new AuthError("Slug already exists", 400);
      }
      program.slug = slug;
    }
    if (req.body.description !== undefined) {
      program.description = String(req.body.description).trim();
    }
    if (typeof req.body.isActive === "boolean") {
      program.isActive = req.body.isActive;
    }

    await program.save();
    res.json({ program: serializeProgram(program) });
  }),
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    await requireSuperAdmin(req);
    const count = await Workshop.countDocuments({
      programId: req.params.id,
    });
    if (count > 0) {
      throw new AuthError(
        "Cannot delete program that has workshops. Deactivate it instead.",
        400,
      );
    }
    await Program.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  }),
);

export default router;
