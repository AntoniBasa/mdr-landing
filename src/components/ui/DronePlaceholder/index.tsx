import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { DronePlaceholderProps } from "./types";
import styles from "./styles.module.scss";

const DronePlaceholder = (props: DronePlaceholderProps): JSX.Element => {
  const { model, titleClassName, className } = props;

  return (
    <div
      className={mergeClassNames(
        "absolute inset-0 flex flex-col items-center justify-center",
        styles.glow,
        className,
      )}
    >
      <span
        className={mergeClassNames(
          "leading-none font-extrabold tracking-logo",
          styles.title,
          titleClassName,
        )}
      >
        {model.titleAccent}
      </span>
    </div>
  );
};

export { DronePlaceholder };
