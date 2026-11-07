import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataInput {
  title?: string;
  description?: string;
  /** Path starting with "/", used for the canonical URL. */
  path: string;
  /** Keep out of search indexes (placeholders, drafts). */
  noIndex?: boolean;
}

/** Build per-page metadata that inherits the root title template. */
export function createMetadata({
  title,
  description = siteConfig.description,
  path,
  noIndex = false,
}: PageMetadataInput): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: title ?? siteConfig.name,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
