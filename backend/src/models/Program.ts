import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const programSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    createdById: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

export type ProgramDoc = InferSchemaType<typeof programSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Program: Model<ProgramDoc> =
  mongoose.models.Program ||
  mongoose.model<ProgramDoc>("Program", programSchema);
