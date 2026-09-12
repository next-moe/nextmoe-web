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

export const MEDIA = [
  { key: 'anime', icon: 'lucide:clapperboard' },
  { key: 'manga', icon: 'lucide:book-image' },
  { key: 'game', icon: 'lucide:gamepad-2' },
  { key: 'novel', icon: 'lucide:book-open-text' }
] as const

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
  { key: 'portal', color: 'success', icon: 'lucide:globe' },
  { key: 'account', color: 'primary', icon: 'lucide:key-round' },
  { key: 'platform', color: 'secondary', icon: 'lucide:layers' }
] as const

export const ACCOUNT_FEATURES = ['sso', 'federation', 'consent', 'privacy'] as const

export const THEME_OPTIONS = [
  { value: 'light', icon: 'lucide:sun' },
  { value: 'dark', icon: 'lucide:moon' },
  { value: 'system', icon: 'lucide:monitor' }
] as const
