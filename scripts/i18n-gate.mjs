#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const localesDir = join(root, 'i18n', 'locales')
const sourceDirs = [join(root, 'app')]

let failed = 0

const fail = (gate, what, detail) => {
  failed++
  console.error(`\n✗ gate ${gate}: ${what}`)
  for (const line of detail) console.error(`    ${line}`)
}

const locales = readdirSync(localesDir)
  .filter((name) => extname(name) === '.json')
  .map((name) => name.slice(0, -'.json'.length))
  .sort()

if (locales.length < 2) {
  console.error('✗ gate: fewer than two locale files — every check below is vacuously true')
  process.exit(1)
}

const flatten = (table, prefix = '') => {
  const out = {}
  for (const [key, value] of Object.entries(table)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object') Object.assign(out, flatten(value, path))
    else out[path] = value
  }
  return out
}

const catalogs = Object.fromEntries(
  locales.map((locale) => [locale, flatten(JSON.parse(readFileSync(join(localesDir, `${locale}.json`), 'utf8')))])
)

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const sources = sourceDirs
  .flatMap(walk)
  .filter((path) => ['.vue', '.ts'].includes(extname(path)))

const show = (values) => [...values].sort().join(', ')

const reference = locales[0]
const referenceKeys = Object.keys(catalogs[reference])

console.log(`→ gate 1/3: key completeness (${locales.join(' / ')})`)
for (const locale of locales.slice(1)) {
  const here = new Set(Object.keys(catalogs[locale]))
  const missing = referenceKeys.filter((key) => !here.has(key))
  const extra = [...here].filter((key) => !referenceKeys.includes(key))
  if (missing.length || extra.length) {
    fail(1, `${locale}.json does not carry the same keys as ${reference}.json`, [
      missing.length ? `missing: ${show(missing)}` : null,
      extra.length ? `extra: ${show(extra)} (an entry no other locale has can never render)` : null
    ].filter(Boolean))
  }
}

console.log('→ gate 2/3: placeholder consistency')
const placeholders = (message) => new Set([...String(message).matchAll(/\{\s*([A-Za-z][A-Za-z0-9]*)\s*\}/g)].map((m) => m[1]))

for (const key of referenceKeys) {
  const want = placeholders(catalogs[reference][key])
  for (const locale of locales.slice(1)) {
    const message = catalogs[locale][key]
    if (message === undefined) continue
    const got = placeholders(message)
    const missing = [...want].filter((name) => !got.has(name))
    const extra = [...got].filter((name) => !want.has(name))
    if (missing.length || extra.length) {
      fail(2, `${key} interpolates different variables in ${reference} and ${locale}`, [
        `${reference}: {${show(want)}}`,
        `${locale}: {${show(got)}}`,
        'a translation that drops a variable renders the literal placeholder to the reader'
      ])
    }
  }
}

console.log('→ gate 3/3: catalogue matches the keys the code asks for')
const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const asked = new Set()
const referenced = new Set()
const patterns = []

for (const path of sources) {
  const source = readFileSync(path, 'utf8')

  for (const match of source.matchAll(/(?<![\w$])\$?t\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g)) {
    const [, quote, body] = match
    if (quote === '`' && body.includes('${')) {
      patterns.push({
        key: body,
        test: new RegExp(`^${body.split(/\$\{[^}]*\}/).map(escape).join('[^.]+')}$`),
        path
      })
      continue
    }
    asked.add(body)
  }

  for (const match of source.matchAll(/(['"])((?:\\.|(?!\1).)*)\1/g)) referenced.add(match[2])
}

for (const key of [...asked].sort()) {
  if (catalogs[reference][key] === undefined) {
    fail(3, `the code asks for ${key}, which no locale defines`, [`reference catalogue: ${reference}.json`])
  }
}

for (const pattern of patterns) {
  if (!referenceKeys.some((key) => pattern.test.test(key))) {
    fail(3, `\`${pattern.key}\` matches no catalogue key`, [pattern.path.slice(root.length + 1)])
  }
}

const reachable = new Set([...asked, ...referenced])
const orphans = referenceKeys.filter(
  (key) => !reachable.has(key) && !patterns.some((pattern) => pattern.test.test(key))
)
if (orphans.length) {
  fail(3, 'catalogue entries no call site can reach', [
    show(orphans),
    'every locale carries them, so gate 1 stays green while they render nowhere'
  ])
}

if (failed) {
  console.error(`\n${failed} gate failure(s).`)
  process.exit(1)
}
console.log('\n✓ i18n gates pass')
