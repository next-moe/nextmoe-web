<template>
  <section id="account" class="scroll-mt-20">
    <div class="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
      <div class="relative overflow-hidden rounded-[2rem] border border-white bg-[linear-gradient(135deg,#f1f6ff_0%,#ffffff_45%,#fdf0f6_100%)] shadow-[0_28px_60px_-32px_rgba(31,58,99,0.4)]">
        <div class="absolute -right-20 -top-24 size-80 rounded-full bg-moe-200/40 blur-3xl" />

        <div class="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-moe-500">{{ $t('account.eyebrow') }}</p>
            <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{{ $t('account.title') }}</h2>
            <p class="mt-5 text-base leading-relaxed text-ink-600">{{ $t('account.body') }}</p>

            <dl class="mt-8 grid gap-4 sm:grid-cols-2">
              <div v-for="key in features" :key="key" class="rounded-xl border border-ink-200/60 bg-white/80 p-4">
                <dt class="text-sm font-semibold text-ink-900">{{ $t(`account.features.${key}.name`) }}</dt>
                <dd class="mt-1 text-sm leading-relaxed text-ink-500">{{ $t(`account.features.${key}.note`) }}</dd>
              </div>
            </dl>

            <div class="mt-8 flex flex-wrap gap-3">
              <a
                :href="PLATFORM.account"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 rounded-xl bg-moe-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-moe-600/25 transition-all hover:-translate-y-0.5 hover:bg-moe-700"
              >
                {{ $t('account.openAccount') }}
                <span aria-hidden="true">↗</span>
              </a>
              <NuxtLink
                :to="localePath('/privacy')"
                class="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-moe-300 hover:text-moe-700"
              >
                {{ $t('account.readPrivacy') }}
              </NuxtLink>
            </div>
          </div>

          <div class="relative">
            <div class="absolute left-1/2 top-1/2 size-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(176,206,255,0.7)_0%,rgba(255,201,229,0.45)_48%,rgba(255,255,255,0)_72%)] sm:size-[24rem]" />
            <img
              src="/images/bloom-character.webp"
              :alt="$t('account.bloomAlt')"
              width="966"
              height="620"
              loading="lazy"
              decoding="async"
              class="relative w-full select-none drop-shadow-[0_20px_38px_rgba(31,58,99,0.24)]"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PLATFORM } from '~/constants/site'

const localePath = useLocalePath()
const features = ['sso', 'federation', 'consent', 'privacy']
</script>
