import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import { formControlClassNames } from "@/components/ui/form/form-control-class-names";
import type { TextareaProps } from "./types";

const Textarea = (props: TextareaProps): JSX.Element => {
  const { className, ...textareaProps } = props;

  return (
    <textarea
      className={mergeClassNames(
        formControlClassNames,
        "min-h-28 resize-y rounded-card px-5 py-3",
        className,
      )}
      {...textareaProps}
    />
  );
};

export { Textarea };
