<template>
  <footer class="mt-auto border-t border-kun bg-content1">
    <div class="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div class="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div class="flex items-center gap-2.5">
            <img src="/images/mark.webp" alt="" width="28" height="28" class="size-7 rounded-lg">
            <span class="text-sm font-semibold tracking-tight text-foreground">{{ $t('brand.name') }}</span>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-default-500">{{ $t('footer.about') }}</p>
        </div>

        <div>
          <h2 class="text-xs font-semibold tracking-[0.2em] text-default-400 uppercase">{{ $t('footer.platform') }}</h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="link in platformLinks" :key="link.href">
              <a
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
                class="text-default-600 transition-colors hover:text-primary"
              >
                {{ $t(link.label) }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xs font-semibold tracking-[0.2em] text-default-400 uppercase">{{ $t('footer.member') }}</h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="site in MEMBER_SITES" :key="site.key">
              <a
                :href="site.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-default-600 transition-colors hover:text-primary"
              >
                {{ $t(`sites.${site.key}.name`) }}
                <span class="text-default-400">· {{ site.host }}</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xs font-semibold tracking-[0.2em] text-default-400 uppercase">{{ $t('footer.legal') }}</h2>
          <ul class="mt-5 space-y-3 text-sm">
            <li>
              <NuxtLink :to="localePath('/privacy')" class="font-medium text-default-700 transition-colors hover:text-primary">
                {{ $t('footer.privacy') }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/terms')" class="font-medium text-default-700 transition-colors hover:text-primary">
                {{ $t('footer.terms') }}
              </NuxtLink>
            </li>
          </ul>

          <h2 class="mt-8 text-xs font-semibold tracking-[0.2em] text-default-400 uppercase">{{ $t('footer.contact') }}</h2>
          <p class="mt-4 text-sm text-default-500">{{ $t('footer.contactNote') }}</p>
          <KunLink :href="`mailto:${SUPPORT_EMAIL}`" color="primary" underline="hover" class-name="mt-1.5 text-sm font-medium">
            {{ SUPPORT_EMAIL }}
          </KunLink>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-6 border-t border-kun pt-7 sm:flex-row sm:items-start sm:justify-between">
        <div class="space-y-2 text-xs text-default-400">
          <p>© {{ FOUNDED_YEAR }}–{{ year }} NextMoe. {{ $t('footer.rights') }}</p>
          <p class="max-w-xl">{{ $t('footer.notice') }}</p>
        </div>
        <SiteThemeSwitch />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { FOUNDED_YEAR, MEMBER_SITES, PLATFORM, SUPPORT_EMAIL } from '~/constants/site'

const localePath = useLocalePath()
const year = new Date().getFullYear()

const platformLinks = [
  { href: PLATFORM.account, label: 'footer.account' },
  { href: PLATFORM.developer, label: 'nav.developer' },
  { href: PLATFORM.docs, label: 'nav.docs' }
] as const
</script>
