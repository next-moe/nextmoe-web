import tailwindcss from '@tailwindcss/vite'
import { DEFAULT_LOCALE, LOCALES } from './shared/constants/locale'
import { PRERENDER_ROUTES } from './shared/constants/routes'
import { ICON_NAMES } from './shared/constants/icon'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-11',
  devtools: { enabled: false },
  extends: ['@kungal/ui-nuxt'],
  modules: ['@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#f4f4f7' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  icon: {
    mode: 'svg',
    serverBundle: 'local',
    clientBundle: { icons: ICON_NAMES, scan: false },
    fallbackToApi: false
  },
  i18n: {
    baseUrl: 'https://www.nextmoe.com',
    defaultLocale: DEFAULT_LOCALE,
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: LOCALES.map(({ code, language, name, file }) => ({
      code,
      language,
      name,
      dir: 'ltr' as const,
      file
    })),
    experimental: { strictSeo: true }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: PRERENDER_ROUTES
    }
  }
})
