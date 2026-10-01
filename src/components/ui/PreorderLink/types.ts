import type { ButtonLinkProps } from "@/components/ui/ButtonLink/types";
import type { ModelId } from "@/types/models";

type PreorderLinkProps = Omit<ButtonLinkProps, "href"> & {
  modelId: ModelId;
};

export type { PreorderLinkProps };
