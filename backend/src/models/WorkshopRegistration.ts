import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const workshopRegistrationSchema = new Schema(
  {
    workshopId: {
      type: Schema.Types.ObjectId,
      ref: "Workshop",
      required: true,
      index: true,
    },
    workshopSlug: { type: String, required: true, trim: true, index: true },
    programSlug: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    profession: { type: String, required: true, trim: true },
    monthlyIncome: { type: String, required: true, trim: true },
    isSerious: { type: Boolean, required: true },
    amount: { type: Number, default: 0 },
    paymentRequired: { type: Boolean, default: false },
    paymentStatus: {
      type: String,
      enum: ["none", "pending", "paid", "failed"],
      default: "none",
    },
    razorpayOrderId: { type: String, default: "" },
    razorpayPaymentId: { type: String, default: "" },
    whatsappSent: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type WorkshopRegistrationDoc = InferSchemaType<
  typeof workshopRegistrationSchema
> & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

if (mongoose.models.WorkshopRegistration) {
  delete mongoose.models.WorkshopRegistration;
}

export const WorkshopRegistration: Model<WorkshopRegistrationDoc> =
  mongoose.model<WorkshopRegistrationDoc>(
    "WorkshopRegistration",
    workshopRegistrationSchema,
  );
