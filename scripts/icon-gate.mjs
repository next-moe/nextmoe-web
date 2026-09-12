#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ICON_NAMES } from '../shared/constants/icon.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const sourceDirs = [join(root, 'app')]

let failed = 0

const fail = (gate, what, detail) => {
  failed++
  console.error(`\n✗ gate ${gate}: ${what}`)
  for (const line of detail) console.error(`    ${line}`)
}

const show = (values) => [...values].sort().join(', ')

const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const collections = Object.keys({
  ...manifest.dependencies,
  ...manifest.devDependencies
})
  .filter((name) => name.startsWith('@iconify-json/'))
  .map((name) => name.slice('@iconify-json/'.length))

if (!collections.length) {
  console.error(
    '✗ gate: no @iconify-json/* package installed — every check below is vacuously true'
  )
  process.exit(1)
}

const catalogues = Object.fromEntries(
  collections.map((collection) => [
    collection,
    JSON.parse(
      readFileSync(
        join(root, 'node_modules', '@iconify-json', collection, 'icons.json'),
        'utf8'
      )
    )
  ])
)

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const slug = '[a-z0-9]+(?:-[a-z0-9]+)*'
const isIconName = new RegExp(`^(${slug}):(${slug})$`)

const used = new Map()
for (const path of sourceDirs
  .flatMap(walk)
  .filter((path) => ['.vue', '.ts'].includes(extname(path)))) {
  const source = readFileSync(path, 'utf8')
  for (const [, , value] of source.matchAll(/(['"])((?:\\.|(?!\1).)*)\1/g)) {
    const match = value.match(isIconName)
    if (match && collections.includes(match[1]))
      used.set(value, path.slice(root.length + 1))
  }
}

console.log(
  `→ gate 1/2: bundle list matches the icons the code renders (${collections.join(' / ')})`
)
const bundled = new Set(ICON_NAMES)
const missing = [...used.keys()].filter((name) => !bundled.has(name))
const extra = ICON_NAMES.filter((name) => !used.has(name))

if (missing.length) {
  fail(1, 'icons the code renders but ICON_NAMES does not bundle', [
    missing.map((name) => `${name} (${used.get(name)})`).join(', '),
    'fallbackToApi is off, so these render as nothing at all'
  ])
}
if (extra.length) {
  fail(1, 'ICON_NAMES entries no call site renders', [
    show(extra),
    'they inflate the client bundle for nothing'
  ])
}

console.log('→ gate 2/2: every bundled icon exists in its collection')
for (const name of ICON_NAMES) {
  const [collection, icon] = name.split(':')
  const catalogue = catalogues[collection]
  if (!catalogue) {
    fail(
      2,
      `${name} names a collection with no @iconify-json/${collection} installed`,
      ['it cannot be bundled or served locally']
    )
    continue
  }
  if (!catalogue.icons[icon] && !catalogue.aliases?.[icon]) {
    fail(2, `${name} does not exist in @iconify-json/${collection}`, [
      'a typo here is silent at build time'
    ])
  }
}

if (failed) {
  console.error(`\n${failed} gate failure(s).`)
  process.exit(1)
}
console.log('\n✓ icon gates pass')
