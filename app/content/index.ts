import type { Locale } from '#shared/constants/locale'
import type { LegalDoc } from '#shared/types/legal'
import { privacyEn } from './privacy.en'
import { privacyZh } from './privacy.zh'
import { termsEn } from './terms.en'
import { termsZh } from './terms.zh'

export type LegalName = 'privacy' | 'terms'

const docs: Record<LegalName, Record<Locale, LegalDoc>> = {
  privacy: { zh: privacyZh, en: privacyEn },
  terms: { zh: termsZh, en: termsEn }
}

export const legalDoc = (name: LegalName, locale: Locale): LegalDoc =>
  docs[name][locale]
