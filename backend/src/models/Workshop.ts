import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const workshopSchema = new Schema(
  {
    /** Static: train-the-trainer-1-day | life-counselling-4-day */
    programSlug: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    eventDate: { type: Date, required: true },
    fees: { type: Number, default: null },
    location: { type: String, required: true, trim: true },
    notificationEmail: { type: String, required: true, trim: true },
    metaPixelCode: { type: String, default: "" },
    includePayment: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    createdById: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

workshopSchema.index({ eventDate: -1 });
workshopSchema.index({ programSlug: 1 });

export type WorkshopDoc = InferSchemaType<typeof workshopSchema> & {
  _id: mongoose.Types.ObjectId;
};

if (mongoose.models.Workshop) {
  delete mongoose.models.Workshop;
}

export const Workshop: Model<WorkshopDoc> = mongoose.model<WorkshopDoc>(
  "Workshop",
  workshopSchema,
);
