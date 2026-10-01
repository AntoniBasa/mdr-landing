import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/server/site-url/site-url";

const createSitemap = (): MetadataRoute.Sitemap => {
  const homePageUrl: string = getSiteUrl().toString();

  return [{ url: homePageUrl, changeFrequency: "monthly", priority: 1 }];
};

export default createSitemap;
