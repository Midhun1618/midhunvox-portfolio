import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({ path: "/" });

export default function HomePage() {
  return (
    <PagePlaceholder
      title={siteConfig.name}
      description={siteConfig.person.tagline}
      owner="home module"
    />
  );
}
