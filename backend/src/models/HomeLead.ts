import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const homeLeadSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    describesYou: { type: String, required: true, trim: true },
    availability: { type: String, required: true, trim: true },
    interestedIn708: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type HomeLeadDoc = InferSchemaType<typeof homeLeadSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

if (mongoose.models.HomeLead) {
  delete mongoose.models.HomeLead;
}

export const HomeLead: Model<HomeLeadDoc> = mongoose.model<HomeLeadDoc>(
  "HomeLead",
  homeLeadSchema,
);
