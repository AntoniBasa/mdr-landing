"use client";

import type { JSX } from "react";
import {
  motion,
  type TargetAndTransition,
  type Transition,
  type ViewportOptions,
} from "framer-motion";
import type { RevealProps } from "./types";

const hiddenState: TargetAndTransition = { opacity: 0, y: 24 };
const visibleState: TargetAndTransition = { opacity: 1, y: 0 };
const viewportOptions: ViewportOptions = { once: true, amount: 0.2 };

const Reveal = (props: RevealProps): JSX.Element => {
  const { children, className, delaySeconds = 0, as = "div" } = props;
  const transition: Transition = { duration: 0.7, delay: delaySeconds, ease: [0.16, 1, 0.3, 1] };

  if (as === "li") {
    return (
      <motion.li
        className={className}
        initial={hiddenState}
        whileInView={visibleState}
        viewport={viewportOptions}
        transition={transition}
      >
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div
      className={className}
      initial={hiddenState}
      whileInView={visibleState}
      viewport={viewportOptions}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export { Reveal };
