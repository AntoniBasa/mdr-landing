import type { ReactNode } from "react";

type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: readonly AccordionItem[];
  idPrefix: string;
  defaultOpenItemId?: string;
  className?: string;
};

export type { AccordionItem, AccordionProps };
