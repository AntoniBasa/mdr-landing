import type * as zod from "zod";
import type { newsletterSchema } from "@/lib/validation/newsletter";

type NewsletterInput = zod.infer<typeof newsletterSchema>;

type NewsletterSubscriptionStatus = "subscribed" | "already-subscribed";

type NewsletterSuccessResponse = {
  ok: true;
  status: NewsletterSubscriptionStatus;
};

type NewsletterFailureResponse = {
  ok: false;
  error: string;
};

type NewsletterResponse = NewsletterSuccessResponse | NewsletterFailureResponse;

export type {
  NewsletterInput,
  NewsletterSubscriptionStatus,
  NewsletterSuccessResponse,
  NewsletterFailureResponse,
  NewsletterResponse,
};
