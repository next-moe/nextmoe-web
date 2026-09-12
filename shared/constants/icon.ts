// `icon.fallbackToApi` is off, so an icon missing from this list renders nothing
// at all rather than falling back to a network request. `pnpm gate:icon` asserts
// the list and the icons the code references are the same set.
export const ICON_NAMES = [
  'lucide:arrow-down',
  'lucide:arrow-left',
  'lucide:arrow-up-right',
  'lucide:globe',
  'lucide:key-round',
  'lucide:layers',
  'lucide:monitor',
  'lucide:moon',
  'lucide:sun'
]
