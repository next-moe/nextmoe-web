import { DEFAULT_LOCALE, LOCALES } from '#shared/constants/locale'
import { PAGES, canonicalUrl } from '#shared/constants/routes'
import { EFFECTIVE_DATE } from '#shared/constants/site'

// @nuxtjs/i18n emits both the code and the language tag as hreflang (zh and
// zh-CN), and Google cross-checks the sitemap alternates against them.
const alternates = (path: string) =>
  [
    ...LOCALES.flatMap(({ code, language }) => {
      const href = canonicalUrl(code, path)
      return (code === language ? [code] : [code, language]).map(
        (hreflang) =>
          `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`
      )
    }),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalUrl(DEFAULT_LOCALE, path)}"/>`
  ].join('\n')

const entry = (
  loc: string,
  path: string,
  changefreq: string,
  priority: string
) =>
  [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${EFFECTIVE_DATE}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    alternates(path),
    '  </url>'
  ].join('\n')

export default defineEventHandler((event) => {
  const urls = PAGES.flatMap(({ path, changefreq, priority }) =>
    LOCALES.map(({ code }) =>
      entry(canonicalUrl(code, path), path, changefreq, priority)
    )
  )

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset',
    '  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '  xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '>',
    ...urls,
    '</urlset>',
    ''
  ].join('\n')
})
