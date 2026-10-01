import type * as zod from "zod";
import type { preorderSchema } from "@/lib/validation/preorder";
import type { ModelId } from "@/types/models";

type PreorderInput = zod.infer<typeof preorderSchema>;

type PreorderField = keyof PreorderInput;

type PreorderFieldErrors = Partial<Record<PreorderField, string>>;

type PreorderSuccessResponse = {
  ok: true;
  id: string;
};

type PreorderFailureResponse = {
  ok: false;
  error: string;
  fieldErrors?: PreorderFieldErrors;
};

type PreorderResponse = PreorderSuccessResponse | PreorderFailureResponse;

type PreorderConfirmation = {
  id: string;
  name: string;
  email: string;
  model: ModelId;
  quantity: number;
};

export type {
  PreorderInput,
  PreorderField,
  PreorderFieldErrors,
  PreorderSuccessResponse,
  PreorderFailureResponse,
  PreorderResponse,
  PreorderConfirmation,
};
