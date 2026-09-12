<template>
  <section class="relative isolate flex min-h-[min(54rem,max(42rem,calc(100svh-3.5rem)))] flex-col overflow-hidden">
    <div class="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-14 sm:px-8 lg:pt-20">
      <p class="flex items-center gap-2.5 text-xs font-medium tracking-wider text-default-500 uppercase">
        <span class="size-1.5 rounded-full bg-secondary" />
        {{ $t('hero.badge') }}
      </p>

      <h1 class="mt-8 text-[clamp(2.75rem,10.5vw,8.5rem)] leading-[0.92] font-semibold tracking-[-0.035em] text-foreground">
        {{ $t('brand.name') }}
      </h1>

      <p class="mt-6 max-w-xl text-lg leading-snug font-medium tracking-tight break-keep text-balance text-foreground sm:text-2xl lg:max-w-[58%]">
        {{ $t('brand.slogan') }}
      </p>

      <div class="mt-10 max-w-md border-l border-kun pl-6 sm:max-w-lg lg:mt-14">
        <p class="text-base leading-relaxed text-default-600">{{ $t('hero.lead') }}</p>
        <p class="mt-4 text-sm leading-relaxed text-default-500">{{ $t('hero.body') }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <KunButton href="#sites" size="lg" icon icon-position="right">
            {{ $t('hero.ctaSites') }}
            <template #icon>
              <KunIcon name="lucide:arrow-down" />
            </template>
          </KunButton>
          <KunButton href="#account" size="lg" variant="bordered" color="default">
            {{ $t('hero.ctaAccount') }}
          </KunButton>
        </div>
      </div>

      <img
        src="/images/hero-koi.webp"
        :alt="$t('hero.imageAlt')"
        width="1171"
        height="1400"
        fetchpriority="high"
        decoding="async"
        class="pointer-events-none mx-auto mt-auto -z-10 block w-[68%] max-w-[17rem] shrink-0 select-none lg:absolute lg:right-0 lg:bottom-0 lg:mx-0 lg:mt-0 lg:h-[66%] lg:max-h-[36rem] lg:w-auto lg:max-w-none xl:max-h-[40rem]"
      >
    </div>

    <div class="relative border-t border-kun bg-background/80 backdrop-blur-sm">
      <ul class="mx-auto grid w-full max-w-6xl grid-cols-4 divide-x divide-default-100 px-5 sm:px-8">
        <li
          v-for="(key, index) in MEDIA"
          :key="key"
          class="flex items-baseline gap-2 px-3 py-4 first:pl-0 sm:gap-3 sm:px-4"
        >
          <span class="hidden text-xs tabular-nums text-default-300 sm:inline">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="truncate text-xs text-default-600 sm:text-sm">{{ $t(`media.${key}`) }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MEDIA } from '~/constants/site'
</script>
