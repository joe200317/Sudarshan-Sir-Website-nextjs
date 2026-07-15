import mongoose, { Schema } from "mongoose";

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

export const WorkshopRegistration =
  mongoose.models.WorkshopRegistration ||
  mongoose.model("WorkshopRegistration", workshopRegistrationSchema);
