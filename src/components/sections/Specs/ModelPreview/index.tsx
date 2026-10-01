"use client";

import type { JSX } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { DronePlaceholder } from "@/components/ui/DronePlaceholder";
import { PreorderLink } from "@/components/ui/PreorderLink";
import { formatPrice } from "@/data/specs";
import type { ModelPreviewProps } from "./types";

const imageTransition: Transition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] };
const textTransition: Transition = { duration: 0.25, ease: [0.22, 1, 0.36, 1] };

const ModelPreview = (props: ModelPreviewProps): JSX.Element => {
  const { model, hasImage } = props;

  return (
    <Card className="flex flex-col overflow-hidden p-0 md:grid md:grid-cols-2 lg:flex lg:p-0">
      <div className="@container relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-64 lg:aspect-[16/10] lg:min-h-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={model.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={imageTransition}
          >
            {hasImage ? (
              <Image
                src={model.image}
                alt={`${model.name} drone`}
                fill
                sizes="(min-width: 1280px) 500px, (min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <DronePlaceholder model={model} titleClassName="text-[13cqw]" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={textTransition}
          >
            <p className="text-button font-medium tracking-eyebrow text-muted uppercase">
              {model.name}
            </p>
            <h3 className="mt-3 text-2xl leading-tight font-light">{model.tagline}</h3>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4 md:mt-auto md:pt-8 lg:pt-10">
          <p className="flex flex-col">
            <span className="text-button text-muted">Starting at</span>
            <span className="text-4xl leading-none font-light tabular-nums">
              {formatPrice(model.specs.priceUsd)}
            </span>
          </p>
          <PreorderLink modelId={model.id} variant="accent">
            Pre-order now
          </PreorderLink>
        </div>
      </div>
    </Card>
  );
};

export { ModelPreview };
