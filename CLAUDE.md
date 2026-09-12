# Project Guidelines

## What this repo is

`nextmoe-web` is the public brand portal for **NextMoe·未萌** (<https://www.nextmoe.com>):
a landing page plus the Privacy Policy and Terms of Service for the NextMoe
account service at `account.nextmoe.com`. Two locales — Chinese at `/` and
English at `/en`. It is **fully static**: `nuxt generate` prerenders every route
and nginx serves the files. There is no server runtime, no backend and no
database — do not import patterns that assume any of them.

**Positioning.** NextMoe is a multi-product **ACGN** platform, not a Galgame-only
one. The slogan is fixed: 「NextMoe 是下一代 动漫、漫画、游戏、轻小说 的事实标准」
(`brand.slogan`). The four media are `MEDIA` in `app/constants/site.ts`. What is
actually live is the account service plus the three member sites — the site says
so plainly, and that honesty is the point of the Status section.

## Stack facts

- **Nuxt 4** (`nuxt generate`, `nitro.prerender.failOnError: true`).
- **KunUI** (`@kungal/ui-*`) as the component library, wired as a Nuxt layer
  (`extends: ['@kungal/ui-nuxt']`) exactly as in kun-galgame-forum. Reach for a
  `<Kun*>` component before hand-rolling one; **never edit KunUI itself** — it is
  a shared upstream library, so report bugs and missing features to the user.
- **@nuxtjs/i18n**: `strategy: 'prefix_except_default'`, `defaultLocale: 'zh'`,
  and `detectBrowserLanguage: false` **on purpose** — browser-detection
  redirects fight static prerendering. Do not turn it on.
- **Tailwind CSS v4** through `@tailwindcss/vite` (no `tailwind.config.js`).
  The palette is KunUI's semantic scale — `primary` / `secondary` / `success` /
  `default` / `foreground` / `background` / `content1`. There are no project-
  specific color tokens and there should not be; never use Tailwind's stock
  palette (gray, blue, indigo, red…) either.
- **@nuxt/icon** with `fallbackToApi: false` — every icon is inlined from
  `ICON_NAMES` in `shared/constants/icon.ts`, exactly as in kun-galgame-forum, and
  nothing is ever fetched at runtime. A name missing from that list renders
  nothing at all; `pnpm gate:icon` is what keeps the list honest.
- **@nuxtjs/color-mode** with `classPrefix: 'kun-'` and `classSuffix: '-mode'`,
  because KunUI's dark palette is keyed to `.kun-dark-mode` (and its Tailwind
  `dark:` variant is `&:is(.kun-dark-mode *)`) — any other class name silently
  themes nothing. `preference: 'system'`, and the switch is in the footer.
- **pnpm 11**, pinned via `packageManager` in `package.json`. **Node 24**.

## Design rules

**No gradients.** Not on section backgrounds, not on cards, not on text, not as
decorative glows or blurred blobs. The page gets its rhythm from solid grounds
(`background` → `content1` → `foreground`), hairline rules (`border-kun`) and
type scale. A tonal break — the dark `bg-foreground` account band — does the job
a gradient used to.

**Two images, both bled.** `hero-koi.webp` is a full standing keyvisual anchored
to the bottom-right **of the `max-w-6xl` measure** (not the viewport) and sized by
height, so it tracks the type column at every width; `bloom-koi.webp` bleeds
off the bottom of the dark account band. That is the whole image budget. The
artwork is extremely pale, so it only has presence over a dark ground or as a
large cropped silhouette — it disappears on a light one. Do not add a third image,
and do not reintroduce the "text left, picture boxed on the right" layout.

Anchoring hero art to the **viewport** (`lg:-right-[8%]`) is a bug that already
shipped once: at 2560px the figure flew into the bottom-right corner with a
screen-wide gap between it and the text. Position against the measure.

The hero figure is **hidden below `lg`** — a standing full-body crop has nowhere
to stand on a phone, and the hero drops its `min-h` at the same breakpoint so the
type block does not leave a screen of dead space above the media rail. It is a
CSS background rather than an `<img>` on purpose: a `display: none` `<img>` is
still downloaded, so hiding one would have cost every phone the full keyvisual.

Member-site icons in `public/images/sites/` are the real brands, copied from
`../kun-galgame-forum`, `../kun-galgame-patch` and `../kun-letmoe-community`.
kungal and moyu genuinely share the 鲲 mascot — that is not a duplication bug; the
per-site `accent` colour on the host label is what tells the cards apart.

