import type { ReactNode } from "react";

type TestimonialSlide = {
  id: string;
  label: string;
  content: ReactNode;
};

type TestimonialsSliderProps = {
  slides: readonly TestimonialSlide[];
};

export type { TestimonialSlide, TestimonialsSliderProps };
