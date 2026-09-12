<template>
  <nav
    :aria-label="$t('locale.switch')"
    class="flex items-center gap-3 text-sm"
  >
    <template v-for="(item, index) in locales" :key="item.code">
      <span v-if="index" aria-hidden="true" class="text-default-300">/</span>
      <NuxtLink
        :to="switchLocalePath(item.code)"
        :hreflang="item.language"
        :aria-current="item.code === locale ? 'true' : undefined"
        class="transition-colors"
        :class="
          item.code === locale
            ? 'font-semibold text-foreground'
            : 'text-default-500 hover:text-foreground'
        "
      >
        {{ item.name }}
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>
