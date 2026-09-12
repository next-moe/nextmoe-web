<template>
  <SiteNotFound />
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({ meta: [{ name: 'robots', content: 'noindex, follow' }] })
useSeoMeta({
  title: () => t('error.title404'),
  description: () => t('error.body404')
})
</script>
