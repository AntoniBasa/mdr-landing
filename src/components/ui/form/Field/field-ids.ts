import type { DescribedByOptions } from "./types";

const getFieldHintId = (fieldId: string): string => {
  return `${fieldId}-hint`;
};

const getFieldErrorId = (fieldId: string): string => {
  return `${fieldId}-error`;
};

const getDescribedByIds = (
  fieldId: string,
  options: DescribedByOptions,
): string | undefined => {
  const { hasHint, hasError } = options;
  const describedByIds: string[] = [];

  if (hasHint) {
    describedByIds.push(getFieldHintId(fieldId));
  }

  if (hasError) {
    describedByIds.push(getFieldErrorId(fieldId));
  }

  if (describedByIds.length === 0) {
    return undefined;
  }

  return describedByIds.join(" ");
};

export { getFieldHintId, getFieldErrorId, getDescribedByIds };
