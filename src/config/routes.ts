import { CATEGORIES, type CategorySlug } from "./categories";

/**
 * Route table. Never hard-code a path string in a component — use these
 * helpers so a route change happens in exactly one place.
 *
 *   /                         Home
 *   /video /design /development /games /art    Category pages
 *   /<category>/<slug>        Individual project case study
 *   /about  /contact          Static pages
 */
export const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  category: (category: CategorySlug) => `/${category}` as const,
  project: (category: CategorySlug, slug: string) =>
    `/${category}/${slug}` as const,
} as const;

/** Top-level slugs owned by static routes; categories must not collide. */
export const RESERVED_SLUGS = ["about", "contact"] as const;

export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation order. Consumed by the header, footer and sitemap. */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Home", href: routes.home },
  ...CATEGORIES.map((category) => ({
    label: category.label,
    href: routes.category(category.slug),
  })),
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];
