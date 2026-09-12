export const LOCALES = [
  { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' },
  { code: 'en', language: 'en', name: 'English', file: 'en.json' }
] as const

export type Locale = (typeof LOCALES)[number]['code']

export const DEFAULT_LOCALE = 'zh' satisfies Locale

export const isLocale = (value: unknown): value is Locale =>
  LOCALES.some((locale) => locale.code === value)

export const localeTag = (value: unknown): Locale =>
  isLocale(value) ? value : DEFAULT_LOCALE

export const localeLanguage = (value: unknown): string =>
  (LOCALES.find(({ code }) => code === localeTag(value)) ?? LOCALES[0]).language
