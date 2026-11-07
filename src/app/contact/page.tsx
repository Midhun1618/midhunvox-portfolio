import { PagePlaceholder } from "@/components/shared/page-placeholder";
import { routes } from "@/config/routes";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Contact",
  path: routes.contact,
});

export default function ContactPage() {
  return <PagePlaceholder title="Contact" owner="contact module" />;
}
