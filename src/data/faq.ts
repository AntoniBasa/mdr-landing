import type { FaqItem } from "@/types/faq";

const faqItems: readonly FaqItem[] = [
  {
    id: "shipping-date",
    question: "When will pre-orders ship?",
    answer:
      "The first batches leave our warehouse in Q1 2027, in the order reservations were placed. You will get an email with a delivery window about two weeks before your drone ships.",
  },
  {
    id: "license",
    question: "Do I need a license to fly?",
    answer:
      "It depends on where you fly. At 249 g the Ultra Light falls below the registration threshold in many countries, while the Heavy and Superfast usually require registration and a basic online pilot test. Always check your local aviation rules before the first flight.",
  },
  {
    id: "box-contents",
    question: "What's in the box?",
    answer:
      "The drone, a remote controller, one intelligent battery, a USB-C fast charger, two sets of spare propellers, a gimbal guard and a soft carry case. Extra batteries and ND filters are sold separately.",
  },
  {
    id: "warranty",
    question: "Warranty?",
    answer:
      "Every MDR drone comes with a 24-month limited warranty covering manufacturing defects, including the battery and the controller. Crash damage is not covered, but repairs are offered at a fixed price.",
  },
  {
    id: "cancellation",
    question: "Can I cancel?",
    answer:
      "Yes. A reservation is free and you are not charged until your drone ships, so you can cancel at any time before that by replying to your confirmation email.",
  },
  {
    id: "international-shipping",
    question: "International shipping?",
    answer:
      "We ship worldwide with free express delivery. Import duties and local taxes, where they apply, are shown at checkout before you pay — there are no surprises at the door.",
  },
];

export { faqItems };
