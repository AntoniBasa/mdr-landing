"use client";

import { useId, useState, type BaseSyntheticEvent, type JSX } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/form/Field";
import { getDescribedByIds } from "@/components/ui/form/Field/field-ids";
import { HoneypotField } from "@/components/ui/form/HoneypotField";
import { Input } from "@/components/ui/form/Input";
import { HONEYPOT_FIELD, readHoneypotValue } from "@/lib/honeypot/honeypot";
import { EMAIL_MAX_LENGTH, newsletterSchema } from "@/lib/validation/newsletter";
import type {
  NewsletterInput,
  NewsletterResponse,
  NewsletterSubscriptionStatus,
} from "@/types/newsletter";

const NEWSLETTER_ENDPOINT: string = "/api/newsletter";
const NETWORK_ERROR_MESSAGE: string = "Network error. Check your connection and try again.";
const UNKNOWN_ERROR_MESSAGE: string = "Something went wrong. Please try again.";

const confirmationMessages: Record<NewsletterSubscriptionStatus, string> = {
  subscribed: "You're subscribed. Launch news is on its way.",
  "already-subscribed": "You're already on the list. No need to sign up twice.",
};

const emptyValues: NewsletterInput = { email: "" };

const readNewsletterResponse = async (response: Response): Promise<NewsletterResponse | null> => {
  try {
    const responseBody: NewsletterResponse = await response.json();

    return responseBody;
  } catch {
    return null;
  }
};

const NewsletterForm = (): JSX.Element => {
  const formId: string = useId();
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmationStatus, setConfirmationStatus] =
    useState<NewsletterSubscriptionStatus | null>(null);

  const form: UseFormReturn<NewsletterInput> = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
    mode: "onSubmit",
    defaultValues: emptyValues,
  });
  const { register, handleSubmit, reset, formState } = form;
  const { errors, isSubmitting } = formState;

  const emailFieldId: string = `${formId}-email`;
  const honeypotFieldId: string = `${formId}-${HONEYPOT_FIELD}`;
  const hasEmailError: boolean = errors.email !== undefined;
  const hasServerError: boolean = serverError !== null;

  const submitSubscription = async (
    subscription: NewsletterInput,
    event?: BaseSyntheticEvent,
  ): Promise<void> => {
    setServerError(null);
    setConfirmationStatus(null);

    let result: NewsletterResponse | null = null;

    try {
      const response: Response = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...subscription, [HONEYPOT_FIELD]: readHoneypotValue(event) }),
      });
      result = await readNewsletterResponse(response);
    } catch {
      setServerError(NETWORK_ERROR_MESSAGE);
      return;
    }

    if (result === null) {
      setServerError(UNKNOWN_ERROR_MESSAGE);
      return;
    }

    if (!result.ok) {
      setServerError(result.error);
      return;
    }

    reset(emptyValues);
    setConfirmationStatus(result.status);
  };

  return (
    <form
      noValidate
      aria-label="Newsletter"
      onSubmit={handleSubmit(submitSubscription)}
      className="flex w-full max-w-sm flex-col gap-3"
    >
      <Field id={emailFieldId} label="Get launch updates" error={errors.email?.message}>
        <div className="flex gap-2">
          <Input
            id={emailFieldId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            maxLength={EMAIL_MAX_LENGTH}
            aria-invalid={hasEmailError}
            aria-describedby={getDescribedByIds(emailFieldId, {
              hasHint: false,
              hasError: hasEmailError,
            })}
            className="min-w-0"
            {...register("email")}
          />
          <Button
            type="submit"
            variant="outline"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="min-h-12 shrink-0 disabled:opacity-80"
          >
            {isSubmitting && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
            Subscribe
          </Button>
        </div>
      </Field>

      <HoneypotField id={honeypotFieldId} />

      {hasServerError && (
        <p role="alert" className="flex items-start gap-1.5 text-button">
          <CircleAlert aria-hidden="true" className="mt-px size-4 shrink-0" strokeWidth={1.75} />
          {serverError}
        </p>
      )}

      <div role="status">
        {confirmationStatus !== null && (
          <p className="flex items-start gap-1.5 text-button">
            <CircleCheck aria-hidden="true" className="mt-px size-4 shrink-0" strokeWidth={1.75} />
            {confirmationMessages[confirmationStatus]}
          </p>
        )}
      </div>
    </form>
  );
};

export { NewsletterForm };
