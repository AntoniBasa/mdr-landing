import "server-only";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/server/database/database";
import type { SubscriberRecord, SubscriberSaveResult } from "./types";

const SUBSCRIBER_MODEL_NAME: string = "Subscriber";
const DUPLICATE_KEY_ERROR_CODE: number = 11000;

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

const isDuplicateKeyError = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return false;
  }

  return error.code === DUPLICATE_KEY_ERROR_CODE;
};

const saveSubscriberRecord = async (
  subscriberRecord: SubscriberRecord,
): Promise<SubscriberSaveResult> => {
  const isDatabaseConnected: boolean = await connectToDatabase();

  if (!isDatabaseConnected) {
    return "not-configured";
  }

  await SubscriberRecordModel.init();

  try {
    await SubscriberRecordModel.create(subscriberRecord);
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      return "duplicate";
    }

    throw error;
  }

  return "saved";
};

export { saveSubscriberRecord };
