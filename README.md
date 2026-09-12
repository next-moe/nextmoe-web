# nextmoe-web

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
- pnpm

## Routes

Six indexable pages plus a prerendered not-found page per locale. The list is
derived from `PAGES` in `shared/constants/routes.ts`, which is what
`nitro.prerender.routes` is built from:

| Route      | Route (en)    | In the sitemap |
| ---------- | ------------- | -------------- |
| `/`        | `/en`         | yes            |
| `/privacy` | `/en/privacy` | yes            |
| `/terms`   | `/en/terms`   | yes            |
| `/404`     | `/en/404`     | no (`noindex`) |

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm typecheck  # vue-tsc --noEmit
pnpm gate:i18n  # locale catalogue checks, no build needed
pnpm generate   # static build into .output/public
pnpm gate:build # checks the generated output; run after generate
```

`gate:i18n` fails if the two locale catalogues drift apart, if a translation
drops an interpolated variable, or if the catalogue and the `t()` call sites
disagree in either direction. `gate:build` reads `.output/public` and fails if
`public/sitemap.xml` disagrees with the canonical each page emits, if a page is
missing an hreflang, if a 404 page is indexable, or if the zh and en versions of
a legal document no longer carry the same sections. CI runs both.

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
boxed: `hero-koi.webp` in the hero and `bloom-character.webp` at the foot of the
dark account band. `og-cover.jpg` is the social card. `images/sites/*.webp` are
the member sites' own brand icons, copied from their repositories.

`public/images/*.webp` are converted from the original artwork PNGs that live in
the repository root as `source-character-*.png`. Those originals are ignored by
git and by Docker; keep them out of the image and out of commits.

nginx serves `/images/` with a 30-day cache and the filenames carry no content
hash, so **replacing artwork means picking a new filename** — overwriting a file
leaves returning visitors on the old picture.

## Deployment

Dokploy builds the `Dockerfile` in this repository:

1. a Node stage runs `pnpm install --frozen-lockfile` and `pnpm generate`;
2. the result is copied into `nginx:alpine` and served as static files.

`nginx.conf` serves `www.nextmoe.com`, 301-redirects the apex `nextmoe.com` to
`https://www.nextmoe.com`, caches `/_nuxt/` and `/images/` aggressively, and marks
HTML `no-cache`. Unknown paths get the prerendered not-found page **in the right
language**: `/404/index.html` by default, and `/en/404/index.html` for anything
under `/en/`.
