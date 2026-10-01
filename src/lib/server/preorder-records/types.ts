import type { ModelId } from "@/types/models";

type PreorderRecord = {
  name: string;
  email: string;
  model: ModelId;
  quantity: number;
  comment: string | null;
};

export type { PreorderRecord };
