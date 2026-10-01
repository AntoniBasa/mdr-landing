import { randomUUID } from "node:crypto";
import { after } from "next/server";
import * as zod from "zod";
import { isEmailConfigured, sendPreorderConfirmation } from "@/lib/server/email/email";
import { savePreorderRecord } from "@/lib/server/preorder-records/preorder-records";
import type { PreorderRecord } from "@/lib/server/preorder-records/types";
import { createRateLimiter, getClientIpAddress } from "@/lib/server/rate-limit/rate-limit";
import type { RateLimitChecker, RateLimitResult } from "@/lib/server/rate-limit/types";
import { HONEYPOT_FIELD, preorderFieldNames, preorderSchema } from "@/lib/validation/preorder";
import type {
  PreorderConfirmation,
  PreorderFieldErrors,
  PreorderInput,
  PreorderResponse,
} from "@/types/preorder";

const RATE_LIMIT_REQUESTS: number = 5;
const RATE_LIMIT_WINDOW_MILLISECONDS: number = 10 * 60 * 1000;

const checkRateLimit: RateLimitChecker = createRateLimiter({
  limit: RATE_LIMIT_REQUESTS,
  windowMilliseconds: RATE_LIMIT_WINDOW_MILLISECONDS,
});

const createJsonResponse = (body: PreorderResponse, init?: ResponseInit): Response => {
  return Response.json(body, init);
};

const isHoneypotFilled = (body: unknown): boolean => {
  if (typeof body !== "object" || body === null) {
    return false;
  }

  const bodyEntries: [string, unknown][] = Object.entries(body);

  for (const [fieldName, fieldValue] of bodyEntries) {
    if (fieldName === HONEYPOT_FIELD && Boolean(fieldValue)) {
      return true;
    }
  }

  return false;
};

const collectFieldErrors = (validationError: zod.ZodError<PreorderInput>): PreorderFieldErrors => {
  const flattenedError = zod.flattenError(validationError);
  const fieldErrors: PreorderFieldErrors = {};

  for (const fieldName of preorderFieldNames) {
    const messages: string[] | undefined = flattenedError.fieldErrors[fieldName];

    if (messages !== undefined && messages.length > 0) {
      fieldErrors[fieldName] = messages[0];
    }
  }

  return fieldErrors;
};

const createPreorderRecord = (preorder: PreorderInput): PreorderRecord => {
  let comment: string | null = null;

  if (preorder.comment !== "") {
    comment = preorder.comment;
  }

  return {
    name: preorder.name,
    email: preorder.email,
    model: preorder.model,
    quantity: preorder.quantity,
    comment,
  };
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
    return createJsonResponse({
      ok: true,
      id: randomUUID(),
      delivery: { database: false, email: false },
    });
  }

  const validationResult = preorderSchema.safeParse(body);

  if (!validationResult.success) {
    return createJsonResponse(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: collectFieldErrors(validationResult.error),
      },
      { status: 422 },
    );
  }

  const preorderRecord: PreorderRecord = createPreorderRecord(validationResult.data);
  let savedPreorderId: string | null = null;

  try {
    savedPreorderId = await savePreorderRecord(preorderRecord);
  } catch (error: unknown) {
    console.error("[mdr] Failed to save pre-order:", error);

    return createJsonResponse(
      { ok: false, error: "We couldn't save your pre-order. Please try again later." },
      { status: 500 },
    );
  }

  const isDatabaseEnabled: boolean = savedPreorderId !== null;
  let preorderId: string = randomUUID();

  if (savedPreorderId === null) {
    console.info("[mdr] Pre-order (not saved):", { id: preorderId, ...preorderRecord });
  } else {
    preorderId = savedPreorderId;
  }

  const preorderConfirmation: PreorderConfirmation = {
    id: preorderId,
    name: preorderRecord.name,
    email: preorderRecord.email,
    model: preorderRecord.model,
    quantity: preorderRecord.quantity,
  };
  const isEmailEnabled: boolean = isEmailConfigured();

  after((): Promise<void> => sendPreorderConfirmation(preorderConfirmation));

  return createJsonResponse(
    {
      ok: true,
      id: preorderId,
      delivery: { database: isDatabaseEnabled, email: isEmailEnabled },
    },
    { status: 201 },
  );
};

export { POST };
