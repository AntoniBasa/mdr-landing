import type { ModelSpecs } from "@/types/models";

type SpecRow = {
  key: keyof ModelSpecs;
  label: string;
  format: (specs: ModelSpecs) => string;
};

export type { SpecRow };
