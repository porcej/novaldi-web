# NVFR LDI Marketing Site

Marketing website for the **Northern Virginia Fire & Rescue Leadership Development Institute (NVFR LDI)**, built with [Astro](https://astro.build) and designed for [Cloudflare Pages](https://developers.cloudflare.com/pages/).

Live domain target: [https://www.novaldi.us](https://www.novaldi.us)  
Registration portal: [https://register.novaldi.us](https://register.novaldi.us)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — 2026 session hero, about teaser, where/when, programs |
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

Output is written to `dist/client/` (static assets for Cloudflare Pages).

Preview locally:

```bash
npm run preview
```

## Deploy to Cloudflare Pages

1. Push this repo to GitHub (`porcej/novaldi-web`).
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → connect the repository.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist/client`
4. Attach custom domain `www.novaldi.us` when ready. Keep `register.novaldi.us` as a separate app/host.

You can also deploy from the CLI with Wrangler after a local build:

```bash
npx wrangler pages deploy dist/client --project-name=novaldi-web
```

## Brand

- Navy `#00205B`
- Gold `#FFC72C`
- Logo: `public/images/ldi-logo.jpg`

Session facts (dates, application window, URLs) live in `src/content/site.ts`.
