import { DEFAULT_LOCALE, LOCALES, type Locale } from './locale'
import { SITE_URL } from './site'

export const PAGES = [
  { path: '/', changefreq: 'monthly', priority: '1.0' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.8' },
  { path: '/terms', changefreq: 'yearly', priority: '0.7' }
] as const

export const ERROR_PAGE = '/404'

export const localizedPath = (locale: Locale, path: string) =>
  locale === DEFAULT_LOCALE ? path : `/${locale}${path === '/' ? '' : path}`

// The canonical @nuxtjs/i18n emits for the home page has no trailing slash, and a
// sitemap entry that disagrees with the canonical is a sitemap entry Google drops.
export const canonicalUrl = (locale: Locale, path: string) => {
  const localized = localizedPath(locale, path)
  return `${SITE_URL}${localized === '/' ? '' : localized}`
}

const expand = (paths: readonly string[]) =>
  LOCALES.flatMap(({ code }) => paths.map((path) => localizedPath(code, path)))

export const PRERENDER_ROUTES = [
  ...expand([...PAGES.map((page) => page.path), ERROR_PAGE]),
  '/sitemap.xml'
]
