import type { ComponentProps } from "react";

type ButtonVariant = "accent" | "light" | "outline";

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
};

export type { ButtonVariant, ButtonProps };
