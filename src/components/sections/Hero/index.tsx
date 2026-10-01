import type { JSX } from "react";
import { heroGalleryThumbnails } from "@/data/navigation";
import { getModelImageAvailability, getModels } from "@/lib/models/models";
import type { DroneModel, ModelsResponse } from "@/types/models";
import { HeroSlider } from "./HeroSlider";

const Hero = async (): Promise<JSX.Element> => {
  const modelsResponse: ModelsResponse = await getModels();
  const { models, defaultModelId } = modelsResponse;
  const defaultModelIndex: number = models.findIndex(
    (model: DroneModel): boolean => model.id === defaultModelId,
  );

  return (
    <HeroSlider
      models={models}
      initialIndex={Math.max(0, defaultModelIndex)}
      imageAvailability={getModelImageAvailability(models)}
      galleryThumbnails={heroGalleryThumbnails}
    />
  );
};

export { Hero };
