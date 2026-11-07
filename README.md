# midhunvox — portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis · Framer Motion

This repository currently holds the **architecture foundation (module M01)**:
structure, typed content, routing, configuration and animation infrastructure.
There is no visual design yet — pages are labelled placeholders for later
modules. Read [`AGENTS.md`](./AGENTS.md): this Next.js version (16.x, Cache
Components enabled) differs from older releases; consult
`node_modules/next/dist/docs/` before using framework APIs.

## Commands

| Command             | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Dev server                                      |
| `npm run build`     | Production build (static output where possible) |
| `npm run start`     | Serve the production build                      |
| `npm run lint`      | ESLint                                          |
| `npm run typecheck` | Generate route types, then `tsc --noEmit`       |

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for
production. `next/font/google` downloads fonts at build time, so the build
needs internet access (or swap to `next/font/local`).

## Folder structure

```
src/
├── app/                     Routes only (thin pages) + sitemap/robots
│   ├── layout.tsx           Root shell: providers, header, <main>, footer
│   ├── page.tsx             /
│   ├── about/  contact/     Static pages
│   └── [category]/          /video /design /development /games /art
│       └── [slug]/          /<category>/<slug>  project case study
├── config/
│   ├── site.ts              ★ Personal info + social links (single source)
│   ├── categories.ts        ★ Category list (drives routes, nav, types)
│   └── routes.ts            Route helpers + primary nav
├── content/                 Typed data: projects, skills, experiences
├── types/                   Shared types (content.ts, site.ts)
├── lib/                     content.ts (read API), seo.ts, cn.ts
├── hooks/                   use-gsap, use-prefers-reduced-motion, ...
├── animations/              gsap.ts (plugin registration), tokens.ts
└── components/
    ├── ui/                  Primitives (Container, ...)
    ├── layout/              Header, footer
    ├── shared/              Reusable cross-page pieces
    ├── sections/            Page sections (one folder per page area)
    ├── motion/              Reusable animated wrappers
    └── providers/           Client providers (Lenis, Framer MotionConfig)
public/assets/               Media — see public/assets/README.md
```

Dependency direction: `app → components → hooks/animations/lib → config/types`.
`config` and `types` import nothing from the layers above them.

## Routing

| Route                 | File                           |
| --------------------- | ------------------------------ |
| `/`                   | `app/page.tsx`                 |
| `/video` `/design` `/development` `/games` `/art` | `app/[category]/page.tsx` |
| `/<category>/<slug>`  | `app/[category]/[slug]/page.tsx` |
| `/about` `/contact`   | `app/about`, `app/contact`     |

- Categories come from `config/categories.ts`; add one entry and the route,
  nav, sitemap and types follow. A category slug must not equal `about` or
  `contact` (`RESERVED_SLUGS`).
- Never hard-code paths: use `routes.*` from `config/routes.ts`.
- Static generation: `generateStaticParams` returns every category and every
  non-draft project. **Cache Components requires at least one param**, which is
  why a single `placeholder` project exists (never listed, `noindex`, not in the
  sitemap). Delete it once a real project is published.
- Unknown categories/slugs call `notFound()` (`dynamicParams` is not supported
  under Cache Components).

## Content architecture

All content is typed (`types/content.ts`) and lives in `content/`. Components
read it only through `lib/content.ts`, which owns visibility rules:

- `published` — listed, indexed, in sitemap
- `placeholder` — builds, but unlisted/noindex (structural stand-in)
- `draft` — not built, not listed

Skills and experiences are intentionally empty; **no portfolio content is
invented**. Missing information is marked `TODO` in the source.

## Configuration

`config/site.ts` holds name, description, URL, person details and social
links. Social links with `url: null` are skipped by `getActiveSocialLinks()`.
Components must never embed personal details directly.

## Conventions

**Components** — server components by default; add `"use client"` only for
state, effects or browser APIs. Named exports, one component per file,
kebab-case file names, props typed with an interface. Use `cn()` for classes.

**Styling** — Tailwind utilities backed by tokens in `app/globals.css`
(`bg-background`, `text-muted`, `border-border`, `max-w-container`, …). No raw
hex in components. Token values are provisional until the design-system module.

**Animation**
- GSAP: import `gsap`/`ScrollTrigger` from `@/animations/gsap` only, and run it
  through `useGsap(...)`. It scopes selectors, reverts on cleanup and exposes
  `reducedMotion`. This cleanup matters: Cache Components hides routes with
  `<Activity>`, which runs effect cleanup and re-runs effects on return.
- Lenis: mounted once by `SmoothScrollProvider`, driven by GSAP's ticker and
  synced with ScrollTrigger; disabled under reduced motion. Access it with
  `useLenisRef()`.
- Framer Motion: `MotionConfig reducedMotion="user"` is applied globally.
- Durations/eases come from `animations/tokens.ts`.
- Every animation must have a reduced-motion path.

**Accessibility** — skip link and `<main id="main-content">` live in the root
layout; keep one `<h1>` per page; focus styles are defined globally.

**SEO** — use `createMetadata()` from `lib/seo.ts` in every page.

**Assets** — see [`public/assets/README.md`](./public/assets/README.md).

## Module status

| Module | Status |
| ------ | ------ |
| M01 Repository audit & architecture | Done (this foundation) |
| Navigation, home, listings, case studies, about, contact, design system | Pending — placeholders marked `TODO(...)` |

## Known issues

- On a cold server, the **first** request to an unknown URL (e.g. `/bogus`)
  streams with HTTP 200 and then caches as 404 (observed with Next 16.4.5 +
  Cache Components). The body is the not-found page with `noindex`.
