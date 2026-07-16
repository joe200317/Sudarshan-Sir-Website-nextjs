import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const newsletterSubscriptionSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
  },
  { timestamps: true, collection: "newsletter_subscriptions" },
);

export type NewsletterSubscriptionDoc = InferSchemaType<
  typeof newsletterSubscriptionSchema
> & {
  _id: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

if (mongoose.models.NewsletterSubscription) {
  delete mongoose.models.NewsletterSubscription;
}

export const NewsletterSubscription: Model<NewsletterSubscriptionDoc> =
  mongoose.model<NewsletterSubscriptionDoc>(
    "NewsletterSubscription",
    newsletterSubscriptionSchema,
  );
