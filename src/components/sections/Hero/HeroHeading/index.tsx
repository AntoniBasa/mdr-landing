"use client";

import type { JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PreorderLink } from "@/components/ui/PreorderLink";
import type { HeroHeadingProps } from "./types";

const TITLE_OFFSET_PIXELS: number = 12;

const HeroHeading = (props: HeroHeadingProps): JSX.Element => {
  const { model, shouldReduceMotion } = props;
  const verticalOffset: number = shouldReduceMotion ? 0 : TITLE_OFFSET_PIXELS;

  return (
    <div className="relative z-10 flex flex-col items-center px-4 pt-28 text-center md:pt-32 lg:pt-[136px]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={model.id}
          initial={{ opacity: 0, y: verticalOffset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -verticalOffset }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <h1 className="text-[2.5rem] leading-[1.2] font-medium sm:text-5xl md:text-[3.5rem] lg:text-display">
            {model.titleMain} <span className="text-muted">{model.titleAccent}</span>
          </h1>
          <p className="mt-3 text-nav font-medium md:text-lead lg:mt-[17px]">{model.tagline}</p>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap justify-center gap-[7px] lg:mt-7">
        <PreorderLink modelId={model.id} variant="light">
          Pre-order
        </PreorderLink>
        <ButtonLink href="#features" variant="outline">
          Learn more
        </ButtonLink>
      </div>
    </div>
  );
};

export { HeroHeading };
