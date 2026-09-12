#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, '.output', 'public')
const sitemapFile = join(root, 'public', 'sitemap.xml')

if (!existsSync(output)) {
  console.error('✗ .output/public is missing — run `pnpm generate` first')
  process.exit(1)
}

let failed = 0

const fail = (gate, what, detail) => {
  failed++
  console.error(`\n✗ gate ${gate}: ${what}`)
  for (const line of detail) console.error(`    ${line}`)
}

const locales = readdirSync(join(root, 'i18n', 'locales'))
  .filter((name) => extname(name) === '.json')
  .map((name) => name.slice(0, -'.json'.length))
  .sort()

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const pages = walk(output)
  .filter((path) => path.endsWith('/index.html'))
  .map((path) => ({
    route: `/${relative(output, dirname(path))}`.replace(/^\/\.$/, '/'),
    html: readFileSync(path, 'utf8')
  }))
  .sort((a, b) => a.route.localeCompare(b.route))

const indexable = pages.filter(({ route }) => !route.endsWith('/404'))
const errorPages = pages.filter(({ route }) => route.endsWith('/404'))

const attr = (html, pattern) => html.match(pattern)?.[1]
const show = (values) => [...values].sort().join(', ')

const sitemap = readFileSync(sitemapFile, 'utf8')
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

console.log(`→ gate 1/4: every prerendered page is in the sitemap (${indexable.length} pages)`)
const canonicals = new Map()
for (const page of indexable) {
  const canonical = attr(page.html, /<link rel="canonical" href="([^"]+)"/)
  if (!canonical) {
    fail(1, `${page.route} renders no canonical link`, ['strictSeo should emit one for every page'])
    continue
  }
  canonicals.set(page.route, canonical)
}

const missing = [...canonicals.values()].filter((url) => !sitemapLocs.includes(url))
const extra = sitemapLocs.filter((url) => ![...canonicals.values()].includes(url))
if (missing.length || extra.length) {
  fail(1, 'public/sitemap.xml and the prerendered canonicals disagree', [
    missing.length ? `prerendered but not listed: ${show(missing)}` : null,
    extra.length ? `listed but not prerendered: ${show(extra)}` : null,
    'the sitemap is hand-written; adding a page means adding both locales to it'
  ].filter(Boolean))
}

console.log('→ gate 2/4: hreflang covers every locale on every page')
for (const page of indexable) {
  const langs = new Set([...page.html.matchAll(/<link rel="alternate" href="[^"]+" hreflang="([^"]+)"/g)].map((m) => m[1]))
  const wanted = [...locales, 'x-default']
  const absent = wanted.filter((lang) => !langs.has(lang))
  if (absent.length) {
    fail(2, `${page.route} is missing hreflang for ${show(absent)}`, [`present: ${show(langs)}`])
  }
}

console.log('→ gate 3/4: the not-found pages stay out of the index')
for (const page of errorPages) {
  const robots = attr(page.html, /<meta name="robots" content="([^"]+)"/)
  if (!robots?.includes('noindex')) {
    fail(3, `${page.route} is not marked noindex`, [`robots: ${robots ?? '(no meta)'}`])
  }
  const canonical = attr(page.html, /<link rel="canonical" href="([^"]+)"/)
  if (canonical && sitemapLocs.includes(canonical)) {
    fail(3, `${page.route} is listed in the sitemap`, [canonical])
  }
}

console.log('→ gate 4/4: the zh and en legal documents have the same sections')
const sectionIds = (html) =>
  [...html.matchAll(/<section id="([^"]+)"/g)].map((m) => m[1])

const htmlFor = (route) => pages.find((page) => page.route === route)?.html

for (const name of ['privacy', 'terms']) {
  const found = [`/${name}`, ...locales.map((locale) => `/${locale}/${name}`)].filter((route) => htmlFor(route))
  if (found.length < 2) {
    fail(4, `${name} does not exist in two locales`, [`found: ${show(found)}`])
    continue
  }

  const [first, ...rest] = found
  const want = sectionIds(htmlFor(first))
  if (!want.length) {
    fail(4, `${first} rendered no sections`, ['the anchor ids the table of contents links to are gone'])
    continue
  }
  const duplicates = want.filter((id, index) => want.indexOf(id) !== index)
  if (duplicates.length) {
    fail(4, `${first} repeats a section id`, [show(new Set(duplicates)), 'ids are anchor targets and must be unique'])
  }

  for (const route of rest) {
    const got = sectionIds(htmlFor(route))
    if (got.join(' ') !== want.join(' ')) {
      fail(4, `${route} does not match ${first} section for section`, [
        `${first}: ${want.join(' ')}`,
        `${route}: ${got.join(' ')}`,
        'the two language versions must stay equal in substance, and the anchors are shared'
      ])
    }
  }
}

if (failed) {
  console.error(`\n${failed} gate failure(s).`)
  process.exit(1)
}
console.log('\n✓ build gates pass')
