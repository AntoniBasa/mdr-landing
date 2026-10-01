import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { SectionHeadingProps } from "./types";

const SectionHeading = (props: SectionHeadingProps): JSX.Element => {
  const { id, eyebrow, title, description, align = "start", className } = props;
  const isCentered: boolean = align === "center";
  const hasEyebrow: boolean = eyebrow !== undefined;
  const hasDescription: boolean = description !== undefined;

  return (
    <div
      className={mergeClassNames(
        "flex flex-col gap-4",
        isCentered && "items-center text-center",
        className,
      )}
    >
      {hasEyebrow && (
        <p className="text-button font-medium tracking-eyebrow text-muted uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="text-4xl leading-[1.15] font-light text-balance md:text-title">
        {title}
      </h2>
      {hasDescription && (
        <p className={mergeClassNames("max-w-md text-nav text-muted", isCentered && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
};

export { SectionHeading };
