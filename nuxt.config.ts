import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-09-11',
  devtools: { enabled: false },
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
        { name: 'theme-color', content: '#f5f8fd' }
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
  i18n: {
    baseUrl: 'https://www.nextmoe.com',
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'zh', language: 'zh-CN', name: '中文', dir: 'ltr', file: 'zh.json' },
      { code: 'en', language: 'en', name: 'English', dir: 'ltr', file: 'en.json' }
    ]
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      failOnError: true,
      routes: ['/', '/en', '/privacy', '/en/privacy', '/terms', '/en/terms', '/404', '/en/404']
    }
  }
})
