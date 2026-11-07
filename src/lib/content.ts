import type { CategorySlug } from "@/config/categories";
import { experiences } from "@/content/experiences";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import type { Experience, Project, Skill } from "@/types/content";

/**
 * Typed read access to content. Pages and components import from here, never
 * from `@/content/*` directly, so visibility rules live in one place.
 */

const byOrder = (a: Project, b: Project) =>
  (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER);

/** Published projects only (what visitors may see listed). */
export function getProjects(): Project[] {
  return projects.filter((p) => p.status === "published").sort(byOrder);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectsByCategory(category: CategorySlug): Project[] {
  return getProjects().filter((p) => p.category === category);
}

/**
 * Look up a project for its case-study page. Includes placeholders (so the
 * route can build) but never drafts.
 */
export function getProject(
  category: string,
  slug: string,
): Project | undefined {
  return projects.find(
    (p) =>
      p.category === category && p.slug === slug && p.status !== "draft",
  );
}

/** Params for `generateStaticParams` on `/[category]/[slug]`. */
export function getProjectStaticParams(): { category: string; slug: string }[] {
  return projects
    .filter((p) => p.status !== "draft")
    .map(({ category, slug }) => ({ category, slug }));
}

export function getSkills(): readonly Skill[] {
  return skills;
}

export function getExperiences(): Experience[] {
  // Most recent first.
  return [...experiences].sort((a, b) => b.start.localeCompare(a.start));
}
