import type { JSX } from "react";
import { ChevronDown } from "lucide-react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import { formControlClassNames } from "@/components/ui/form/form-control-class-names";
import type { SelectProps } from "./types";
import styles from "./styles.module.scss";

const Select = (props: SelectProps): JSX.Element => {
  const { className, ...selectProps } = props;

  return (
    <div className="relative">
      <select
        className={mergeClassNames(
          formControlClassNames,
          "min-h-12 cursor-pointer appearance-none rounded-pill pr-12 pl-5",
          styles.select,
          className,
        )}
        {...selectProps}
      />
      <ChevronDown
        aria-hidden="true"
        strokeWidth={1.5}
        className="pointer-events-none absolute top-1/2 right-5 size-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
};

export { Select };
