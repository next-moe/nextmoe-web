import { DEFAULT_LOCALE, LOCALES, type Locale } from './locale'

export const PAGES = ['/', '/privacy', '/terms'] as const

export const ERROR_PAGE = '/404'

export const localizedPath = (locale: Locale, path: string) =>
  locale === DEFAULT_LOCALE ? path : `/${locale}${path === '/' ? '' : path}`

const expand = (paths: readonly string[]) =>
  LOCALES.flatMap(({ code }) => paths.map((path) => localizedPath(code, path)))

export const PRERENDER_ROUTES = expand([...PAGES, ERROR_PAGE])

export const INDEXABLE_ROUTES = expand(PAGES)
