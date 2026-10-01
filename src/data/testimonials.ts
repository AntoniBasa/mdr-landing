import type { Testimonial } from "@/types/testimonials";

const testimonials: readonly Testimonial[] = [
  {
    id: "lena-marsh",
    name: "Lena Marsh",
    role: "Travel filmmaker",
    quote:
      "It fits in my jacket pocket and still holds steady in coastal wind. The 8K footage grades like it came off a cinema rig.",
    rating: 5,
  },
  {
    id: "tomas-reyes",
    name: "Tomas Reyes",
    role: "Aerial photographer",
    quote:
      "Forty minutes in the air changed how I plan shoots. I chase the light instead of chasing batteries.",
    rating: 5,
  },
  {
    id: "aiko-varga",
    name: "Aiko Varga",
    role: "Outdoor content creator",
    quote:
      "Setup takes seconds and the live feed never drops, even behind the ridge. It is the first drone I actually enjoy flying.",
    rating: 5,
  },
];

export { testimonials };
