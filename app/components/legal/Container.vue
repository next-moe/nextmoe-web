<template>
  <LegalDocument :doc="doc" />
</template>

<script setup lang="ts">
import { legalDoc } from '~/content'

const props = defineProps<{ name: 'privacy' | 'terms' }>()

const { locale } = useI18n()

usePageSeo(props.name)

const doc = computed(() => legalDoc(props.name, locale.value))
</script>
