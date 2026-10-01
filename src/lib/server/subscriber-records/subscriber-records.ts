import "server-only";
import mongoose from "mongoose";
import type { SubscriberRecord } from "./types";

const SUBSCRIBER_MODEL_NAME: string = "Subscriber";

const subscriberRecordSchema: mongoose.Schema<SubscriberRecord> =
  new mongoose.Schema<SubscriberRecord>(
    {
      email: { type: String, required: true, unique: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } },
  );

const SubscriberRecordModel: mongoose.Model<SubscriberRecord> =
  mongoose.models[SUBSCRIBER_MODEL_NAME] ??
  mongoose.model<SubscriberRecord>(SUBSCRIBER_MODEL_NAME, subscriberRecordSchema);

export { SubscriberRecordModel };
