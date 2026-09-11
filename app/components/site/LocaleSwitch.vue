<template>
  <nav :aria-label="$t('locale.switch')" class="inline-flex items-center rounded-full border border-ink-200/80 bg-white/80 p-1 shadow-sm">
    <NuxtLink
      v-for="item in locales"
      :key="item.code"
      :to="switchLocalePath(item.code)"
      :hreflang="item.language"
      :aria-current="item.code === locale ? 'true' : undefined"
      class="rounded-full px-3 py-1 text-sm font-medium transition-colors"
      :class="
        item.code === locale
          ? 'bg-ink-900 text-white shadow-sm'
          : 'text-ink-600 hover:bg-ink-100 hover:text-ink-900'
      "
    >
      {{ item.name }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>
