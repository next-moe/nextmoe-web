<template>
  <section class="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
    <div class="grid items-center gap-10 lg:grid-cols-[1fr_0.85fr]">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-sakura-500">{{ $t('status.eyebrow') }}</p>
        <h2 class="mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{{ $t('status.title') }}</h2>
        <p class="mt-5 text-base leading-relaxed text-ink-600">{{ $t('status.body') }}</p>

        <dl class="mt-8 space-y-3">
          <div
            v-for="item in items"
            :key="item.key"
            class="flex flex-col gap-2 rounded-2xl border border-ink-200/70 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:gap-4"
          >
            <span
              class="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset"
              :class="item.chip"
            >
              <span class="size-1.5 rounded-full bg-current" />
              {{ $t(`status.items.${item.key}.state`) }}
            </span>
            <div class="min-w-0">
              <dt class="text-sm font-semibold text-ink-900">{{ $t(`status.items.${item.key}.name`) }}</dt>
              <dd class="mt-0.5 text-sm leading-relaxed text-ink-500">{{ $t(`status.items.${item.key}.note`) }}</dd>
            </div>
          </div>
        </dl>
      </div>

      <div class="relative">
        <div class="rounded-[2rem] border border-white bg-moe-50 p-6 shadow-[0_20px_50px_-24px_rgba(31,58,99,0.35)]">
          <img
            src="/images/desk-character.webp"
            :alt="$t('account.imageAlt')"
            width="1350"
            height="760"
            loading="lazy"
            decoding="async"
            class="w-full select-none drop-shadow-[0_16px_30px_rgba(31,58,99,0.14)]"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const items = [
  { key: 'portal', chip: 'bg-mint-100 text-mint-500 ring-mint-300' },
  { key: 'account', chip: 'bg-moe-50 text-moe-600 ring-moe-200' },
  { key: 'platform', chip: 'bg-sakura-50 text-sakura-600 ring-sakura-200' }
]
</script>
