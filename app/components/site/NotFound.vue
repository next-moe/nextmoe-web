<template>
  <section
    class="mx-auto flex w-full max-w-6xl flex-col justify-center px-5 py-28 sm:px-8 lg:min-h-[calc(100svh-3.5rem)] lg:py-32"
  >
    <p
      class="text-[clamp(5rem,20vw,16rem)] leading-[0.85] font-semibold tracking-[-0.05em] text-default-200"
    >
      {{ status }}
    </p>

    <div class="mt-12 flex gap-7 border-t border-kun pt-10">
      <p
        class="hidden shrink-0 self-start border-r border-kun pr-5 text-[11px] tracking-[0.2em] text-default-400 uppercase rail-label lg:block"
      >
        {{ $t('brand.tagline') }}
      </p>

      <div class="max-w-md">
        <h1
          class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {{ isNotFound ? $t('error.title404') : $t('error.titleOther') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-default-500">
          {{ isNotFound ? $t('error.body404') : $t('error.bodyOther') }}
        </p>
        <KunButton :href="localePath('/')" size="lg" icon class-name="mt-8">
          <template #icon>
            <KunIcon name="lucide:arrow-left" />
          </template>
          {{ $t('error.back') }}
        </KunButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ status?: number }>(), { status: 404 })

const localePath = useLocalePath()
const isNotFound = computed(() => props.status === 404)
</script>
