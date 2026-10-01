import type { ComponentProps } from "react";
import type { ButtonVariant } from "@/components/ui/Button/types";

type ButtonLinkProps = ComponentProps<"a"> & {
  variant?: ButtonVariant;
};

export type { ButtonLinkProps };
