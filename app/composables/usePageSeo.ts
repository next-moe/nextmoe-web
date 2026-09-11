import { SITE_URL } from '~/constants/site'

export const usePageSeo = (key: 'home' | 'privacy' | 'terms') => {
  const { t } = useI18n()

  const title = () => t(`seo.${key}.title`)
  const description = () => t(`seo.${key}.description`)
  const image = `${SITE_URL}/images/og-cover.jpg`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogSiteName: 'NextMoe',
    ogImage: image,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: () => t('brand.name'),
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image
  })
}
