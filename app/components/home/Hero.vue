<template>
  <section class="relative isolate overflow-hidden">
    <div class="absolute inset-0 -z-10 bg-moe-50" />
    <div class="absolute -left-24 top-10 -z-10 size-[28rem] rounded-full bg-moe-200/45 blur-3xl animate-koi-drift" />
    <div class="absolute -right-16 top-40 -z-10 size-[26rem] rounded-full bg-sakura-200/45 blur-3xl animate-koi-drift [animation-delay:-6s]" />

    <div class="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-6 lg:pb-24 lg:pt-20">
      <div class="max-w-xl">
        <p class="inline-flex items-center gap-2 rounded-full border border-moe-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-moe-700 shadow-sm">
          <span class="relative flex size-2">
            <span class="absolute inline-flex size-full animate-ping rounded-full bg-moe-400 opacity-70" />
            <span class="relative inline-flex size-2 rounded-full bg-moe-500" />
          </span>
          {{ $t('hero.badge') }}
        </p>

        <h1 class="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-ink-950 sm:text-5xl lg:text-6xl">
          <span class="text-brand-gradient">{{ $t('brand.name') }}</span>
        </h1>

        <p class="mt-4 text-lg font-medium text-ink-700 sm:text-xl">{{ $t('brand.tagline') }}</p>

        <p class="mt-6 text-base leading-relaxed text-ink-600">{{ $t('hero.lead') }}</p>
        <p class="mt-3 text-base leading-relaxed text-ink-500">{{ $t('hero.body') }}</p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a
            href="#sites"
            class="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-ink-900/15 transition-all hover:-translate-y-0.5 hover:bg-ink-800"
          >
            {{ $t('hero.ctaSites') }}
            <span aria-hidden="true">↓</span>
          </a>
          <a
            href="#account"
            class="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white/90 px-5 py-3 text-sm font-semibold text-ink-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-moe-300 hover:text-moe-700"
          >
            {{ $t('hero.ctaAccount') }}
          </a>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-md lg:max-w-none">
        <div class="absolute left-1/2 top-1/2 -z-10 size-[23rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,200,255,0.45)_0%,rgba(255,196,226,0.3)_45%,rgba(255,255,255,0)_72%)] sm:size-[31rem]" />
        <img
          src="/images/hero-character.webp"
          :alt="$t('hero.imageAlt')"
          width="1279"
          height="900"
          fetchpriority="high"
          decoding="async"
          class="relative w-full animate-koi-float select-none drop-shadow-[0_26px_48px_rgba(31,58,99,0.26)]"
        >
      </div>
    </div>
  </section>
</template>
