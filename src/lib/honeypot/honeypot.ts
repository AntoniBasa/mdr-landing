import type { BaseSyntheticEvent } from "react";

const HONEYPOT_FIELD: string = "website";

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

const readHoneypotValue = (event?: BaseSyntheticEvent): string => {
  if (event === undefined || !(event.target instanceof HTMLFormElement)) {
    return "";
  }

  const honeypotValue: FormDataEntryValue | null = new FormData(event.target).get(HONEYPOT_FIELD);

  if (typeof honeypotValue !== "string") {
    return "";
  }

  return honeypotValue;
};

export { HONEYPOT_FIELD, isHoneypotFilled, readHoneypotValue };
