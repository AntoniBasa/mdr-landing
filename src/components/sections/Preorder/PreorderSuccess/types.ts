import type { PreorderReceipt } from "@/components/sections/Preorder/types";
import type { DroneModel } from "@/types/models";

type PreorderSuccessProps = {
  receipt: PreorderReceipt;
  models: readonly DroneModel[];
  onReset: () => void;
};

export type { PreorderSuccessProps };
