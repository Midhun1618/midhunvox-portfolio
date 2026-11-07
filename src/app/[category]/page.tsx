import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { CATEGORIES, getCategory } from "@/config/categories";
import { routes } from "@/config/routes";
import { getProjectsByCategory } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return createMetadata({
    title: category.label,
    description: category.description,
    path: routes.category(category.slug),
  });
}

export default async function CategoryPage({
  params,
}: PageProps<"/[category]">) {
  const category = getCategory((await params).category);
  if (!category) notFound();

  const projects = getProjectsByCategory(category.slug);

  return (
    <PagePlaceholder
      title={category.label}
      description={category.description}
      owner={`${category.slug} listing module`}
    >
      {projects.length > 0 && (
        <ul className="mt-8 space-y-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={routes.project(project.category, project.slug)}>
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PagePlaceholder>
  );
}
