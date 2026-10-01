import type { JSX } from "react";
import { Camera, Feather, RadioTower, Timer, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CountUp } from "@/components/ui/CountUp";
import type { Feature, FeatureIcon } from "@/types/features";
import type { FeatureCardProps } from "./types";

const featureIcons: Record<FeatureIcon, LucideIcon> = {
  "flight-time": Timer,
  range: RadioTower,
  camera: Camera,
  weight: Feather,
};

const formatFeatureLabel = (feature: Feature): string => {
  const valueWithSuffix: string = `${feature.value}${feature.suffix ?? ""}`;

  if (feature.unit === undefined) {
    return valueWithSuffix;
  }

  return `${valueWithSuffix} ${feature.unit}`;
};

const FeatureCard = (props: FeatureCardProps): JSX.Element => {
  const { feature } = props;
  const FeatureIconComponent: LucideIcon = featureIcons[feature.icon];
  const hasUnit: boolean = feature.unit !== undefined;

  return (
    <Card className="flex h-full flex-col">
      <span className="flex size-12 items-center justify-center rounded-pill border border-glass">
        <FeatureIconComponent aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </span>

      <p className="mt-8 flex items-baseline gap-1.5 lg:mt-16">
        <span className="sr-only">{formatFeatureLabel(feature)}</span>
        <span aria-hidden="true" className="text-5xl leading-none font-light lg:text-stat">
          <CountUp value={feature.value} />
          {feature.suffix}
        </span>
        {hasUnit && (
          <span aria-hidden="true" className="text-lead text-muted">
            {feature.unit}
          </span>
        )}
      </p>

      <h3 className="mt-4 text-nav font-medium">{feature.caption}</h3>
      <p className="mt-2 text-button text-muted">{feature.description}</p>
    </Card>
  );
};

export { FeatureCard };
