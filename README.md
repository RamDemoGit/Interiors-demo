# Lahima In-Des | Architects & Engineers - website

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · pnpm.

> Status: **Phase 1 (Foundation)** complete. See the build phases in the project brief.

## Setup

```bash
pnpm install
cp .env.example .env.local   # then fill in values
pnpm dev                     # http://localhost:3000
```

Scripts: `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` · `pnpm format`.

## Where things live

| Path                             | Purpose                                                        |
| -------------------------------- | -------------------------------------------------------------- |
| `src/config/site.ts`             | Verified business facts, `TODO_VERIFY_*` values, feature flags |
| `src/content/*.ts`               | Typed content (copy from the content master document)          |
| `src/styles/globals.css`         | Design tokens (Tailwind v4 `@theme`), base styles              |
| `src/components/layout`          | Header, mobile menu, footer, skip link, floating CTA           |
| `src/components/animation`       | Lenis provider (lazy, reduced-motion aware)                    |
| `src/lib`                        | Helpers (`seo.ts`, `utils.ts`, focus trap)                     |
| `scripts/check-placeholders.mjs` | Build guard for placeholder project images                     |

## Publishing verified contact details

Open `src/config/site.ts`. Every unconfirmed item is a `TODO_VERIFY_*` constant set to
`null`; the UI renders nothing for it. Fill in the value once the owner confirms it
(phone, WhatsApp, address, map URL, hours, socials). Search the repo for `TODO_VERIFY_`
to list everything outstanding.

## Placeholder images

Placeholder project images live in `public/projects/<slug>/` with a `.placeholder` marker.
`pnpm build` warns while any remain and **fails on Vercel production** unless
`ALLOW_PLACEHOLDER_IMAGES=true`. Delete the marker after adding real images.

_Adding a project, adding an area page and the full env reference are completed in later phases._
