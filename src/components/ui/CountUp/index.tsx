"use client";

import { useEffect, useRef, type JSX } from "react";
import {
  animate,
  useInView,
  useReducedMotion,
  type AnimationPlaybackControlsWithThen,
} from "framer-motion";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { EffectCleanup } from "@/types/react";
import type { CountUpProps } from "./types";

const CountUp = (props: CountUpProps): JSX.Element => {
  const { value, durationSeconds = 1.6, className } = props;
  const counterRef = useRef<HTMLSpanElement | null>(null);
  const isInView: boolean = useInView(counterRef, { once: true, amount: 0.6 });
  const shouldReduceMotion: boolean | null = useReducedMotion();

  useEffect((): EffectCleanup => {
    const counterElement: HTMLSpanElement | null = counterRef.current;

    if (counterElement === null || shouldReduceMotion === true) {
      return;
    }

    if (!isInView) {
      counterElement.textContent = "0";
      return;
    }

    const animationControls: AnimationPlaybackControlsWithThen = animate(0, value, {
      duration: durationSeconds,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latestValue: number): void => {
        counterElement.textContent = Math.round(latestValue).toString();
      },
    });

    return (): void => {
      animationControls.stop();
    };
  }, [isInView, shouldReduceMotion, value, durationSeconds]);

  return (
    <span
      aria-hidden="true"
      className={mergeClassNames("relative inline-block tabular-nums", className)}
    >
      <span className="invisible">{value}</span>
      <span ref={counterRef} className="absolute inset-0">
        {value}
      </span>
    </span>
  );
};

export { CountUp };
