import { localeLanguage, localeTag } from '#shared/constants/locale'
import { canonicalUrl } from '#shared/constants/routes'
import {
  BRAND_NAME,
  BRAND_NAME_FULL,
  EFFECTIVE_DATE,
  FOUNDED_YEAR,
  LOGO_IMAGE,
  OG_IMAGE,
  SITE_URL,
  SUPPORT_EMAIL
} from '#shared/constants/site'
import { MEMBER_SITES } from '~/constants/site'

type PageKey = 'home' | 'privacy' | 'terms'

const ORGANIZATION = `${SITE_URL}/#organization`
const WEBSITE = `${SITE_URL}/#website`

export const usePageSeo = (key: PageKey) => {
  const { t, locale } = useI18n()
  const route = useRoute()

  const title = () => t(`seo.${key}.title`)
  const description = () => t(`seo.${key}.description`)
  const image = `${SITE_URL}${OG_IMAGE.path}`
  const pageUrl = computed(
    () => `${SITE_URL}${route.path === '/' ? '' : route.path}`
  )

  useSeoMeta({
    title,
    description,
    // Defaults cap Google at a 160-char snippet and a thumbnail-sized preview;
    // the large preview is what makes the card carry og-cover.jpg.
    robots:
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    ogTitle: title,
    ogDescription: description,
    ogType: key === 'home' ? 'website' : 'article',
    ogSiteName: BRAND_NAME,
    ogImage: image,
    ogImageType: OG_IMAGE.type,
    ogImageWidth: OG_IMAGE.width,
    ogImageHeight: OG_IMAGE.height,
    ogImageAlt: () => t('brand.name'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: () => t('brand.name')
  })

  const graph = computed(() => {
    const url = pageUrl.value
    const inLanguage = localeLanguage(locale.value)

    const page: Record<string, unknown> = {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: title(),
      description: description(),
      isPartOf: { '@id': WEBSITE },
      about: { '@id': ORGANIZATION },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: image,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height
      },
      inLanguage
    }

    const extra: Record<string, unknown>[] = []

    if (key === 'home') {
      page.mainEntity = { '@id': `${url}#member-sites` }
      extra.push({
        '@type': 'ItemList',
        '@id': `${url}#member-sites`,
        name: t('sites.title'),
        itemListElement: MEMBER_SITES.map((site, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'WebSite',
            name: t(`sites.${site.key}.name`),
            description: t(`sites.${site.key}.desc`),
            url: site.url
          }
        }))
      })
    } else {
      page.datePublished = EFFECTIVE_DATE
      page.dateModified = EFFECTIVE_DATE
      page.breadcrumb = { '@id': `${url}#breadcrumb` }
      extra.push({
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('brand.name'),
            item: canonicalUrl(localeTag(locale.value), '/')
          },
          { '@type': 'ListItem', position: 2, name: t(`footer.${key}`) }
        ]
      })
    }

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': ORGANIZATION,
          name: BRAND_NAME,
          alternateName: BRAND_NAME_FULL,
          url: SITE_URL,
          email: SUPPORT_EMAIL,
          foundingDate: String(FOUNDED_YEAR),
          logo: {
            '@type': 'ImageObject',
            '@id': `${SITE_URL}/#logo`,
            url: `${SITE_URL}${LOGO_IMAGE.path}`,
            width: LOGO_IMAGE.width,
            height: LOGO_IMAGE.height,
            caption: BRAND_NAME
          }
        },
        {
          '@type': 'WebSite',
          '@id': WEBSITE,
          url: SITE_URL,
          name: t('brand.name'),
          description: t('seo.home.description'),
          publisher: { '@id': ORGANIZATION },
          inLanguage
        },
        page,
        ...extra
      ]
    }
  })

  useHead({
    script: [
      {
        id: 'nextmoe-schema',
        type: 'application/ld+json',
        innerHTML: () => JSON.stringify(graph.value)
      }
    ]
  })
}
