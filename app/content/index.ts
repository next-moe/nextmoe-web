import type { LegalDoc } from '#shared/types/legal'
import { privacyEn } from './privacy.en'
import { privacyZh } from './privacy.zh'
import { termsEn } from './terms.en'
import { termsZh } from './terms.zh'

const docs: Record<string, Record<string, LegalDoc>> = {
  privacy: { zh: privacyZh, en: privacyEn },
  terms: { zh: termsZh, en: termsEn }
}

export const legalDoc = (name: 'privacy' | 'terms', locale: string): LegalDoc =>
  docs[name]![locale] ?? docs[name]!.zh!
