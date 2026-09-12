<template>
  <NuxtLayout>
    <SiteNotFound :status="status" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const status = computed(() => props.error?.statusCode ?? 404)
</script>
