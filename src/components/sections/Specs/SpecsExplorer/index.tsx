"use client";

import { useState, type JSX } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { getTabId, getTabPanelId } from "@/components/ui/Tabs/tab-ids";
import { Tabs } from "@/components/ui/Tabs";
import type { TabItem } from "@/components/ui/Tabs/types";
import { findModelInList } from "@/data/models";
import type { DroneModel, ModelId } from "@/types/models";
import { ModelPreview } from "@/components/sections/Specs/ModelPreview";
import { SpecsTable } from "@/components/sections/Specs/SpecsTable";
import type { SpecsExplorerProps } from "./types";

const TAB_ID_PREFIX: string = "specs-model";

const SpecsExplorer = (props: SpecsExplorerProps): JSX.Element => {
  const { models, initialModelId, imageAvailability, heading } = props;
  const [activeModelId, setActiveModelId] = useState<ModelId>(initialModelId);
  const activeModel: DroneModel = findModelInList(models, activeModelId);
  const tabItems: TabItem<ModelId>[] = models.map((model: DroneModel): TabItem<ModelId> => {
    return { value: model.id, label: model.shortName };
  });

  return (
    <>
      <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        {heading}
        <Tabs
          items={tabItems}
          value={activeModel.id}
          onChange={setActiveModelId}
          label="Drone models"
          idPrefix={TAB_ID_PREFIX}
          className="flex w-full sm:inline-flex sm:w-auto sm:self-start lg:self-auto"
        />
      </Reveal>

      <Reveal delaySeconds={0.1} className="mt-8 lg:mt-12">
        <div
          id={getTabPanelId(TAB_ID_PREFIX)}
          role="tabpanel"
          aria-labelledby={getTabId(TAB_ID_PREFIX, activeModel.id)}
          className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-5"
        >
          <ModelPreview model={activeModel} hasImage={imageAvailability[activeModel.id]} />
          <SpecsTable models={models} activeModelId={activeModel.id} onSelect={setActiveModelId} />
        </div>
      </Reveal>
    </>
  );
};

export { SpecsExplorer };
