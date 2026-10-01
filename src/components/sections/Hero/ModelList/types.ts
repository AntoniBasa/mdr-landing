import type { DroneModel } from "@/types/models";

type ModelListProps = {
  models: readonly DroneModel[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export type { ModelListProps };
