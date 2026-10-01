import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { CardProps } from "./types";

const Card = (props: CardProps): JSX.Element => {
  const { className, ...divProps } = props;

  return (
    <div
      className={mergeClassNames(
        "rounded-card border border-glass bg-glass/40 p-6 transition-colors duration-300 hover:border-subtle lg:p-8",
        className,
      )}
      {...divProps}
    />
  );
};

export { Card };
