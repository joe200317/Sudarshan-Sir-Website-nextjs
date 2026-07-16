import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: "contact_messages" },
);

export type ContactMessageDoc = InferSchemaType<typeof contactMessageSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

if (mongoose.models.ContactMessage) {
  delete mongoose.models.ContactMessage;
}

export const ContactMessage: Model<ContactMessageDoc> =
  mongoose.model<ContactMessageDoc>("ContactMessage", contactMessageSchema);
