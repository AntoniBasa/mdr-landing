"use client";

import type { JSX, MouseEvent } from "react";
import { getPreorderHref, selectPreorderModel } from "@/lib/preorder-selection/preorder-selection";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { PreorderLinkProps } from "./types";

const PreorderLink = (props: PreorderLinkProps): JSX.Element => {
  const { modelId, onClick, ...buttonLinkProps } = props;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (onClick !== undefined) {
      onClick(event);
    }

    const isModifiedClick: boolean = event.metaKey || event.ctrlKey || event.shiftKey;

    if (event.defaultPrevented || isModifiedClick) {
      return;
    }

    event.preventDefault();
    selectPreorderModel(modelId);
  };

  return <ButtonLink href={getPreorderHref(modelId)} onClick={handleClick} {...buttonLinkProps} />;
};

export { PreorderLink };
