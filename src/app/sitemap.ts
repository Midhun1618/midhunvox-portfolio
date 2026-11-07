import type { MetadataRoute } from "next";
import { NAV_ITEMS, routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...NAV_ITEMS.map((item) => item.href),
    // Published only: placeholders and drafts are excluded.
    ...getProjects().map((p) => routes.project(p.category, p.slug)),
  ];
  return paths.map((path) => ({ url: `${siteConfig.url}${path}` }));
}
