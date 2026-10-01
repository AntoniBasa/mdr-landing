import type { JSX } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Logo } from "@/components/ui/Logo";
import { mainNavigationLinks } from "@/data/navigation";
import type { NavigationLink } from "@/types/navigation";
import { MobileMenu } from "./MobileMenu";

const firstItemClassNames: string = "flex items-center";
const separatedItemClassNames: string =
  "flex items-center before:mx-5 before:h-5 before:w-px before:bg-subtle";

const Header = (): JSX.Element => {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="flex items-center justify-between px-4 pt-5 sm:px-6 md:pt-8 lg:pt-10 lg:pr-gutter lg:pl-[43px]">
        <div className="flex items-center gap-[74px]">
          <Logo />
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center text-nav font-medium">
              {mainNavigationLinks.map((link: NavigationLink, index: number): JSX.Element => (
                <li
                  key={link.href}
                  className={index === 0 ? firstItemClassNames : separatedItemClassNames}
                >
                  <a
                    href={link.href}
                    className="transition-colors hover:text-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ButtonLink href="#preorder" variant="accent" className="hidden sm:inline-flex">
            Buy now
          </ButtonLink>
          <MobileMenu links={mainNavigationLinks} />
        </div>
      </div>
    </header>
  );
};

export { Header };
