import type { SiteConfig, SocialLink } from "@/types/site";

/**
 * Central configuration for personal information and social links.
 * Edit values here only — no component should contain personal details.
 *
 * Anything marked TODO has not been supplied yet and must not be invented.
 */
export const siteConfig: SiteConfig = {
  name: "midhunvox",
  // TODO: write the real site description (used for SEO and social cards).
  description: "TODO: add the site description.",
  // Set NEXT_PUBLIC_SITE_URL in production (see .env.example).
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    "",
  ),
  locale: "en",
  person: {
    displayName: "Midhun",
    handle: "midhunvox",
    fullName: "TODO: full name",
    role: "TODO: role / headline",
    tagline: "TODO: tagline",
    location: "TODO: location",
    email: null, // TODO: public contact email
  },
  socials: [
    {
      platform: "github",
      label: "GitHub",
      url: "https://github.com/Midhun1618",
      handle: "Midhun1618",
    },
    // TODO: add the URLs below once confirmed. `null` entries are not rendered.
    { platform: "linkedin", label: "LinkedIn", url: null },
    { platform: "youtube", label: "YouTube", url: null },
    { platform: "instagram", label: "Instagram", url: null },
    { platform: "behance", label: "Behance", url: null },
    { platform: "artstation", label: "ArtStation", url: null },
    { platform: "itch", label: "itch.io", url: null },
    { platform: "x", label: "X", url: null },
  ],
};

export type ActiveSocialLink = SocialLink & { url: string };

/** Social links that actually have a URL. */
export function getActiveSocialLinks(): ActiveSocialLink[] {
  return siteConfig.socials.filter(
    (link): link is ActiveSocialLink => link.url !== null,
  );
}
