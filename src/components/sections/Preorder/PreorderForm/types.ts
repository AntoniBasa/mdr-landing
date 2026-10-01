import type { ControllerRenderProps } from "react-hook-form";
import type { DroneModel, ModelId } from "@/types/models";
import type { PreorderInput } from "@/types/preorder";

type PreorderFormProps = {
  models: readonly DroneModel[];
  defaultModelId: ModelId;
};

type QuantityFieldRenderProps = {
  field: ControllerRenderProps<PreorderInput, "quantity">;
};

export type { PreorderFormProps, QuantityFieldRenderProps };
