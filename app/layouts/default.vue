<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-kun-modal focus:rounded-kun-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-content1"
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
