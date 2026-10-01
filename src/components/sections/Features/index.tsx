import type { JSX } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/data/features";
import type { Feature } from "@/types/features";
import { FeatureCard } from "./FeatureCard";

const CARD_STAGGER_SECONDS: number = 0.08;

const Features = (): JSX.Element => {
  return (
    <section id="features" aria-labelledby="features-title" className="py-24 md:py-32 lg:py-40">
      <Container>
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="features-title" eyebrow="Why MDR" title="Engineered for the sky" />
          <p className="max-w-sm text-nav text-muted lg:text-right">
            Every gram and every milliamp is tuned so the drone disappears and only the shot
            remains.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {features.map((feature: Feature, index: number): JSX.Element => (
            <Reveal key={feature.icon} as="li" delaySeconds={index * CARD_STAGGER_SECONDS}>
              <FeatureCard feature={feature} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export { Features };