Sections open on their `<h2>`. There are no eyebrow labels above the headings and
no `01 / 02 / 03` counters in the lists — the media rail and the status table
carry a lucide icon in that column instead.

The site has a light and a dark mode, so **every ground has to be a token**.
`bg-foreground` inverts: the account band is a dark break on a light page and a
light break on a dark one — that is the intent, not a bug, and it is why the
band's contents use `text-content1*` rather than a fixed colour.

`border-kun` is `default-100`, a hairline meant to delineate a surface. It is
too faint to read as a deliberate mark: the rule beside the hero lead used it and
was invisible, so that one is `border-l-2 border-default-300`. Structural
hairlines (section rules, card edges, table rows) stay `border-kun`.

Display CJK gets `break-keep`. Without it the slogan broke 漫画 across two lines.

## Content architecture

- Legal prose lives in **typed modules** under `app/content/*.ts`
  (`privacy.{zh,en}.ts`, `terms.{zh,en}.ts`), typed by `shared/types/legal.ts`.
  It is deliberately *not* in locale JSON: vue-i18n's message compiler reads `@`
  as linked-message syntax and `{}` as interpolation, so a support address like
  `support@nextmoe.com` in a locale file is a compile hazard.
- `i18n/locales/{zh,en}.json` hold **only short UI strings** (nav, buttons,
  section headings). One file per locale, because there is one consumer; split
  by consumer only if a second one appears.
- The zh and en legal documents must stay equal in substance — change one, change
  the other in the same edit. Never invent legal or company facts (entity names,
  jurisdictions, retention periods, certifications); if a fact is not already in
  the repo, ask.
- Brand and positioning facts come from two places outside this repo: the member
  sites' own repositories (names, descriptions, icons) and the NextMoe
  architecture draft at `../nextmoe-infra/refs/docs/nextmoe-draft`. The draft is
  an **internal planning document** — read it for positioning, never copy its
  roadmap into public copy. Unlaunched products and narratives the draft marks as
  internal-only stay off this site.
- Shared facts (domains, support email, effective date) live in
  `app/constants/site.ts`. Facts that `nuxt.config.ts` and the gate scripts also
  need — the locale list, the page list — live in `shared/constants/`.

## The gates

`pnpm gate:i18n` (no build) and `pnpm gate:build` (after `pnpm generate`) are the
enforcement, and CI runs both. Every check has been made to fail deliberately at
least once; keep it that way when adding one.

- `gate:i18n` — keys complete across locales, placeholders identical per key,
  and the catalogue matches the keys the code actually asks for (both
  directions, so an entry every locale carries but nobody renders is caught).
- `gate:icon` — `ICON_NAMES` and the icons the code renders are the same set in
  both directions, and every name resolves in an installed `@iconify-json/*`
  collection. With `fallbackToApi` off, both a missing entry and a typo render an
  empty box in silence.
- `gate:build` — reads `.output/public`: the sitemap agrees with the canonical
  every page emits, hreflang covers every locale, the 404s stay `noindex` and out
  of the sitemap, and the zh/en legal documents carry the same section ids in the
  same order.

`i18n.experimental.typedOptionsAndMessages` is **not** the enforcement: it only
generates `.nuxt/types/i18n-messages.d.ts` in dev, and `vue-tsc` still accepts a
key that exists in no locale. It is switched off; the gate is the guarantee.

## Traps already hit — do not re-hit

- **pnpm 11 build allowlist.** Approvals live in `pnpm-workspace.yaml`
  (`allowBuilds:` — currently `esbuild` and `vue-demi`); the `pnpm` field in
  `package.json` is gone in pnpm 11. The Dockerfile must `COPY
  pnpm-workspace.yaml` with the manifest or the install fails with
  `ERR_PNPM_IGNORED_BUILDS`.
- **nginx `try_files` order** must be `$uri $uri/index.html $uri/`. Putting
  `$uri/` before `$uri/index.html` makes every clean URL 301 to a trailing
  slash, which contradicts the canonicals and `public/sitemap.xml`.
- **Single real root element** in any page or route-root component. A leading
  comment, whitespace or sibling at the template root is itself a root node;
  Nuxt then warns "does not have a single root node" and the page transition
  silently stops animating. Keep comments inside the root element.
- **`strictSeo` forbids `useLocaleHead`.** With
  `i18n.experimental.strictSeo: true` the module owns the localized head tags;
  calling `useLocaleHead` anywhere throws and every route prerenders as a 500.
  `app.vue` and `error.vue` therefore call neither it nor `useHead` for locale
  tags.
