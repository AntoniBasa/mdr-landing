import type { ReactNode } from "react";

type DescribedByOptions = {
  hasHint: boolean;
  hasError: boolean;
};

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

export type { DescribedByOptions, FieldProps };
