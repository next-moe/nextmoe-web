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

export const MEDIA = ['anime', 'manga', 'game', 'novel'] as const

export const MEMBER_SITES = [
  {
    key: 'kungal',
    host: 'kungal.com',
    url: 'https://www.kungal.com',
    icon: '/images/sites/kungal.webp',
    accent: 'text-primary'
  },
  {
    key: 'moyu',
    host: 'moyu.moe',
    url: 'https://moyu.moe',
    icon: '/images/sites/moyu.webp',
    accent: 'text-secondary'
  },
  {
    key: 'letmoe',
    host: 'letmoe.com',
    url: 'https://letmoe.com',
    icon: '/images/sites/letmoe.webp',
    accent: 'text-success'
  }
] as const

export const STATUS_ITEMS = [
  { key: 'portal', color: 'success' },
  { key: 'account', color: 'primary' },
  { key: 'platform', color: 'secondary' }
] as const

export const ACCOUNT_FEATURES = ['sso', 'federation', 'consent', 'privacy'] as const
