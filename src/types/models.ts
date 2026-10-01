type ModelId = "heavy" | "ultra-light" | "superfast";

type ModelSpecs = {
  maxSpeedKmh: number;
  flightTimeMin: number;
  rangeKm: number;
  camera: string;
  weightG: number;
  priceUsd: number;
};

type DroneModel = {
  id: ModelId;
  name: string;
  shortName: string;
  titleMain: string;
  titleAccent: string;
  tagline: string;
  image: string;
  galleryCount: number;
  specs: ModelSpecs;
};

type ModelsResponse = {
  models: readonly DroneModel[];
  defaultModelId: ModelId;
};

type ModelImageAvailability = Record<ModelId, boolean>;

export type { ModelId, ModelSpecs, DroneModel, ModelsResponse, ModelImageAvailability };
