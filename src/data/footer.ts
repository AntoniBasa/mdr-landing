import type { FooterLinkGroup, SocialLink } from "@/types/footer";
import type { NavigationLink } from "@/types/navigation";

const CONTACT_EMAIL: string = "hello@mdr.example";

const FOOTER_TAGLINE: string =
  "Premium drones for creators who want the sky without compromise.";

const COPYRIGHT_NOTICE: string = "© 2026 MDR. All rights reserved.";

const compareModelsLink: NavigationLink = { label: "Compare models", href: "#specs" };

const footerLinkGroups: readonly FooterLinkGroup[] = [
  {
    title: "Company",
    links: [
      { label: "Why MDR", href: "#features" },
      { label: "Reviews", href: "#testimonials" },
      { label: "Pre-order", href: "#preorder" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Shipping", href: "#faq" },
      { label: "Warranty", href: "#faq" },
      { label: "Contact us", href: `mailto:${CONTACT_EMAIL}` },
    ],
  },
];

const socialLinks: readonly SocialLink[] = [
  { label: "MDR on Instagram", href: "https://www.instagram.com/", icon: "photos" },
  { label: "MDR on YouTube", href: "https://www.youtube.com/", icon: "videos" },
  { label: "MDR on X", href: "https://x.com/", icon: "posts" },
  { label: "MDR on Discord", href: "https://discord.com/", icon: "community" },
];

export {
  CONTACT_EMAIL,
  FOOTER_TAGLINE,
  COPYRIGHT_NOTICE,
  compareModelsLink,
  footerLinkGroups,
  socialLinks,
};
