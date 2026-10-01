import type { JSX } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { TestimonialsSlider } from "./TestimonialsSlider";
import type { TestimonialSlide } from "./TestimonialsSlider/types";

const createTestimonialSlide = (testimonial: Testimonial): TestimonialSlide => {
  return {
    id: testimonial.id,
    label: testimonial.name,
    content: <TestimonialCard testimonial={testimonial} />,
  };
};

const Testimonials = (): JSX.Element => {
  const slides: TestimonialSlide[] = testimonials.map(createTestimonialSlide);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="py-24 md:py-32 lg:py-40"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow="Reviews"
            title="Loved by creators"
            description="Filmmakers, photographers and weekend explorers on what changed once MDR joined their kit."
          />
        </Reveal>

        <Reveal delaySeconds={0.1} className="mt-12 lg:mt-16">
          <TestimonialsSlider slides={slides} />
        </Reveal>
      </Container>
    </section>
  );
};

export { Testimonials };
