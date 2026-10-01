import type { JSX } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getModels } from "@/lib/models/models";
import { PREORDER_ANCHOR } from "@/lib/preorder-selection/preorder-selection";
import type { ModelsResponse } from "@/types/models";
import { PreorderForm } from "./PreorderForm";

const perks: readonly string[] = [
  "No charge until your drone ships",
  "Cancel anytime before shipping",
  "Free express delivery worldwide",
];

const IMAGE_SOURCE: string =
  "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1600&q=80";

const Preorder = async (): Promise<JSX.Element> => {
  const modelsResponse: ModelsResponse = await getModels();
  const { models, defaultModelId } = modelsResponse;

  return (
    <section
      id={PREORDER_ANCHOR}
      aria-labelledby="preorder-title"
      className="py-24 md:py-32 lg:py-40"
    >
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:gap-16 xl:gap-24">
        <Reveal className="flex flex-col">
          <SectionHeading
            id="preorder-title"
            eyebrow="Pre-order"
            title="Reserve your MDR"
            description="First batches ship in Q1 2027. Reserve yours today and lock in launch pricing — it takes less than a minute."
          />

          <ul className="mt-8 flex flex-col gap-3 text-nav">
            {perks.map((perk: string): JSX.Element => (
              <li key={perk} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-pill border border-subtle">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={2} />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-card border border-glass sm:aspect-[16/9] lg:mt-12 lg:aspect-auto lg:min-h-80 lg:flex-1">
            <Image
              src={IMAGE_SOURCE}
              alt="White quadcopter hovering at dusk"
              fill
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent"
            />
          </div>
        </Reveal>

        <Reveal delaySeconds={0.1}>
          <Card className="p-6 sm:p-8 lg:p-10 hover:border-glass">
            <PreorderForm models={models} defaultModelId={defaultModelId} />
          </Card>
        </Reveal>
      </Container>
    </section>
  );
};

export { Preorder };
