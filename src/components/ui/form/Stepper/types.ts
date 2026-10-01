import type { ComponentProps } from "react";

type StepperInputProps = Omit<
  ComponentProps<"input">,
  "value" | "onChange" | "min" | "max" | "type"
>;

type StepperProps = StepperInputProps & {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  label: string;
};

export type { StepperInputProps, StepperProps };
