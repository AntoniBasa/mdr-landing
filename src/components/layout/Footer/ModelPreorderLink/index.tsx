"use client";

import type { JSX, MouseEvent } from "react";
import { footerLinkClassNames } from "@/components/layout/Footer/footer-link-class-names";
import { getPreorderHref, selectPreorderModel } from "@/lib/preorder-selection/preorder-selection";
import type { ModelPreorderLinkProps } from "./types";

const ModelPreorderLink = (props: ModelPreorderLinkProps): JSX.Element => {
  const { modelId, children } = props;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    const isModifiedClick: boolean = event.metaKey || event.ctrlKey || event.shiftKey;

    if (isModifiedClick) {
      return;
    }

    event.preventDefault();
    selectPreorderModel(modelId);
  };

  return (
    <a href={getPreorderHref(modelId)} onClick={handleClick} className={footerLinkClassNames}>
      {children}
    </a>
  );
};

export { ModelPreorderLink };
