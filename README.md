# NVFR LDI Marketing Site

Marketing website for the **Northern Virginia Fire & Rescue Leadership Development Institute (NVFR LDI)**, built with [Astro](https://astro.build) and designed for [Cloudflare Pages](https://developers.cloudflare.com/pages/).

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

Output is written to `dist/` (static assets for Cloudflare Pages).

Preview locally:

```bash
npm run preview
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub (`porcej/novaldi-web`).
2. In Cloudflare Dashboard → **Workers & Pages** → your Pages project → **Settings** → **Builds & deployments**:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. Do **not** rely on a Wrangler config for this static site (none is committed). If the dashboard still shows output `dist/client`, change it to `dist`.
4. Attach custom domain `www.novaldi.us` when ready. Keep `register.novaldi.us` as a separate app/host.

Deploy from the CLI after a local build:

```bash
npx wrangler pages deploy dist --project-name=novaldi-web
```

## Brand

- Navy `#00205B`
- Gold `#FFC72C`
- Logo: `public/images/ldi-logo.jpg`

Session facts (dates, application window, URLs) live in `src/content/site.ts`.
