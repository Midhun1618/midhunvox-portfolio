export type SocialPlatform =
  | "github"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "behance"
  | "artstation"
  | "itch"
  | "x";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** null = not provided yet; such entries are never rendered. */
  url: string | null;
  handle?: string;
}

export interface PersonConfig {
  /** Short display name used in headings. */
  displayName: string;
  /** Brand handle. */
  handle: string;
  /** TODO until the owner supplies it. */
  fullName: string;
  role: string;
  tagline: string;
  location: string;
  /** null = not provided yet; the contact module must handle that. */
  email: string | null;
}

export interface SiteConfig {
  name: string;
  description: string;
  /** Canonical origin, no trailing slash. */
  url: string;
  locale: string;
  person: PersonConfig;
  socials: readonly SocialLink[];
}
