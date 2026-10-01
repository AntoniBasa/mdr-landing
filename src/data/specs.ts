import type { ModelSpecs } from "@/types/models";
import type { SpecRow } from "@/types/specs";

const integerFormatter: Intl.NumberFormat = new Intl.NumberFormat("en-US");

const usdFormatter: Intl.NumberFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatPrice = (priceUsd: number): string => {
  return usdFormatter.format(priceUsd);
};

const specRows: readonly SpecRow[] = [
  {
    key: "maxSpeedKmh",
    label: "Max speed",
    format: (specs: ModelSpecs): string => `${specs.maxSpeedKmh} km/h`,
  },
  {
    key: "flightTimeMin",
    label: "Flight time",
    format: (specs: ModelSpecs): string => `${specs.flightTimeMin} min`,
  },
  {
    key: "rangeKm",
    label: "Range",
    format: (specs: ModelSpecs): string => `${specs.rangeKm} km`,
  },
  {
    key: "camera",
    label: "Camera",
    format: (specs: ModelSpecs): string => specs.camera,
  },
  {
    key: "weightG",
    label: "Weight",
    format: (specs: ModelSpecs): string => `${integerFormatter.format(specs.weightG)} g`,
  },
  {
    key: "priceUsd",
    label: "Price",
    format: (specs: ModelSpecs): string => formatPrice(specs.priceUsd),
  },
];

export { formatPrice, specRows };
