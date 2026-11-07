# Asset conventions

All static media lives under `public/assets/`, grouped by domain, and is
referenced from content files as an `AssetRef` (`src`, required `alt`,
optional `width`/`height`).

```
public/assets/
├── brand/                   logos, favicons sources, OG images
├── about/                   portraits and about-page media
├── projects/                shared/cross-category project media
├── video|design|development|games|art/
│   └── <project-slug>/      media for one case study
│       ├── cover.webp
│       └── gallery-01.webp
```

Rules

- Folder name = the project `slug` from `src/content/projects.ts`.
- File names: lowercase kebab-case, no spaces (`cover.webp`, `gallery-01.webp`).
- Images: WebP/AVIF/SVG. Render with `next/image`; always give width/height.
- Video: MP4 (H.264) plus an optional WebM; always provide a poster image.
- Keep large source files (PSD, raw video, etc.) out of the repo.
- Do not commit assets you do not have the rights to publish.
- Missing asset? Leave a `// TODO: <path>` comment in the content file instead
  of a stand-in image.
