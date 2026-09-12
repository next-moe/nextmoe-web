<template>
  <ClientOnly>
    <KunButtonGroup :aria-label="$t('theme.label')" class-name="shrink-0">
      <KunButton
        v-for="option in THEME_OPTIONS"
        :key="option.value"
        size="sm"
        is-icon-only
        :variant="colorMode.preference === option.value ? 'flat' : 'light'"
        :color="colorMode.preference === option.value ? 'primary' : 'default'"
        :aria-label="$t(`theme.${option.value}`)"
        @click="colorMode.preference = option.value"
      >
        <KunIcon :name="option.icon" />
      </KunButton>
    </KunButtonGroup>

    <template #fallback>
      <div class="h-8 w-[6.75rem] shrink-0" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { THEME_OPTIONS } from '~/constants/site'

const colorMode = useColorMode()
</script>
