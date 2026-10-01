import type { NavigationLink } from "@/types/navigation";

const mainNavigationLinks: readonly NavigationLink[] = [
  { label: "Catalog", href: "#specs" },
  { label: "About", href: "#features" },
  { label: "Contacts", href: "#footer" },
];

const heroGalleryThumbnails: readonly string[] = [
  "/hero/thumb-1.jpg",
  "/hero/thumb-2.jpg",
];

export { mainNavigationLinks, heroGalleryThumbnails };
