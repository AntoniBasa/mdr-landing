import type { JSX } from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import {
  compareModelsLink,
  CONTACT_EMAIL,
  COPYRIGHT_NOTICE,
  FOOTER_TAGLINE,
  footerLinkGroups,
} from "@/data/footer";
import { models } from "@/data/models";
import type { FooterLinkGroup } from "@/types/footer";
import type { DroneModel } from "@/types/models";
import type { NavigationLink } from "@/types/navigation";
import { FooterColumn } from "./FooterColumn";
import { footerLinkClassNames } from "./footer-link-class-names";
import { ModelPreorderLink } from "./ModelPreorderLink";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";

const renderModelItem = (model: DroneModel): JSX.Element => {
  return (
    <li key={model.id}>
      <ModelPreorderLink modelId={model.id}>{model.shortName}</ModelPreorderLink>
    </li>
  );
};

const renderLinkItem = (link: NavigationLink): JSX.Element => {
  return (
    <li key={link.label}>
      <a href={link.href} className={footerLinkClassNames}>
        {link.label}
      </a>
    </li>
  );
};

const renderLinkGroup = (linkGroup: FooterLinkGroup): JSX.Element => {
  return (
    <FooterColumn key={linkGroup.title} title={linkGroup.title}>
      {linkGroup.links.map(renderLinkItem)}
    </FooterColumn>
  );
};

const Footer = (): JSX.Element => {
  return (
    <footer id="footer" className="border-t border-glass">
      <Container className="py-16 md:py-20">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col items-start gap-6 lg:col-span-4">
            <Logo />
            <p className="max-w-xs text-nav text-muted">{FOOTER_TAGLINE}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className={footerLinkClassNames}>
              {CONTACT_EMAIL}
            </a>
            <NewsletterForm />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6"
          >
            <FooterColumn title="Products">
              {models.map(renderModelItem)}
              {renderLinkItem(compareModelsLink)}
            </FooterColumn>
            {footerLinkGroups.map(renderLinkGroup)}
          </nav>
        </Reveal>

        <div className="mt-16 flex flex-col-reverse items-start gap-6 border-t border-glass pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-button text-muted">{COPYRIGHT_NOTICE}</p>
          <SocialLinks />
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
