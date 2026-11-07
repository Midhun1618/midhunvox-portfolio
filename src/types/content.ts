import type { CategorySlug } from "@/config/categories";

/** A file served from /public (see public/assets/README.md). */
export interface AssetRef {
  /** Public URL, e.g. "/assets/development/<slug>/cover.webp". */
  src: string;
  /** Required alt text. Use "" only for purely decorative images. */
  alt: string;
  width?: number;
  height?: number;
}

export interface ExternalLink {
  label: string;
  url: string;
}

/**
 * - published:   listed, indexed, in the sitemap.
 * - placeholder: structural stand-in so routes can build; never listed,
 *                noindex, excluded from the sitemap. Remove once real
 *                projects exist.
 * - draft:       real work in progress; not built, not listed.
 */
export type ProjectStatus = "published" | "placeholder" | "draft";

export interface CaseStudySection {
  heading: string;
  body: string;
}

export interface Project {
  slug: string;
  category: CategorySlug;
  status: ProjectStatus;
  title: string;
  summary: string;
  year?: number;
  role?: string;
  tags?: readonly string[];
  tech?: readonly string[];
  cover?: AssetRef;
  gallery?: readonly AssetRef[];
  links?: readonly ExternalLink[];
  /** Surfaced on the home page. */
  featured?: boolean;
  /** Ascending sort order inside a category. Lower comes first. */
  order?: number;
  sections?: readonly CaseStudySection[];
}

export type SkillGroup = CategorySlug | "general";

export interface Skill {
  id: string;
  name: string;
  group: SkillGroup;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  /** ISO year-month, e.g. "2025-06". */
  start: string;
  /** ISO year-month, or null while ongoing. */
  end: string | null;
  location?: string;
  summary?: string;
  highlights?: readonly string[];
}
