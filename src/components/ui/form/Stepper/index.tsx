"use client";

import type { ChangeEvent, JSX } from "react";
import { Minus, Plus } from "lucide-react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { StepperProps } from "./types";
import styles from "./styles.module.scss";

const stepButtonClassNames: string =
  "flex size-10 shrink-0 items-center justify-center rounded-pill text-fg transition-colors duration-200 hover:bg-glass focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:pointer-events-none disabled:text-subtle";

const Stepper = (props: StepperProps): JSX.Element => {
  const { value, onChange, min, max, label, className, ...inputProps } = props;

  const clampToRange = (nextValue: number): number => {
    return Math.min(max, Math.max(min, nextValue));
  };

  const handleDecrease = (): void => {
    onChange(clampToRange(value - 1));
  };

  const handleIncrease = (): void => {
    onChange(clampToRange(value + 1));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const typedValue: number = event.target.valueAsNumber;

    if (Number.isNaN(typedValue)) {
      return;
    }

    onChange(clampToRange(Math.round(typedValue)));
  };

  return (
    <div
      className={mergeClassNames(
        "inline-flex min-h-12 items-center gap-1 self-start rounded-pill border border-glass bg-glass/40 p-1 transition-colors duration-200 focus-within:border-fg hover:border-subtle has-aria-invalid:border-fg",
        className,
      )}
    >
      <button
        type="button"
        className={stepButtonClassNames}
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label={`Decrease ${label}`}
      >
        <Minus aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        onChange={handleInputChange}
        className={mergeClassNames(
          "w-10 bg-transparent text-center text-nav font-medium tabular-nums focus-visible:outline-none",
          styles.numberInput,
        )}
        {...inputProps}
      />
      <button
        type="button"
        className={stepButtonClassNames}
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <Plus aria-hidden="true" className="size-4" strokeWidth={1.75} />
      </button>
      <span className="sr-only" aria-live="polite">
        {`${label}: ${value}`}
      </span>
    </div>
  );
};

export { Stepper };
