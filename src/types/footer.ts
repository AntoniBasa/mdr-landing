import type { NavigationLink } from "@/types/navigation";

type FooterLinkGroup = {
  title: string;
  links: readonly NavigationLink[];
};

type SocialIcon = "photos" | "videos" | "posts" | "community";

type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
};

export type { FooterLinkGroup, SocialIcon, SocialLink };
