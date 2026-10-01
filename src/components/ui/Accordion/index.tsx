"use client";

import { useRef, useState, type JSX, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import { getAccordionPanelId, getAccordionTriggerId } from "./accordion-ids";
import styles from "./styles.module.scss";
import type { AccordionItem, AccordionProps } from "./types";

const getTargetTriggerIndex = (
  pressedKey: string,
  currentIndex: number,
  lastIndex: number,
): number | null => {
  if (pressedKey === "Home") {
    return 0;
  }

  if (pressedKey === "End") {
    return lastIndex;
  }

  if (pressedKey === "ArrowDown") {
    if (currentIndex === lastIndex) {
      return 0;
    }

    return currentIndex + 1;
  }

  if (pressedKey === "ArrowUp") {
    if (currentIndex === 0) {
      return lastIndex;
    }

    return currentIndex - 1;
  }

  return null;
};

const Accordion = (props: AccordionProps): JSX.Element => {
  const { items, idPrefix, defaultOpenItemId, className } = props;
  const [openItemId, setOpenItemId] = useState<string | null>(defaultOpenItemId ?? null);
  const accordionRef = useRef<HTMLDivElement | null>(null);

  const toggleItem = (itemId: string): void => {
    if (openItemId === itemId) {
      setOpenItemId(null);
      return;
    }

    setOpenItemId(itemId);
  };

  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number,
  ): void => {
    const targetIndex: number | null = getTargetTriggerIndex(
      event.key,
      currentIndex,
      items.length - 1,
    );

    if (targetIndex === null) {
      return;
    }

    event.preventDefault();

    const accordion: HTMLDivElement | null = accordionRef.current;

    if (accordion === null) {
      return;
    }

    const triggers: NodeListOf<HTMLButtonElement> =
      accordion.querySelectorAll<HTMLButtonElement>("[data-accordion-trigger]");
    const targetTrigger: HTMLButtonElement | undefined = triggers[targetIndex];

    if (targetTrigger !== undefined) {
      targetTrigger.focus();
    }
  };

  return (
    <div ref={accordionRef} className={mergeClassNames("border-t border-glass", className)}>
      {items.map((item: AccordionItem, index: number): JSX.Element => {
        const isOpen: boolean = item.id === openItemId;
        const triggerId: string = getAccordionTriggerId(idPrefix, item.id);
        const panelId: string = getAccordionPanelId(idPrefix, item.id);

        return (
          <div key={item.id} className="border-b border-glass">
            <h3>
              <button
                id={triggerId}
                type="button"
                data-accordion-trigger=""
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={(): void => toggleItem(item.id)}
                onKeyDown={(event: KeyboardEvent<HTMLButtonElement>): void =>
                  handleTriggerKeyDown(event, index)
                }
                className="group flex w-full items-center justify-between gap-6 rounded-thumb py-5 text-left text-nav font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg md:py-6 md:text-lead"
              >
                {item.title}
                <span
                  aria-hidden="true"
                  className={mergeClassNames(
                    "flex size-10 shrink-0 items-center justify-center rounded-pill border border-glass transition-colors duration-300 group-hover:border-subtle",
                    isOpen && "border-subtle bg-glass",
                  )}
                >
                  <Plus
                    className={mergeClassNames(
                      "size-4 transition-transform duration-300 motion-reduce:transition-none",
                      isOpen && "rotate-45",
                    )}
                    strokeWidth={1.5}
                  />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={mergeClassNames(styles.panel, isOpen && styles.panelOpen)}
            >
              <div className={styles.panelContent}>
                <div className="pr-12 pb-6 text-nav text-muted md:pr-16 md:pb-8">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Accordion };
