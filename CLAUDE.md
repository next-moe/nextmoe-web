# Project Guidelines

## What this repo is

`nextmoe-web` is the public brand portal for **NextMoe·未萌** (<https://www.nextmoe.com>):
a landing page plus the Privacy Policy and Terms of Service for the NextMoe
account service at `account.nextmoe.com`. Two locales — Chinese at `/` and
English at `/en`. It is **fully static**: `nuxt generate` prerenders every route
and nginx serves the files. There is no server runtime, no backend, no database,
and no KunUI in this repo — do not import patterns that assume any of them.

## Stack facts

- **Nuxt 4** (`nuxt generate`, `nitro.prerender.failOnError: true`).
- **@nuxtjs/i18n**: `strategy: 'prefix_except_default'`, `defaultLocale: 'zh'`,
  and `detectBrowserLanguage: false` **on purpose** — browser-detection
  redirects fight static prerendering. Do not turn it on.
- **Tailwind CSS v4** through `@tailwindcss/vite` (no `tailwind.config.js`).
  The palette is custom: `ink` / `moe` / `sakura` / `mint` scales defined in
  `app/assets/css/main.css`. Never use Tailwind's stock palette (gray, blue,
  indigo, red…); every color comes from those tokens.
- **pnpm 11**, pinned via `packageManager` in `package.json`. **Node 24**.

## Design rule: gradients are accents only

This replaces any earlier, looser waiver. Gradients are allowed **only** as small
accents, and the current set is the complete set:

1. `text-brand-gradient` on the brand name in the hero (`app/assets/css/main.css`
   defines the utility; it exists for this one use).
2. The low-alpha radial glows behind the character art in `home/Hero.vue` and
   `home/Account.vue` — soft lighting, peak alpha ≤ 0.5.
3. The 48px member-site icon chips in `home/Sites.vue` (`bg-gradient-to-br` plus
   the `from-*`/`to-*` pairs in `app/constants/site.ts`).

Never paint a section or card background with a gradient. Large surfaces use
solid palette colors — tinted bands (`bg-moe-50`) against white cards
(`bg-white`) on the `bg-ink-50` page ground.

## Content architecture

- Legal prose lives in **typed modules** under `app/content/*.ts`
  (`privacy.{zh,en}.ts`, `terms.{zh,en}.ts`), typed by `shared/types/legal.ts`.
  It is deliberately *not* in locale JSON: vue-i18n's message compiler reads `@`
  as linked-message syntax and `{}` as interpolation, so a support address like
  `support@nextmoe.com` in a locale file is a compile hazard.
- `i18n/locales/{zh,en}.json` hold **only short UI strings** (nav, buttons,
  section headings).
- The zh and en legal documents must stay equal in substance — change one, change
  the other in the same edit. Never invent legal or company facts (entity names,
  jurisdictions, retention periods, certifications); if a fact is not already in
  the repo, ask.
- Shared facts (domains, support email, effective date) live in
  `app/constants/site.ts`.

## Traps already hit — do not re-hit

- **pnpm 11 build allowlist.** The esbuild approval lives in
  `pnpm-workspace.yaml` (`allowBuilds:`); the `pnpm` field in `package.json` is
  gone in pnpm 11. The Dockerfile must `COPY pnpm-workspace.yaml` with the
  manifest or the install fails with `ERR_PNPM_IGNORED_BUILDS`.
- **nginx `try_files` order** must be `$uri $uri/index.html $uri/`. Putting
  `$uri/` before `$uri/index.html` makes every clean URL 301 to a trailing
  slash, which contradicts the canonicals and `public/sitemap.xml`.
- **Single real root element** in any page or route-root component. A leading
  comment, whitespace or sibling at the template root is itself a root node;
  Nuxt then warns "does not have a single root node" and the page transition
  silently stops animating. Keep comments inside the root element.

## Commands

```bash
pnpm dev         # http://localhost:3000
pnpm typecheck   # vue-tsc --noEmit
pnpm generate    # prerenders every route, failOnError
```

Local acceptance also includes a `docker build` plus a container smoke test: the
six canonical routes return 200 directly, `Host: nextmoe.com` 301s to
`https://www.nextmoe.com` preserving the path, and an unknown path returns 404.

## Deployment

Dokploy standalone **Application** building this repo's `Dockerfile` (Node stage
runs `pnpm generate`, result copied into `nginx:alpine`), container port **80**.
The apex → www 301 happens in nginx inside the container, not at the proxy.

**Adding a page requires two updates**: the `nitro.prerender.routes` list in
`nuxt.config.ts` *and* `public/sitemap.xml` (both locales).

## Conventions

- Commit messages entirely in English.
- Comments default to **none** — code that reads clearly gets no comment. A
  comment is earned by a mistake that already happened; write the conclusion,
  not a restatement of the code.
- Frontend functions are arrow functions.
- Constants in `app/constants/`, shared types in `shared/types/`.
- `app/pages/` holds route wiring only — a single container component plus any
  route-level meta. Business markup lives in the matching folder under
  `app/components/`, and file names do not repeat the directory prefix
  (`components/home/Hero.vue` auto-imports as `HomeHero`).
