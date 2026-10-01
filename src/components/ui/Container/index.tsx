import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { ContainerProps } from "./types";

const Container = (props: ContainerProps): JSX.Element => {
  const { className, ...divProps } = props;

  return (
    <div
      className={mergeClassNames(
        "mx-auto w-full max-w-[calc(var(--container-page)+2*var(--spacing-gutter))] px-4 sm:px-6 lg:px-gutter",
        className,
      )}
      {...divProps}
    />
  );
};

export { Container };
