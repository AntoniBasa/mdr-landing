type SubscriberRecord = {
  email: string;
};

type SubscriberSaveResult = "saved" | "duplicate" | "not-configured";

export type { SubscriberRecord, SubscriberSaveResult };
