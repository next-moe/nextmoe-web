<template>
  <div class="flex min-h-screen flex-col bg-ink-50">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      {{ $t('nav.skip') }}
    </a>

    <SiteHeader />

    <main id="main" class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
