import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import { formControlClassNames } from "@/components/ui/form/form-control-class-names";
import type { InputProps } from "./types";

const Input = (props: InputProps): JSX.Element => {
  const { className, ...inputProps } = props;

  return (
    <input
      className={mergeClassNames(formControlClassNames, "min-h-12 rounded-pill px-5", className)}
      {...inputProps}
    />
  );
};

export { Input };
