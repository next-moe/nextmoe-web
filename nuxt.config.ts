import tailwindcss from '@tailwindcss/vite'
import { DEFAULT_LOCALE, LOCALES } from './shared/constants/locale'
import { PRERENDER_ROUTES } from './shared/constants/routes'
import { ICON_NAMES } from './shared/constants/icon'
import { SITE_URL } from './shared/constants/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-11',
  devtools: { enabled: false },
  extends: ['@kungal/ui-nuxt'],
  modules: ['@nuxt/eslint', '@nuxtjs/i18n', '@nuxtjs/color-mode'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    // KunUI keys its config to a module-scoped Symbol, so it must be one module
    // instance. Vite's dev pre-bundler was serving the layer plugin the raw
    // source and <KunIcon> the optimized copy: two symbols, inject missed the
    // provide, and every icon hydrated into a comment node.
    optimizeDeps: { exclude: ['@kungal/ui-vue'] }
  },
  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          name: 'theme-color',
          content: '#f4f4f7',
          media: '(prefers-color-scheme: light)'
        },
        {
          name: 'theme-color',
          content: '#0d0d0d',
          media: '(prefers-color-scheme: dark)'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },
  eslint: {
    config: { stylistic: false }
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: 'kun-',
    classSuffix: '-mode',
    storageKey: 'nextmoe-color-mode'
  },
  icon: {
    mode: 'svg',
    serverBundle: 'local',
    clientBundle: { icons: ICON_NAMES, scan: false },
    fallbackToApi: false
  },
  i18n: {
    baseUrl: SITE_URL,
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
