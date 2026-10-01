import type { DroneModel, ModelId } from "@/types/models";

const models: readonly DroneModel[] = [
  {
    id: "heavy",
    shortName: "Heavy",
    name: "MDR HEAVY",
    titleMain: "MDR",
    titleAccent: "HEAVY",
    tagline: "Stronger, steadier, built to carry",
    image: "/drones/heavy.png",
    galleryCount: 41,
    specs: {
      maxSpeedKmh: 72,
      flightTimeMin: 38,
      rangeKm: 12,
      camera: "6K / 1-inch",
      weightG: 1450,
      priceUsd: 2499,
    },
  },
  {
    id: "ultra-light",
    shortName: "Ultra Light",
    name: "MDR ULTRA LIGHT",
    titleMain: "MDR ULTRA",
    titleAccent: "LIGHT",
    tagline: "Faster, lighter, more efficient",
    image: "/drones/ultra-light.png",
    galleryCount: 53,
    specs: {
      maxSpeedKmh: 57,
      flightTimeMin: 45,
      rangeKm: 15,
      camera: "8K / 1/1.3-inch",
      weightG: 249,
      priceUsd: 1199,
    },
  },
  {
    id: "superfast",
    shortName: "Superfast",
    name: "MDR SUPERFAST",
    titleMain: "MDR",
    titleAccent: "SUPERFAST",
    tagline: "Pure speed, zero compromise",
    image: "/drones/superfast.png",
    galleryCount: 37,
    specs: {
      maxSpeedKmh: 140,
      flightTimeMin: 24,
      rangeKm: 10,
      camera: "4K / 120 fps",
      weightG: 795,
      priceUsd: 1799,
    },
  },
];

const modelIds: readonly ModelId[] = models.map((model: DroneModel): ModelId => model.id);

const defaultModelId: ModelId = "ultra-light";

const isModelId = (value: unknown): value is ModelId => {
  return modelIds.some((modelId: ModelId): boolean => modelId === value);
};

const findModelInList = (
  modelList: readonly DroneModel[],
  modelId: ModelId,
): DroneModel => {
  const foundModel: DroneModel | undefined = modelList.find(
    (model: DroneModel): boolean => model.id === modelId,
  );

  if (foundModel === undefined) {
    return modelList[0];
  }

  return foundModel;
};

const findModelById = (modelId: ModelId): DroneModel => {
  const foundModel: DroneModel | undefined = models.find(
    (model: DroneModel): boolean => model.id === modelId,
  );

  if (foundModel === undefined) {
    throw new Error(`Unknown model id: ${modelId}`);
  }

  return foundModel;
};

export { models, modelIds, defaultModelId, isModelId, findModelInList, findModelById };
