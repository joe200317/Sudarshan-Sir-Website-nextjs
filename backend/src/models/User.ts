import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const permissionItemSchema = new Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    allowed: { type: Boolean, default: true },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["SUPER_ADMIN", "USER"],
      default: "USER",
    },
    isActive: { type: Boolean, default: true },
    permissions: { type: [permissionItemSchema], default: [] },
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const User: Model<UserDoc> =
  mongoose.models.User || mongoose.model<UserDoc>("User", userSchema);
