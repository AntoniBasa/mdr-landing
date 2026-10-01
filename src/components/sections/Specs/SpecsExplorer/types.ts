import type { ReactNode } from "react";
import type { DroneModel, ModelId, ModelImageAvailability } from "@/types/models";

type SpecsExplorerProps = {
  models: readonly DroneModel[];
  initialModelId: ModelId;
  imageAvailability: ModelImageAvailability;
  heading: ReactNode;
};

export type { SpecsExplorerProps };
