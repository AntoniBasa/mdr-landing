import type { MotionValue } from "framer-motion";
import type { DroneModel } from "@/types/models";

type HeroStageProps = {
  model: DroneModel;
  hasImage: boolean;
  shouldPrioritize: boolean;
  shouldReduceMotion: boolean;
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
};

export type { HeroStageProps };
