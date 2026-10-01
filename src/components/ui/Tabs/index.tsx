"use client";

import { useRef, type JSX, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import { getTabId, getTabPanelId } from "./tab-ids";
import type { TabItem, TabsProps } from "./types";

const getTargetTabIndex = (
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

  if (pressedKey === "ArrowRight") {
    if (currentIndex === lastIndex) {
      return 0;
    }

    return currentIndex + 1;
  }

  if (pressedKey === "ArrowLeft") {
    if (currentIndex === 0) {
      return lastIndex;
    }

    return currentIndex - 1;
  }

  return null;
};

function Tabs<TabValue extends string>(props: TabsProps<TabValue>): JSX.Element {
  const { items, value, onChange, label, idPrefix, className } = props;
  const tabListRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    const currentIndex: number = items.findIndex(
      (item: TabItem<TabValue>): boolean => item.value === value,
    );
    const targetIndex: number | null = getTargetTabIndex(
      event.key,
      currentIndex,
      items.length - 1,
    );

    if (targetIndex === null) {
      return;
    }

    event.preventDefault();
    onChange(items[targetIndex].value);

    const tabList: HTMLDivElement | null = tabListRef.current;

    if (tabList === null) {
      return;
    }

    const tabButtons: NodeListOf<HTMLButtonElement> =
      tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    const targetTab: HTMLButtonElement | undefined = tabButtons[targetIndex];

    if (targetTab !== undefined) {
      targetTab.focus();
    }
  };

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={mergeClassNames(
        "inline-flex rounded-pill border border-glass bg-glass/40 p-1",
        className,
      )}
    >
      {items.map((item: TabItem<TabValue>): JSX.Element => {
        const isSelected: boolean = item.value === value;
        let tabIndex: number = -1;

        if (isSelected) {
          tabIndex = 0;
        }

        return (
          <button
            key={item.value}
            id={getTabId(idPrefix, item.value)}
            type="button"
            role="tab"
            aria-selected={isSelected}
            aria-controls={getTabPanelId(idPrefix)}
            tabIndex={tabIndex}
            onClick={(): void => onChange(item.value)}
            className={mergeClassNames(
              "relative min-h-10 flex-1 rounded-pill px-4 text-button font-medium whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg sm:px-5",
              isSelected ? "text-bg" : "text-muted hover:text-fg",
            )}
          >
            {isSelected && (
              <motion.span
                aria-hidden
                layoutId={`${idPrefix}-indicator`}
                className="absolute inset-0 rounded-pill bg-fg"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export { Tabs };
