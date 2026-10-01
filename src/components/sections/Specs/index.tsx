import type { JSX } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getModelImageAvailability, getModels } from "@/lib/models/models";
import type { ModelsResponse } from "@/types/models";
import { SpecsExplorer } from "./SpecsExplorer";

const Specs = async (): Promise<JSX.Element> => {
  const modelsResponse: ModelsResponse = await getModels();
  const { models, defaultModelId } = modelsResponse;

  return (
    <section id="specs" aria-labelledby="specs-title" className="py-24 md:py-32 lg:py-40">
      <Container>
        <SpecsExplorer
          models={models}
          initialModelId={defaultModelId}
          imageAvailability={getModelImageAvailability(models)}
          heading={
            <SectionHeading
              id="specs-title"
              eyebrow="Catalog"
              title="Choose your model"
              description="Three airframes, one flight stack. Compare the numbers and reserve the one that fits your shot."
            />
          }
        />
      </Container>
    </section>
  );
};

export { Specs };
