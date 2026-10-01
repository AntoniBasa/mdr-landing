import type { JSX } from "react";
import { Card } from "@/components/ui/Card";
import { specRows } from "@/data/specs";
import type { SpecRow } from "@/types/specs";
import { mergeClassNames } from "@/lib/class-names/merge-class-names";
import type { DroneModel, ModelId } from "@/types/models";
import type { SpecsTableProps } from "./types";

const columnClassNames: string = "px-4 transition-colors duration-300 sm:px-6";
const activeColumnClassNames: string = "text-fg md:bg-glass/60";
const inactiveColumnClassNames: string = "hidden text-muted md:table-cell";

const SpecsTable = (props: SpecsTableProps): JSX.Element => {
  const { models, activeModelId, onSelect } = props;

  const getColumnClassNames = (modelId: ModelId): string => {
    if (modelId === activeModelId) {
      return mergeClassNames(columnClassNames, activeColumnClassNames);
    }

    return mergeClassNames(columnClassNames, inactiveColumnClassNames);
  };

  return (
    <Card className="overflow-hidden p-0 lg:p-0">
      <table className="h-full w-full table-fixed text-left">
        <caption className="sr-only">Technical specifications of MDR drones</caption>
        <thead>
          <tr>
            <th scope="col" className="w-2/5 px-4 py-5 sm:px-6 md:w-1/4">
              <span className="sr-only">Specification</span>
            </th>
            {models.map((model: DroneModel): JSX.Element => (
              <th
                key={model.id}
                scope="col"
                className={mergeClassNames(
                  getColumnClassNames(model.id),
                  "py-5 text-right text-nav font-medium md:text-left",
                )}
              >
                <button
                  type="button"
                  aria-pressed={model.id === activeModelId}
                  onClick={(): void => onSelect(model.id)}
                  className="rounded-thumb text-left transition-colors hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                >
                  {model.shortName}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specRows.map((specRow: SpecRow): JSX.Element => (
            <tr key={specRow.key} className="border-t border-glass">
              <th
                scope="row"
                className="px-4 py-4 text-button font-normal text-muted sm:px-6 lg:py-5"
              >
                {specRow.label}
              </th>
              {models.map((model: DroneModel): JSX.Element => (
                <td
                  key={model.id}
                  className={mergeClassNames(
                    getColumnClassNames(model.id),
                    "py-4 text-right text-nav tabular-nums md:text-left lg:py-5",
                    specRow.key === "priceUsd" && "font-medium",
                  )}
                >
                  {specRow.format(model.specs)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export { SpecsTable };
