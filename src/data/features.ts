import type { Feature } from "@/types/features";
import type { ModelSpecs } from "@/types/models";
import { findModelById } from "./models";

const flagshipSpecs: ModelSpecs = findModelById("ultra-light").specs;

const features: readonly Feature[] = [
  {
    icon: "flight-time",
    value: flagshipSpecs.flightTimeMin,
    unit: "min",
    caption: "Flight time",
    description: "High-density cells keep you airborne through the whole golden hour.",
  },
  {
    icon: "range",
    value: flagshipSpecs.rangeKm,
    unit: "km",
    caption: "Range",
    description: "Tri-band transmission with a stable 1080p live feed at full distance.",
  },
  {
    icon: "camera",
    value: 8,
    suffix: "K",
    caption: "Camera",
    description: "Stabilised 8K sensor with 10-bit colour for cinema-grade footage.",
  },
  {
    icon: "weight",
    value: flagshipSpecs.weightG,
    unit: "g",
    caption: "Weight",
    description: "Under the 250 g class — fold it, pocket it, fly it almost anywhere.",
  },
];

export { features };
