# Lahima In-Des | Architects & Engineers - website

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · pnpm.

## Setup

```bash
pnpm install
cp .env.example .env.local   # optional: set NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_GA_ID
pnpm dev                     # http://localhost:3000
```

Scripts: `pnpm dev` · `pnpm build` · `pnpm lint` · `pnpm typecheck` · `pnpm format`.

## Where things live

| Path                             | Purpose                                                        |
| -------------------------------- | -------------------------------------------------------------- |
| `src/config/site.ts`             | Verified business facts, `TODO_VERIFY_*` values, feature flags |
| `src/content/*.ts`               | Typed content (services, projects, scope, legal, images)       |
| `src/styles/globals.css`         | Design tokens (Tailwind v4 `@theme`), base styles, motion CSS  |
| `src/components/layout`          | Header, mobile menu, footer, contact dock, cookie consent      |
| `src/components/animation`       | Reveal, scroll effects, marquee, Lenis smooth scroll           |
| `src/components/forms`           | Enquiry form, enquiry modal, multi-select dropdown             |
| `src/lib`                        | Helpers (`seo.ts`, `utils.ts`, validators, focus trap)         |
| `scripts/check-placeholders.mjs` | Build guard for placeholder project images                     |

## Enquiry form

No server or email service is used. "Send by email" opens the visitor's own email app
with the enquiry filled in (with a Gmail web fallback). WhatsApp sending appears only when
a verified WhatsApp number is set in `src/config/site.ts`.

## Publishing verified contact details

Open `src/config/site.ts`. Every unconfirmed item is a `TODO_VERIFY_*` constant set to
`null`; the UI renders nothing for it. Fill in the value once the owner confirms it
(phone, WhatsApp, address, map URL, hours, socials). Search the repo for `TODO_VERIFY_`
to list everything outstanding.

## Images

Photos in `public/reference/` are stock / AI-generated illustrations, not completed Lahima
projects. Replace them with real project photographs (and update `src/content/images.ts`
and `src/content/projects.ts`) before launch.

## Deploying on Vercel

Use **one** Vercel project for this repo (`RamDemoGit/Interiors-demo`, branch `main`).
Framework preset: Next.js. Root directory: repository root. Install/build commands: leave
the defaults (`.npmrc` and `pnpm-workspace.yaml` already handle the install policy).
Set `NEXT_PUBLIC_SITE_URL` to the final public URL under Project Settings > Environment
Variables. Every push to `main` redeploys; other branches create preview deployments only.
