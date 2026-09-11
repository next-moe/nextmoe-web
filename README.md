# nextmoe-web

The public brand and legal portal for **NextMoe·未萌**, served at
<https://www.nextmoe.com>.

NextMoe is the platform brand behind a family of Chinese-language Galgame
community sites. The platform itself is still under development, so this site is
deliberately modest: it states what exists today, points visitors at the live
member sites (kungal.com, moyu.moe, letmoe.com), and hosts the Privacy Policy and
Terms of Service for the NextMoe account service at `account.nextmoe.com`.

## Stack

- Nuxt 4 (fully prerendered — `nuxt generate`, no server runtime in production)
- `@nuxtjs/i18n` with `prefix_except_default`; `zh` is the default locale
  (`/`), English lives under `/en`
- Tailwind CSS v4 via `@tailwindcss/vite`
- pnpm

## Routes

Six prerendered pages plus a prerendered not-found page:

| Route          | Route (en)        |
| -------------- | ----------------- |
| `/`            | `/en`             |
| `/privacy`     | `/en/privacy`     |
| `/terms`       | `/en/terms`       |
| `/404`         | `/en/404`         |

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm generate   # static build into .output/public
```

To preview the static build exactly as it ships:

```bash
pnpm dlx serve .output/public
```

## Content layout

- UI strings live in `i18n/locales/{zh,en}.json`.
- The Privacy Policy and Terms of Service are plain TypeScript modules in
  `app/content/` (`privacy.zh.ts`, `privacy.en.ts`, `terms.zh.ts`, `terms.en.ts`)
  rather than i18n messages — legal prose contains `@` and `{}`, which the
  vue-i18n message compiler treats as syntax.
- Shared facts (domains, support address, effective date) are in
  `app/constants/site.ts`.

## Images

`public/images/*.webp` are converted from the original artwork PNGs that live in
the repository root as `source-character-*.png`. Those originals are ignored by
git and by Docker; keep them out of the image and out of commits.

## Deployment

Dokploy builds the `Dockerfile` in this repository:

1. a Node stage runs `pnpm install --frozen-lockfile` and `pnpm generate`;
2. the result is copied into `nginx:alpine` and served as static files.

`nginx.conf` serves `www.nextmoe.com`, 301-redirects the apex `nextmoe.com` to
`https://www.nextmoe.com`, serves the prerendered `/404/index.html` for unknown
paths, caches `/_nuxt/` and `/images/` aggressively, and marks HTML `no-cache`.
