<template>
  <header class="sticky top-0 z-50 border-b border-white/70 glass">
    <div class="mx-auto flex w-full max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
      <NuxtLink :to="localePath('/')" class="group flex items-center gap-2.5">
        <img
          src="/favicon.webp"
          alt=""
          width="36"
          height="36"
          class="size-9 rounded-xl ring-1 ring-ink-200/70 transition-transform group-hover:-rotate-6"
        >
        <span class="text-base font-semibold tracking-tight text-ink-900">{{ $t('brand.name') }}</span>
      </NuxtLink>

      <nav :aria-label="$t('nav.menu')" class="ml-auto hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="link in anchors"
          :key="link.hash"
          :to="{ path: localePath('/'), hash: link.hash }"
          class="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-white/70 hover:text-ink-900"
        >
          {{ $t(link.label) }}
        </NuxtLink>
        <a
          v-for="link in external"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-white/70 hover:text-ink-900"
        >
          {{ $t(link.label) }}
        </a>
      </nav>

      <div class="ml-auto md:ml-2">
        <SiteLocaleSwitch />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PLATFORM } from '~/constants/site'

const localePath = useLocalePath()

const anchors = [
  { hash: '#sites', label: 'nav.sites' },
  { hash: '#account', label: 'nav.account' }
]

const external = [
  { href: PLATFORM.developer, label: 'nav.developer' },
  { href: PLATFORM.docs, label: 'nav.docs' }
]
</script>
