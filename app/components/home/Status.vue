<template>
  <section class="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
    <div class="max-w-2xl">
      <p class="text-xs font-semibold tracking-[0.2em] text-secondary uppercase">{{ $t('status.eyebrow') }}</p>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{{ $t('status.title') }}</h2>
      <p class="mt-5 text-base leading-relaxed text-default-600">{{ $t('status.body') }}</p>
    </div>

    <ol class="mt-14 border-t border-kun">
      <li
        v-for="(item, index) in STATUS_ITEMS"
        :key="item.key"
        class="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 gap-y-2 border-b border-kun py-7 lg:grid-cols-[2.5rem_14rem_1fr_7rem]"
      >
        <span class="text-sm tabular-nums text-default-300">{{ String(index + 1).padStart(2, '0') }}</span>
        <h3 class="text-lg font-semibold text-foreground">{{ $t(`status.items.${item.key}.name`) }}</h3>
        <p class="col-start-2 text-sm leading-relaxed text-default-500 lg:col-start-auto">{{ $t(`status.items.${item.key}.note`) }}</p>
        <KunChip :color="item.color" size="sm" variant="flat" class-name="col-start-2 justify-self-start lg:col-start-auto lg:justify-self-end">
          {{ $t(`status.items.${item.key}.state`) }}
        </KunChip>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { STATUS_ITEMS } from '~/constants/site'
</script>
