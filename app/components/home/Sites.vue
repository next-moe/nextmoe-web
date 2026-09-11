<template>
  <section id="sites" class="scroll-mt-20 border-y border-ink-200/60 bg-white">
    <div class="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
      <div class="max-w-2xl">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-moe-500">{{ $t('sites.eyebrow') }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{{ $t('sites.title') }}</h2>
        <p class="mt-5 text-base leading-relaxed text-ink-600">{{ $t('sites.body') }}</p>
      </div>

      <ul class="mt-10 grid gap-5 md:grid-cols-3">
        <li v-for="site in MEMBER_SITES" :key="site.key">
          <a
            :href="site.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex h-full flex-col rounded-2xl border border-ink-200/80 bg-ink-50/60 p-6 transition-all hover:-translate-y-1 hover:border-transparent hover:bg-white hover:shadow-[0_22px_44px_-24px_rgba(31,58,99,0.45)]"
          >
            <span
              class="mb-5 inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white shadow-md"
              :class="site.ring"
              aria-hidden="true"
            >
              {{ site.mark }}
            </span>

            <h3 class="text-lg font-semibold text-ink-900">{{ $t(`sites.${site.key}.name`) }}</h3>
            <span class="mt-2 w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset" :class="site.chip">
              {{ site.host }}
            </span>
            <p class="mt-4 flex-1 text-sm leading-relaxed text-ink-500">{{ $t(`sites.${site.key}.desc`) }}</p>

            <span class="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 transition-colors group-hover:text-moe-600">
              {{ $t('sites.visit') }}
              <span class="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MEMBER_SITES } from '~/constants/site'
</script>
