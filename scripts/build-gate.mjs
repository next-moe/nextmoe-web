#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const output = join(root, '.output', 'public')
const sitemapFile = join(output, 'sitemap.xml')

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

if (!existsSync(sitemapFile)) {
  console.error('✗ .output/public/sitemap.xml is missing — server/routes/sitemap.xml.ts did not prerender')
  process.exit(1)
}

const sitemap = readFileSync(sitemapFile, 'utf8')
const sitemapLocs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const sitemapEntries = new Map(
  [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => [
    body.match(/<loc>([^<]+)<\/loc>/)?.[1],
    {
      lastmod: body.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
      langs: new Set([...body.matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]))
    }
  ])
)

console.log(`→ gate 1/5: every prerendered page is in the sitemap (${indexable.length} pages)`)
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
  fail(1, 'the generated sitemap and the prerendered canonicals disagree', [
    missing.length ? `prerendered but not listed: ${show(missing)}` : null,
    extra.length ? `listed but not prerendered: ${show(extra)}` : null,
    'the sitemap is built from PAGES in shared/constants/routes.ts'
  ].filter(Boolean))
}

const undated = [...sitemapEntries].filter(([, entry]) => !/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod ?? ''))
if (undated.length) {
  fail(1, 'a sitemap entry carries no ISO lastmod', [
    show(undated.map(([loc]) => loc)),
    'lastmod is the one hint in this file Google actually reads'
  ])
}

console.log('→ gate 2/5: hreflang covers every locale, in the page and in the sitemap')
for (const page of indexable) {
  const langs = new Set([...page.html.matchAll(/<link rel="alternate" href="[^"]+" hreflang="([^"]+)"/g)].map((m) => m[1]))
  const wanted = [...locales, 'x-default']
  const absent = wanted.filter((lang) => !langs.has(lang))
  if (absent.length) {
    fail(2, `${page.route} is missing hreflang for ${show(absent)}`, [`present: ${show(langs)}`])
  }

  const entry = sitemapEntries.get(canonicals.get(page.route))
  if (entry && show(entry.langs) !== show(langs)) {
    fail(2, `${page.route} and its sitemap entry advertise different hreflang sets`, [
      `page:    ${show(langs)}`,
      `sitemap: ${show(entry.langs)}`,
      'Google cross-checks the two and drops the annotation when they disagree'
    ])
  }
}

console.log('→ gate 3/5: the not-found pages stay out of the index')
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

console.log('→ gate 4/5: the zh and en legal documents have the same sections')
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

console.log('→ gate 5/5: every indexable page carries structured data that matches it')
for (const page of indexable) {
  const block = page.html.match(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/)?.[1]
  if (!block) {
    fail(5, `${page.route} renders no JSON-LD`, ['usePageSeo emits one @graph per page'])
    continue
  }

  let graph
  try {
    graph = JSON.parse(block)
  } catch (error) {
    fail(5, `${page.route} renders JSON-LD that does not parse`, [String(error)])
    continue
  }

  const nodes = graph['@graph'] ?? []
  const webPage = nodes.find((node) => node['@type'] === 'WebPage')
  const canonical = canonicals.get(page.route)
  if (!webPage) {
    fail(5, `${page.route} has no WebPage node`, [`types: ${show(nodes.map((node) => node['@type']))}`])
  } else if (webPage.url !== canonical) {
    fail(5, `${page.route} describes a different URL than it claims as canonical`, [
      `canonical: ${canonical}`,
      `WebPage:   ${webPage.url}`
    ])
  }

  const declared = new Set(nodes.map((node) => node['@id']).filter(Boolean))
  const referenced = new Set()
  const collect = (value) => {
    if (Array.isArray(value)) return value.forEach(collect)
    if (!value || typeof value !== 'object') return
    const keys = Object.keys(value)
    if (keys.length === 1 && keys[0] === '@id') referenced.add(value['@id'])
    else Object.values(value).forEach(collect)
  }
  collect(nodes)

  const dangling = [...referenced].filter((id) => !declared.has(id))
  if (dangling.length) {
    fail(5, `${page.route} references graph nodes that are not in its graph`, [
      show(dangling),
      `declared: ${show(declared)}`,
      'a reference nothing declares is a node the crawler silently drops'
    ])
  }
}

if (failed) {
  console.error(`\n${failed} gate failure(s).`)
  process.exit(1)
}
console.log('\n✓ build gates pass')
