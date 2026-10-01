type FeatureIcon = "flight-time" | "range" | "camera" | "weight";

type Feature = {
  icon: FeatureIcon;
  value: number;
  suffix?: string;
  unit?: string;
  caption: string;
  description: string;
};

export type { FeatureIcon, Feature };
