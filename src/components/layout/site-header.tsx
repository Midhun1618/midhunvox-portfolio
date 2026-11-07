import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { NAV_ITEMS, routes } from "@/config/routes";

/**
 * TODO(navigation module): structural placeholder only — plain, unstyled
 * links so every route is reachable. Replace with the real navigation.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href={routes.home} className="font-semibold">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
