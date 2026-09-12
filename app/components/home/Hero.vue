<template>
  <section class="relative isolate flex flex-col overflow-hidden lg:min-h-[min(54rem,max(42rem,calc(100svh-3.5rem)))]">
    <div class="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pt-14 pb-16 sm:px-8 lg:pt-20 lg:pb-0">
      <p class="flex items-center gap-2.5 text-xs font-medium tracking-wider text-default-500">
        <span class="relative flex size-1.5 shrink-0">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-secondary opacity-75 motion-reduce:hidden" />
          <span class="relative inline-flex size-1.5 rounded-full bg-secondary" />
        </span>
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

      <!-- Background, not <img>: a display:none <img> is still downloaded, so an
           <img> hidden below lg would cost every phone the full keyvisual. -->
      <div
        aria-hidden="true"
        class="pointer-events-none absolute right-0 bottom-0 -z-10 hidden aspect-[1171/1400] h-[66%] max-h-[36rem] bg-[url(/images/hero-koi.webp)] bg-contain bg-bottom bg-no-repeat select-none lg:block xl:max-h-[40rem]"
      />
    </div>

    <div class="relative border-t border-kun bg-background/80 backdrop-blur-sm">
      <ul class="mx-auto grid w-full max-w-6xl grid-cols-4 divide-x divide-default-100 px-5 sm:px-8">
        <li
          v-for="item in MEDIA"
          :key="item.key"
          class="flex items-center gap-1.5 px-2.5 py-4 first:pl-0 sm:gap-3 sm:px-4"
        >
          <KunIcon :name="item.icon" class="shrink-0 text-sm text-default-400 sm:text-lg" />
          <span class="truncate text-[0.6875rem] text-default-600 sm:text-sm">{{ $t(`media.${item.key}`) }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MEDIA } from '~/constants/site'
</script>
