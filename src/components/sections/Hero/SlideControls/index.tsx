import type { JSX } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { SlideControlsProps } from "./types";
import styles from "./styles.module.scss";

const controlClassNames: string =
  "flex size-(--control-size) items-center justify-center rounded-pill bg-control text-bg transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg motion-reduce:transition-none";

const SlideControls = (props: SlideControlsProps): JSX.Element => {
  const { onPreviousSlide, onNextSlide } = props;

  return (
    <div className={mergeClassNames("z-10 flex", styles.controls)}>
      <button
        type="button"
        aria-label="Previous model"
        onClick={onPreviousSlide}
        className={controlClassNames}
      >
        <ArrowLeft className="size-5 md:size-6" strokeWidth={1.75} aria-hidden />
      </button>
      <button
        type="button"
        aria-label="Next model"
        onClick={onNextSlide}
        className={controlClassNames}
      >
        <ArrowRight className="size-5 md:size-6" strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
};

export { SlideControls };
