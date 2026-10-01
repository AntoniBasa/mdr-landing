import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/server/site-url/site-url";

const createRobots = (): MetadataRoute.Robots => {
  const sitemapUrl: URL = new URL("/sitemap.xml", getSiteUrl());

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: sitemapUrl.toString(),
  };
};

export default createRobots;
