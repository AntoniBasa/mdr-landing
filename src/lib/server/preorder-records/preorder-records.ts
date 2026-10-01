import "server-only";
import mongoose from "mongoose";
import { modelIds } from "@/data/models";
import { connectToDatabase } from "@/lib/server/database/database";
import type { PreorderRecord } from "./types";

const PREORDER_MODEL_NAME: string = "PreOrder";

const preorderRecordSchema: mongoose.Schema<PreorderRecord> = new mongoose.Schema<PreorderRecord>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    model: { type: String, required: true, enum: [...modelIds] },
    quantity: { type: Number, required: true },
    comment: { type: String, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const PreorderRecordModel: mongoose.Model<PreorderRecord> =
  mongoose.models[PREORDER_MODEL_NAME] ??
  mongoose.model<PreorderRecord>(PREORDER_MODEL_NAME, preorderRecordSchema);

const savePreorderRecord = async (preorderRecord: PreorderRecord): Promise<string | null> => {
  const isDatabaseConnected: boolean = await connectToDatabase();

  if (!isDatabaseConnected) {
    return null;
  }

  const savedPreorder: mongoose.HydratedDocument<PreorderRecord> =
    await PreorderRecordModel.create(preorderRecord);

  return savedPreorder._id.toString();
};

export { savePreorderRecord };
