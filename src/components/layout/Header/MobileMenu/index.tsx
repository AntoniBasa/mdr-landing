"use client";

import { useEffect, useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { NavigationLink } from "@/types/navigation";
import type { EffectCleanup } from "@/types/react";
import type { MobileMenuProps } from "./types";

const MobileMenu = (props: MobileMenuProps): JSX.Element => {
  const { links } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect((): EffectCleanup => {
    if (!isOpen) {
      return;
    }

    const previousOverflow: string = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return (): void => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  const toggleMenu = (): void => {
    setIsOpen((wasOpen: boolean): boolean => !wasOpen);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={toggleMenu}
        className="relative z-50 flex size-11 items-center justify-center rounded-pill border border-subtle text-fg focus-visible:outline-2 focus-visible:outline-fg"
      >
        {isOpen ? (
          <CloseIcon className="size-5" aria-hidden />
        ) : (
          <MenuIcon className="size-5" aria-hidden />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 px-4 pt-28 pb-10 backdrop-blur-md sm:px-6"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-6">
                {links.map((link: NavigationLink): JSX.Element => (
                  <li key={link.href}>
                    <a href={link.href} onClick={closeMenu} className="text-3xl font-medium">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <ButtonLink href="#preorder" onClick={closeMenu} className="mt-auto w-full">
              Buy now
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { MobileMenu };
