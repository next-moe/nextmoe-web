export const SITE_URL = 'https://www.nextmoe.com'
export const SUPPORT_EMAIL = 'support@nextmoe.com'
export const EFFECTIVE_DATE = '2026-09-11'

export const PLATFORM = {
  account: 'https://account.nextmoe.com',
  developer: 'https://developer.nextmoe.dev',
  docs: 'https://docs-kungal.nextmoe.dev'
} as const

export const GOOGLE_USER_DATA_POLICY =
  'https://developers.google.com/terms/api-services-user-data-policy'

export interface MemberSite {
  key: string
  host: string
  url: string
  mark: string
  ring: string
  chip: string
}

export const MEMBER_SITES: MemberSite[] = [
  {
    key: 'kungal',
    host: 'kungal.com',
    url: 'https://www.kungal.com',
    mark: '鲲',
    ring: 'from-moe-400 to-moe-600',
    chip: 'bg-moe-50 text-moe-700 ring-moe-200'
  },
  {
    key: 'moyu',
    host: 'moyu.moe',
    url: 'https://moyu.moe',
    mark: '摸',
    ring: 'from-sakura-300 to-sakura-500',
    chip: 'bg-sakura-50 text-sakura-600 ring-sakura-200'
  },
  {
    key: 'letmoe',
    host: 'letmoe.com',
    url: 'https://letmoe.com',
    mark: '萌',
    ring: 'from-mint-300 to-mint-500',
    chip: 'bg-mint-100 text-ink-700 ring-mint-300'
  }
]
