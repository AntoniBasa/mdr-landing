import "server-only";
import { defaultModelId, models } from "@/data/models";
import { checkPublicAssetExists } from "@/lib/public-assets/public-assets";
import type { DroneModel, ModelImageAvailability, ModelsResponse } from "@/types/models";

const getModels = async (): Promise<ModelsResponse> => {
  return { models, defaultModelId };
};

const getModelImageAvailability = (
  modelList: readonly DroneModel[],
): ModelImageAvailability => {
  const imageAvailability: ModelImageAvailability = {
    heavy: false,
    "ultra-light": false,
    superfast: false,
  };

  for (const model of modelList) {
    imageAvailability[model.id] = checkPublicAssetExists(model.image);
  }

  return imageAvailability;
};

export { getModels, getModelImageAvailability };
