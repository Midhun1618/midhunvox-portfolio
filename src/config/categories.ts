/**
 * Portfolio categories. This is the single source of truth for every
 * category-level route (/video, /design, /development, /games, /art) and for
 * the case-study routes nested under them (/<category>/<slug>).
 *
 * To add a category: add an entry here. Routing, static params, navigation,
 * sitemap and content typing all derive from this list.
 *
 * NOTE: a category slug must never equal a top-level static route
 * ("about", "contact") — see `RESERVED_SLUGS` in `routes.ts`.
 */
export const CATEGORIES = [
  {
    slug: "video",
    label: "Video",
    // TODO: write the real category description.
    description: "TODO: describe the video work.",
  },
  {
    slug: "design",
    label: "Design",
    description: "TODO: describe the design work.",
  },
  {
    slug: "development",
    label: "Development",
    description: "TODO: describe the development work.",
  },
  {
    slug: "games",
    label: "Games",
    description: "TODO: describe the games work.",
  },
  {
    slug: "art",
    label: "Art",
    description: "TODO: describe the art work.",
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategorySlug = Category["slug"];

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORIES.some((category) => category.slug === value);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
