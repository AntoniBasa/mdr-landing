import type { JSX } from "react";
import { getButtonClassNames } from "@/components/ui/Button/button-class-names";
import type { ButtonLinkProps } from "./types";

const ButtonLink = (props: ButtonLinkProps): JSX.Element => {
  const { variant, className, ...anchorProps } = props;

  return <a className={getButtonClassNames(variant, className)} {...anchorProps} />;
};

export { ButtonLink };