- **`i18n.bundle.dropMessageCompiler` breaks the production build.** Messages are
  served as runtime JSON (`/_i18n/<hash>/<locale>/messages.json`), so dropping
  the compiler leaves nothing to parse them: dev is fine and the built page dies
  on hydration with `Error: unhandled node type: 0`. Leave it off.
- **KunUI's base layer sets `color` on `*`**, which matches SVG `<path>` too, so
  an icon's `stroke="currentColor"` resolves to the page foreground rather than
  its button's. `app/assets/css/main.css` puts that back with
  `svg, svg * { color: inherit }`. The same universal rule means a descendant
  never inherits a parent's color by default, so **every element inside the dark
  `bg-foreground` band needs an explicit `text-content1*` class**.
- **`KunButton` ignores its `icon` slot unless the `icon` prop is set.** The slot
  renders behind `v-if="icon && iconPosition === …"`, so `<KunButton><template
  #icon>` alone is silently dropped.
- **The artwork's alpha channel, not its colour, is what makes it big.** These
  cut-out PNGs have soft fringed edges over a transparent ground, and WebP stores
  alpha separately at quality 100 by default: `-define webp:alpha-quality=60` took
  the bloom art from 237 KB to 151 KB and the hero from 144 KB to 99 KB with no
  visible difference over either ground. Do not flatten onto the band colour
  instead — KunUI ships a dark palette where `foreground` inverts.
- **`nuxt generate` corrupts a running `nuxt dev`.** Both own `.nuxt`, and the
  dev server reads its virtual modules (`#build/...`) from there, so a
  `pnpm generate` an hour into a dev session left that server serving a
  half-production app: the KunUI plugin never provided `iconComponent`, and every
  icon hydrated into an empty comment node while the production build was
  perfect. `pnpm generate` is gated on `scripts/dev-lock-gate.mjs`, which refuses
  to build while Nuxt's own dev lock is held by a live process. Giving `generate`
  its own `buildDir` looks like the better fix and is not: the committed
  `tsconfig.json` references `./.nuxt/tsconfig.*.json` by path, so a split build
  directory fails the Docker build on a clean checkout.
- **`/images/` is cached for 30 days with no fingerprint in the filename**, so
  replacing artwork in place leaves returning visitors on the old picture until
  the cache expires — caught only because a browser kept serving the previous hero
  after a rebuild. Changing an image means **changing its filename**, not
  overwriting the file.
- **nginx needs a per-locale `error_page`.** The server-level
  `error_page 404 /404/index.html` is Chinese, so an unknown `/en/...` path served
  an English visitor the Chinese 404. `location ^~ /en/` now carries its own
  `error_page 404 /en/404/index.html`; a third locale needs the same block.

## Commands

```bash
pnpm dev         # http://localhost:3000
pnpm typecheck   # vue-tsc --noEmit
pnpm gate:i18n   # locale catalogue checks, no build needed
pnpm gate:icon   # icon bundle list checks, no build needed
pnpm generate    # prerenders every route, failOnError; refuses while dev runs
pnpm gate:build  # checks .output/public; run after generate
```

Local acceptance also includes a `docker build` plus a container smoke test: the
six canonical routes return 200 directly, `Host: nextmoe.com` 301s to
`https://www.nextmoe.com` preserving the path, and an unknown path returns 404.

## Deployment

Dokploy standalone **Application** building this repo's `Dockerfile` (Node stage
runs `pnpm generate`, result copied into `nginx:alpine`), container port **80**.
The apex → www 301 happens in nginx inside the container, not at the proxy.

**Adding a page** means a route file, an entry in `PAGES` in
`shared/constants/routes.ts` (which is what `nitro.prerender.routes` is derived
from), and both locales in `public/sitemap.xml`. `gate:build` fails if the
sitemap and the prerendered canonicals disagree.

## Conventions

- Commit messages entirely in English.
- Comments default to **none**. A comment is earned by a mistake that already
  happened — write the conclusion it cost someone, not a restatement of the code.
  If you cannot name the incident, there is no comment to write.
- Frontend functions are arrow functions.
- Constants in `app/constants/`, cross-cutting constants and shared types in
  `shared/`.
- `app/pages/` holds route wiring only — a single container component plus any
  route-level meta. Business markup lives in the matching folder under
  `app/components/`, and file names do not repeat the directory prefix
  (`components/home/Hero.vue` auto-imports as `HomeHero`).
