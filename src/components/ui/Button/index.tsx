import type { JSX } from "react";
import { getButtonClassNames } from "./button-class-names";
import type { ButtonProps } from "./types";

const Button = (props: ButtonProps): JSX.Element => {
  const { variant, className, type = "button", ...buttonProps } = props;

  return (
    <button type={type} className={getButtonClassNames(variant, className)} {...buttonProps} />
  );
};

export { Button };
