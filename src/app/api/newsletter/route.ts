import { isHoneypotFilled } from "@/lib/honeypot/honeypot";
import { createRateLimiter, getClientIpAddress } from "@/lib/server/rate-limit/rate-limit";
import type { RateLimitChecker, RateLimitResult } from "@/lib/server/rate-limit/types";
import { saveSubscriberRecord } from "@/lib/server/subscriber-records/subscriber-records";
import type { SubscriberSaveResult } from "@/lib/server/subscriber-records/types";
import { newsletterSchema } from "@/lib/validation/newsletter";
import type { NewsletterResponse } from "@/types/newsletter";

const RATE_LIMIT_REQUESTS: number = 5;
const RATE_LIMIT_WINDOW_MILLISECONDS: number = 10 * 60 * 1000;

const checkRateLimit: RateLimitChecker = createRateLimiter({
  limit: RATE_LIMIT_REQUESTS,
  windowMilliseconds: RATE_LIMIT_WINDOW_MILLISECONDS,
});

const createJsonResponse = (body: NewsletterResponse, init?: ResponseInit): Response => {
  return Response.json(body, init);
};

const POST = async (request: Request): Promise<Response> => {
  const rateLimitResult: RateLimitResult = checkRateLimit(getClientIpAddress(request));

  if (!rateLimitResult.allowed) {
    return createJsonResponse(
      { ok: false, error: "Too many requests. Please try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(rateLimitResult.retryAfterSeconds) } },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return createJsonResponse({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotFilled(body)) {
    return createJsonResponse({ ok: true, status: "subscribed" }, { status: 201 });
  }

  const validationResult = newsletterSchema.safeParse(body);

  if (!validationResult.success) {
    return createJsonResponse(
      { ok: false, error: validationResult.error.issues[0].message },
      { status: 422 },
    );
  }

  const email: string = validationResult.data.email;
  let saveResult: SubscriberSaveResult = "not-configured";

  try {
    saveResult = await saveSubscriberRecord({ email });
  } catch (error: unknown) {
    console.error("[mdr] Failed to save subscriber:", error);

    return createJsonResponse(
      { ok: false, error: "We couldn't subscribe you. Please try again later." },
      { status: 500 },
    );
  }

  if (saveResult === "duplicate") {
    return createJsonResponse({ ok: true, status: "already-subscribed" });
  }

  if (saveResult === "not-configured") {
    console.info("[mdr] Subscriber (not saved):", { email });

    return createJsonResponse({ ok: true, status: "subscribed" }, { status: 201 });
  }

  return createJsonResponse({ ok: true, status: "subscribed" }, { status: 201 });
};

export { POST };
