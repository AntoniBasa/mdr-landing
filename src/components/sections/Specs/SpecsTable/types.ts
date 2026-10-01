import type { DroneModel, ModelId } from "@/types/models";

type SpecsTableProps = {
  models: readonly DroneModel[];
  activeModelId: ModelId;
  onSelect: (modelId: ModelId) => void;
};

export type { SpecsTableProps };
