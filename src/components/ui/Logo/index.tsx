import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { LogoProps } from "./types";

const Logo = (props: LogoProps): JSX.Element => {
  const { className } = props;

  return (
    <a
      href="#top"
      aria-label="MDR — back to top"
      className={mergeClassNames(
        "text-lead font-extrabold tracking-logo text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg",
        className,
      )}
    >
      MDR
    </a>
  );
};

export { Logo };
