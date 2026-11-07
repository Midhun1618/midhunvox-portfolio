import { Container } from "@/components/ui/container";
import { getActiveSocialLinks, siteConfig } from "@/config/site";

/** TODO(footer module): structural placeholder. */
export function SiteFooter() {
  const socials = getActiveSocialLinks();
  return (
    <footer className="mt-auto border-t border-border">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-muted">
        <p>{siteConfig.name}</p>
        {socials.length > 0 && (
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((social) => (
              <li key={social.platform}>
                <a href={social.url} rel="noopener noreferrer" target="_blank">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  );
}
