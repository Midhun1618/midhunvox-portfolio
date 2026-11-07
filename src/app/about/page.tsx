import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { routes } from "@/config/routes";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  path: routes.about,
});

export default function AboutPage() {
  return <PagePlaceholder title="About" owner="about module" />;
}
