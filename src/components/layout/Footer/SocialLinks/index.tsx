import type { JSX } from "react";
import { AtSign, Camera, MessageCircle, SquarePlay, type LucideIcon } from "lucide-react";
import { socialLinks } from "@/data/footer";
import type { SocialIcon, SocialLink } from "@/types/footer";

const socialIcons: Record<SocialIcon, LucideIcon> = {
  photos: Camera,
  videos: SquarePlay,
  posts: AtSign,
  community: MessageCircle,
};

const renderSocialLink = (socialLink: SocialLink): JSX.Element => {
  const SocialIconComponent: LucideIcon = socialIcons[socialLink.icon];

  return (
    <li key={socialLink.href}>
      <a
        href={socialLink.href}
        target="_blank"
        rel="noreferrer"
        aria-label={socialLink.label}
        className="flex size-11 items-center justify-center rounded-pill border border-glass text-muted transition-colors duration-200 hover:border-subtle hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg"
      >
        <SocialIconComponent aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </a>
    </li>
  );
};

const SocialLinks = (): JSX.Element => {
  return <ul className="flex items-center gap-3">{socialLinks.map(renderSocialLink)}</ul>;
};

export { SocialLinks };
