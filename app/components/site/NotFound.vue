<template>
  <section class="relative isolate overflow-hidden">
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eef4ff_0%,#f7f9fd_100%)]" />
    <div class="absolute -left-20 top-6 -z-10 size-80 rounded-full bg-moe-200/40 blur-3xl" />

    <div class="mx-auto grid w-full max-w-4xl items-center gap-8 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <p class="text-7xl font-bold tracking-tight text-brand-gradient sm:text-8xl">{{ status }}</p>
        <h1 class="mt-5 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
          {{ isNotFound ? $t('error.title404') : $t('error.titleOther') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-ink-600">
          {{ isNotFound ? $t('error.body404') : $t('error.bodyOther') }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-ink-900/15 transition-all hover:-translate-y-0.5 hover:bg-ink-800"
        >
          <span aria-hidden="true">←</span>
          {{ $t('error.back') }}
        </NuxtLink>
      </div>

      <img
        src="/images/lost-character.webp"
        :alt="$t('error.imageAlt')"
        width="617"
        height="560"
        class="w-full select-none drop-shadow-[0_18px_34px_rgba(31,58,99,0.16)]"
      >
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ status?: number }>(), { status: 404 })

const localePath = useLocalePath()
const isNotFound = computed(() => props.status === 404)
</script>
