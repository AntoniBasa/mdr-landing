import type { JSX } from "react";
import { CircleAlert } from "lucide-react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import { getFieldErrorId, getFieldHintId } from "./field-ids";
import type { FieldProps } from "./types";

const Field = (props: FieldProps): JSX.Element => {
  const { id, label, error, hint, optional = false, className, children } = props;
  const hasHint: boolean = hint !== undefined;
  const hasError: boolean = error !== undefined;

  return (
    <div className={mergeClassNames("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-button font-medium">
          {label}
          {optional && <span className="font-normal text-muted"> (optional)</span>}
        </label>
        {hasHint && (
          <span id={getFieldHintId(id)} className="text-button text-muted tabular-nums">
            {hint}
          </span>
        )}
      </div>
      {children}
      {hasError && (
        <p id={getFieldErrorId(id)} className="flex items-center gap-1.5 text-button text-fg">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.75} />
          {error}
        </p>
      )}
    </div>
  );
};

export { Field };
