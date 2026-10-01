import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { ButtonVariant } from "./types";

const baseClassNames: string =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-6 py-3 text-button font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:pointer-events-none disabled:opacity-50";

const variantClassNames: Record<ButtonVariant, string> = {
  accent: "bg-accent text-fg hover:bg-accent-hover",
  light: "bg-fg text-bg hover:bg-control",
  outline: "border border-fg px-[23px] py-[11px] text-fg hover:bg-glass",
};

const getButtonClassNames = (
  variant: ButtonVariant = "accent",
  className?: string,
): string => {
  return mergeClassNames(baseClassNames, variantClassNames[variant], className);
};

export { getButtonClassNames };
