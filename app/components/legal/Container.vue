<template>
  <LegalDocument :doc="doc" />
</template>

<script setup lang="ts">
import { localeTag } from '#shared/constants/locale'
import { legalDoc, type LegalName } from '~/content'

const props = defineProps<{ name: LegalName }>()

const { locale } = useI18n()

usePageSeo(props.name)

const doc = computed(() => legalDoc(props.name, localeTag(locale.value)))
</script>
