import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { routes } from "@/config/routes";
import { getProject, getProjectStaticParams } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getProjectStaticParams();
}

export async function generateMetadata({
  params,
}: PageProps<"/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const project = getProject(category, slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.summary,
    path: routes.project(project.category, project.slug),
    noIndex: project.status !== "published",
  });
}

export default async function ProjectPage({
  params,
}: PageProps<"/[category]/[slug]">) {
  const { category, slug } = await params;
  const project = getProject(category, slug);
  if (!project) notFound();

  return (
    <PagePlaceholder
      title={project.title}
      description={project.summary}
      owner="case study module"
    />
  );
}
