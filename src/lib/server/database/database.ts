import "server-only";
import mongoose from "mongoose";
import { readOptionalEnvironmentVariable } from "@/lib/server/environment/environment";

const SERVER_SELECTION_TIMEOUT_MILLISECONDS: number = 5000;

let pendingConnection: Promise<typeof mongoose> | null = null;

const connectToDatabase = async (): Promise<boolean> => {
  const connectionString: string | undefined = readOptionalEnvironmentVariable(
    "MONGODB_URI",
    "records are logged to the console instead of saved",
  );

  if (connectionString === undefined) {
    return false;
  }

  if (pendingConnection === null) {
    pendingConnection = mongoose.connect(connectionString, {
      serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MILLISECONDS,
    });
  }

  try {
    await pendingConnection;
  } catch (error: unknown) {
    pendingConnection = null;

    throw error;
  }

  return true;
};

export { connectToDatabase };
