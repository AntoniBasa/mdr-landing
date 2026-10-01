import type { JSX } from "react";
import { Accordion } from "@/components/ui/Accordion";
import type { AccordionItem } from "@/components/ui/Accordion/types";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";
import type { FaqItem } from "@/types/faq";

const createAccordionItem = (faqItem: FaqItem): AccordionItem => {
  return {
    id: faqItem.id,
    title: faqItem.question,
    content: <p>{faqItem.answer}</p>,
  };
};

const Faq = (): JSX.Element => {
  const accordionItems: AccordionItem[] = faqItems.map(createAccordionItem);
  const firstItemId: string = faqItems[0].id;

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 md:py-32 lg:py-40">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="flex flex-col items-start lg:col-span-4">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Everything you need to know before you reserve. Can't find your answer? We reply within one business day."
          />
          <ButtonLink href="#footer" variant="outline" className="mt-8">
            Contact us
          </ButtonLink>
        </Reveal>

        <Reveal delaySeconds={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={accordionItems} idPrefix="faq" defaultOpenItemId={firstItemId} />
        </Reveal>
      </Container>
    </section>
  );
};

export { Faq };
