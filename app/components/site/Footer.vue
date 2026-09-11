<template>
  <footer class="mt-auto border-t border-ink-200/70 bg-white">
    <div class="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-1">
          <div class="flex items-center gap-2.5">
            <img src="/favicon.webp" alt="" width="32" height="32" class="size-8 rounded-lg ring-1 ring-ink-200/70">
            <span class="font-semibold tracking-tight text-ink-900">{{ $t('brand.name') }}</span>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-ink-500">{{ $t('footer.about') }}</p>
        </div>

        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-400">{{ $t('footer.platform') }}</h2>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li>
              <a :href="PLATFORM.account" target="_blank" rel="noopener noreferrer" class="text-ink-600 transition-colors hover:text-moe-600">
                {{ $t('footer.account') }}
              </a>
            </li>
            <li>
              <a :href="PLATFORM.developer" target="_blank" rel="noopener noreferrer" class="text-ink-600 transition-colors hover:text-moe-600">
                {{ $t('nav.developer') }}
              </a>
            </li>
            <li>
              <a :href="PLATFORM.docs" target="_blank" rel="noopener noreferrer" class="text-ink-600 transition-colors hover:text-moe-600">
                {{ $t('nav.docs') }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-400">{{ $t('footer.member') }}</h2>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li v-for="site in MEMBER_SITES" :key="site.key">
              <a :href="site.url" target="_blank" rel="noopener noreferrer" class="text-ink-600 transition-colors hover:text-moe-600">
                {{ $t(`sites.${site.key}.name`) }}
                <span class="text-ink-400">· {{ site.host }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-400">{{ $t('footer.legal') }}</h2>
          <ul class="mt-4 space-y-2.5 text-sm">
            <li>
              <NuxtLink :to="localePath('/privacy')" class="font-medium text-ink-700 transition-colors hover:text-moe-600">
                {{ $t('footer.privacy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/terms')" class="font-medium text-ink-700 transition-colors hover:text-moe-600">
                {{ $t('footer.terms') }}
              </NuxtLink>
            </li>
          </ul>

          <h2 class="mt-7 text-xs font-semibold uppercase tracking-wider text-ink-400">{{ $t('footer.contact') }}</h2>
          <p class="mt-3 text-sm text-ink-500">{{ $t('footer.contactNote') }}</p>
          <a :href="`mailto:${SUPPORT_EMAIL}`" class="mt-1.5 inline-block text-sm font-medium text-moe-600 underline-offset-4 hover:underline">
            {{ SUPPORT_EMAIL }}
          </a>
        </div>
      </div>

      <div class="mt-12 flex flex-col gap-3 border-t border-ink-100 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} NextMoe. {{ $t('footer.rights') }}</p>
        <p class="max-w-xl sm:text-right">{{ $t('footer.notice') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MEMBER_SITES, PLATFORM, SUPPORT_EMAIL } from '~/constants/site'

const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>
