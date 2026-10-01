import type { DroneModel, ModelImageAvailability } from "@/types/models";

type TouchPoint = {
  clientX: number;
  clientY: number;
};

type HeroSliderProps = {
  models: readonly DroneModel[];
  initialIndex: number;
  imageAvailability: ModelImageAvailability;
  galleryThumbnails: readonly string[];
};

export type { TouchPoint, HeroSliderProps };
