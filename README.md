# nextmoe-portal

The public brand and legal portal for **NextMoe·未萌**, served at
<https://www.nextmoe.com>.

NextMoe is the de facto standard for the next generation of anime, manga, games
and light novels — a multi-product ACGN community platform. The platform itself is
still under development, so this site is deliberately modest: it states what
exists today, points visitors at the live member sites (kungal.com, moyu.moe,
letmoe.com), and hosts the Privacy Policy and Terms of Service for the NextMoe
account service at `account.nextmoe.com`.

## Stack

- Nuxt 4 (fully prerendered — `nuxt generate`, no server runtime in production)
- KunUI (`@kungal/ui-*`) as the component library, loaded as a Nuxt layer
- `@nuxtjs/i18n` with `prefix_except_default`; `zh` is the default locale
  (`/`), English lives under `/en`
- Tailwind CSS v4 via `@tailwindcss/vite`, on KunUI's semantic color tokens
- `@nuxtjs/color-mode` for the light/dark switch in the footer; it follows the
  system setting until a visitor picks a side
- pnpm

## Routes

Six indexable pages plus a prerendered not-found page per locale. The list is
derived from `PAGES` in `shared/constants/routes.ts`, which feeds both
`nitro.prerender.routes` and `server/routes/sitemap.xml.ts`:

| Route      | Route (en)    | In the sitemap |
| ---------- | ------------- | -------------- |
| `/`        | `/en`         | yes            |
| `/privacy` | `/en/privacy` | yes            |
| `/terms`   | `/en/terms`   | yes            |
| `/404`     | `/en/404`     | no (`noindex`) |

## Development

```bash
pnpm install
pnpm dev        # http://localhost:7877
pnpm typecheck  # vue-tsc --noEmit
pnpm lint       # eslint .            (lint:fix to autofix)
pnpm format     # prettier . --write  (format:check in CI)
pnpm gate:i18n  # locale catalogue checks, no build needed
pnpm gate:icon  # icon bundle list checks, no build needed
pnpm generate   # static build into .output/public
pnpm gate:build # checks the generated output; run after generate
```

Every `nuxt` script sets `NUXT_LOCK=1`, which turns on Nuxt's own lock file.
Without it a second `pnpm dev` happily starts against the same `.nuxt` and
rewrites the virtual modules the first one is still serving.

Prettier owns formatting and ESLint owns correctness — `@nuxt/eslint` generates
the flat config with `stylistic: false` so the two never fight over a line. CI
runs `lint` and `format:check` before the gates.

`gate:i18n` fails if the two locale catalogues drift apart, if a translation
drops an interpolated variable, or if the catalogue and the `t()` call sites
disagree in either direction. `gate:icon` fails if `ICON_NAMES` and the icons the
components render are not the same set, or if a name does not exist in an
installed collection — icons are inlined with `fallbackToApi: false` in dev and
in production alike, so either mistake renders an empty box instead of raising
anything, and this gate is the only thing that catches it. `gate:build` reads
`.output/public` and fails if the generated sitemap disagrees with the canonical
each page emits, if a page and its sitemap entry advertise different hreflang
sets, if a 404 page is indexable, if the zh and en versions of a legal document no
longer carry the same sections, or if a page's JSON-LD does not parse, does not
describe that page's canonical, or references an `@id` its own graph never
declares.

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

The site uses two pieces of character art, both bled off a page edge rather than
boxed: `hero-koi.webp` in the hero (desktop only) and `bloom-koi.webp` at the foot
of the dark account band. `og-cover.jpg` is the social card. `images/sites/*.webp`
are the member sites' own brand icons, copied from their repositories.

`public/images/*.webp` are converted from the original artwork PNGs that live in
the repository root as `source-character-*.png`. Those originals are ignored by
git and by Docker; keep them out of the image and out of commits.

Encode them with `-quality 75..80 -define webp:alpha-quality=60`: the transparent
ground gives these cut-outs a very expensive alpha channel, and dropping its
quality alone takes roughly a third off the file with no visible change.

nginx serves `/images/` with a 30-day cache and the filenames carry no content
hash, so **replacing artwork means picking a new filename** — overwriting a file
leaves returning visitors on the old picture.

## Page metadata

Every indexable page carries a localized title and description, an OG/Twitter
card pointing at `og-cover.jpg`, and one `application/ld+json` graph —
`Organization`, `WebSite`, `WebPage`, plus an `ItemList` of the member sites on
the home page and a `BreadcrumbList` on the legal pages. Canonical, hreflang,
`og:url` and `og:locale` come from `@nuxtjs/i18n`'s `strictSeo`, which owns them.

`sitemap.xml` is a prerendered Nitro route
(`server/routes/sitemap.xml.ts`) built from the same `PAGES` list as the
prerenderer, with per-page `lastmod`/`changefreq`/`priority` and `xhtml:link`
alternates matching the hreflang the pages emit. `gate:build` checks all of that
against the real output.

## Deployment

See `docs/deploy.md`. Dokploy deploys `docker-compose.prod.yml` from the image
`.github/workflows/build.yml` publishes to GHCR on every push to `main`; building
the `Dockerfile` directly as a Dokploy Application works too and needs no
registry. Either way:

1. a Node stage runs `pnpm install --frozen-lockfile` and `pnpm generate`;
2. the result is copied into `nginx:alpine` and served as static files on port 80.

`nginx.conf` serves `www.nextmoe.com`, 301-redirects the apex `nextmoe.com` to
`https://www.nextmoe.com`, sends a small set of security headers, caches
`/_nuxt/` and `/images/` aggressively, and marks HTML `no-cache`. Unknown paths
get the prerendered not-found page **in the right language**: `/404/index.html` by
default, and `/en/404/index.html` for anything under `/en/`.
