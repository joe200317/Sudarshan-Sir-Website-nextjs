import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

/** Standalone Event — separate from workshops. Only the fields below. */
const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    createdById: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

eventSchema.index({ startDate: -1 });

export type EventDoc = InferSchemaType<typeof eventSchema> & {
  _id: mongoose.Types.ObjectId;
};

// Drop cached model so schema updates apply after code changes
if (mongoose.models.Event) {
  delete mongoose.models.Event;
}

export const Event: Model<EventDoc> = mongoose.model<EventDoc>(
  "Event",
  eventSchema,
);
