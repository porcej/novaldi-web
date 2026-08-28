# NVFR LDI Marketing Site

Marketing website for the **Northern Virginia Fire & Rescue Leadership Development Institute (NVFR LDI)**, built with [Astro](https://astro.build) for [Cloudflare Pages](https://developers.cloudflare.com/pages/).

Live domain target: [https://www.novaldi.us](https://www.novaldi.us)  
Registration portal: [https://register.novaldi.us](https://register.novaldi.us)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — 2026 session hero, about teaser, session facts, programs |
| `/about` | Institute history, mission, NVERS parent org |
| `/programs` | Company & Command residency programs |
| `/contact` | Email and registration links |

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is written to `dist/` (plain static HTML/CSS/JS — no Workers adapter).

## Deploy (recommended): GitHub Actions → Pages Direct Upload

The Cloudflare **Git build** for Astro 7 currently fails on the reserved `ASSETS` Wrangler path. This repo deploys via [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) instead:

1. In Cloudflare → **Manage account** → **API Tokens**, create a token with **Cloudflare Pages — Edit**.
2. In GitHub → repo **Settings** → **Secrets and variables** → **Actions**, add:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. In Cloudflare Pages project **Settings** → **Builds**:
   - **Disable automatic deployments** from Git (or delete the Git connection) so the broken CF builder does not keep failing.
4. Push to `main` — GitHub Actions builds and runs `wrangler pages deploy dist --project-name=novaldi-web`.

Confirm the Pages project name is `novaldi-web` (or change the workflow `project-name`).

## Brand

- Navy `#00205B`
- Gold `#FFC72C`
- Logo: `public/images/ldi-logo.jpg`

Session facts live in `src/content/site.ts`. Flip `session.applicationsOpen` to `true` when registration reopens.
