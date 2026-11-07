import type { Project } from "@/types/content";

/**
 * Project content. One entry per case study.
 *
 * Do not invent project details. Add real entries with `status: "published"`
 * once the owner supplies the information and assets.
 *
 * The single `placeholder` entry below exists only so the dynamic
 * `/<category>/<slug>` route has at least one static param (a Cache Components
 * requirement). It is never listed, is noindex, and is not in the sitemap.
 * Delete it once at least one real project is published.
 */
export const projects: readonly Project[] = [
  {
    slug: "placeholder-project",
    category: "development",
    status: "placeholder",
    title: "TODO: Project title",
    summary: "TODO: project summary.",
    // TODO: cover image -> public/assets/development/placeholder-project/cover.webp
    sections: [
      {
        heading: "TODO: Overview",
        body: "TODO: case study content.",
      },
    ],
  },
];
