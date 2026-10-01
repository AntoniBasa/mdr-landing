import type { JSX } from "react";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { DroneModel } from "@/types/models";
import type { ModelListProps } from "./types";

const ModelList = (props: ModelListProps): JSX.Element => {
  const { models, activeIndex, onSelect } = props;

  return (
    <ul className="flex flex-col gap-2.5" aria-label="Drone models">
      {models.map((model: DroneModel, index: number): JSX.Element => {
        const isActive: boolean = index === activeIndex;

        return (
          <li key={model.id}>
            <button
              type="button"
              aria-current={isActive ? "true" : undefined}
              onClick={(): void => onSelect(index)}
              className={mergeClassNames(
                "group flex items-center gap-[14px] font-medium whitespace-nowrap transition-[color,font-size] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg",
                isActive
                  ? "text-xl text-fg md:text-2xl"
                  : "text-button text-subtle hover:text-muted md:text-nav",
              )}
            >
              <span
                aria-hidden
                className={mergeClassNames(
                  "w-px transition-[height,background-color] duration-300",
                  isActive ? "h-5 bg-fg md:h-6" : "h-4 bg-subtle group-hover:bg-muted",
                )}
              />
              {model.name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export { ModelList };
