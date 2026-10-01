import type { ReactNode } from "react";

type RevealElement = "div" | "li";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delaySeconds?: number;
  as?: RevealElement;
};

export type { RevealElement, RevealProps };
