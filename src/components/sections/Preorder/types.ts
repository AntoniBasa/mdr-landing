import type { PreorderDelivery, PreorderInput } from "@/types/preorder";

type PreorderReceipt = PreorderInput & {
  id: string;
  delivery: PreorderDelivery;
};

export type { PreorderReceipt };
