"use client";

import type { JSX } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import { DronePlaceholder } from "@/components/ui/DronePlaceholder";
import type { HeroStageProps } from "./types";
import styles from "./styles.module.scss";

const fadedState: TargetAndTransition = { opacity: 0 };
const enteringState: TargetAndTransition = { opacity: 0, scale: 1.06 };
const leavingState: TargetAndTransition = { opacity: 0, scale: 0.96 };
const visibleState: TargetAndTransition = { opacity: 1, scale: 1 };

const HeroStage = (props: HeroStageProps): JSX.Element => {
  const { model, hasImage, shouldPreload, shouldReduceMotion, parallaxX, parallaxY } = props;
  const initialState: TargetAndTransition = shouldReduceMotion ? fadedState : enteringState;
  const exitState: TargetAndTransition = shouldReduceMotion ? fadedState : leavingState;

  return (
    <motion.div aria-hidden className={styles.stage} style={{ x: parallaxX, y: parallaxY }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={model.id}
          className="absolute inset-0"
          initial={initialState}
          animate={visibleState}
          exit={exitState}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {hasImage ? (
            <Image
              src={model.image}
              alt=""
              fill
              sizes="(min-width: 768px) 100vw, 160vw"
              preload={shouldPreload}
              className="object-cover"
            />
          ) : (
            <DronePlaceholder model={model} titleClassName="text-[12cqw] md:text-[9cqw]" />
          )}
        </motion.div>
      </AnimatePresence>

      <Image
        src="/hero/ellipse.svg"
        alt=""
        width={1014}
        height={226}
        loading="eager"
        unoptimized
        className={styles.ellipse}
      />
    </motion.div>
  );
};

export { HeroStage };
