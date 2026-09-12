<template>
  <header
    class="sticky top-0 z-kun-sticky border-b border-kun bg-background/85 backdrop-blur-xl"
  >
    <div
      class="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-5 sm:px-8"
    >
      <NuxtLink :to="localePath('/')" class="flex items-center gap-2.5">
        <img
          src="/images/mark.webp"
          alt=""
          width="28"
          height="28"
          class="size-7 rounded-lg"
        />
        <span class="text-sm font-semibold tracking-tight text-foreground">{{
          $t('brand.name')
        }}</span>
      </NuxtLink>

      <nav
        :aria-label="$t('nav.menu')"
        class="ml-auto hidden items-center gap-7 text-sm md:flex"
      >
        <NuxtLink
          v-for="link in anchors"
          :key="link.hash"
          :to="{ path: localePath('/'), hash: link.hash }"
          class="text-default-600 transition-colors hover:text-foreground"
        >
          {{ $t(link.label) }}
        </NuxtLink>
        <a
          v-for="link in external"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noopener noreferrer"
          class="text-default-600 transition-colors hover:text-foreground"
        >
          {{ $t(link.label) }}
        </a>
      </nav>

      <div class="ml-auto md:ml-0">
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
] as const

const external = [
  { href: PLATFORM.developer, label: 'nav.developer' },
  { href: PLATFORM.docs, label: 'nav.docs' }
] as const
</script>
