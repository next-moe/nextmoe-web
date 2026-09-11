<template>
  <article>
    <header class="relative isolate overflow-hidden border-b border-ink-200/60">
      <div class="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#eef4ff_0%,#f7f9fd_100%)]" />
      <div class="absolute -right-24 -top-24 -z-10 size-96 rounded-full bg-sakura-200/35 blur-3xl" />

      <div class="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 lg:py-16">
        <NuxtLink :to="localePath('/')" class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 transition-colors hover:text-moe-600">
          <span aria-hidden="true">←</span>
          {{ $t('legal.backHome') }}
        </NuxtLink>

        <h1 class="mt-5 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">{{ doc.title }}</h1>
        <p class="mt-4 max-w-3xl text-base leading-relaxed text-ink-600">{{ doc.summary }}</p>
        <p class="mt-5 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-ink-600">
          {{ $t('legal.effective') }}
          <span class="font-semibold text-ink-900">{{ EFFECTIVE_DATE }}</span>
        </p>
      </div>
    </header>

    <div class="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[16rem_1fr] lg:py-16">
      <nav :aria-label="$t('legal.toc')" class="lg:sticky lg:top-24 lg:self-start">
        <h2 class="text-xs font-semibold uppercase tracking-wider text-ink-400">{{ $t('legal.toc') }}</h2>
        <ul class="mt-4 space-y-1.5 border-l border-ink-200 pl-4 text-sm">
          <li v-for="section in doc.sections" :key="section.id">
            <a :href="`#${section.id}`" class="block py-0.5 text-ink-500 transition-colors hover:text-moe-600">
              {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="min-w-0 max-w-3xl">
        <section
          v-for="section in doc.sections"
          :key="section.id"
          :id="section.id"
          class="scroll-mt-24 border-b border-ink-100 py-7 first:pt-0 last:border-none"
        >
          <h2 class="text-xl font-semibold tracking-tight text-ink-950">{{ section.title }}</h2>

          <p
            v-for="(paragraph, index) in section.body"
            :key="`p-${index}`"
            class="mt-4 text-[15px] leading-[1.85] text-ink-600 [&_a]:font-medium [&_a]:text-moe-600 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-moe-700 [&_strong]:font-semibold [&_strong]:text-ink-900"
            v-html="paragraph"
          />

          <ul v-if="section.list" class="mt-4 space-y-2.5">
            <li
              v-for="(entry, index) in section.list"
              :key="`l-${index}`"
              class="relative pl-6 text-[15px] leading-[1.85] text-ink-600 [&_a]:font-medium [&_a]:text-moe-600 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-moe-700 [&_strong]:font-semibold [&_strong]:text-ink-900"
            >
              <span class="absolute left-1 top-[0.72em] size-1.5 rounded-full bg-moe-300" aria-hidden="true" />
              <span v-html="entry" />
            </li>
          </ul>
        </section>

        <div class="mt-10 rounded-2xl border border-moe-100 bg-moe-50/70 p-6">
          <h2 class="text-sm font-semibold text-ink-900">{{ $t('legal.contactTitle') }}</h2>
          <p class="mt-2 text-sm text-ink-600">{{ $t('legal.contactBody') }}</p>
          <a :href="`mailto:${SUPPORT_EMAIL}`" class="mt-1 inline-block text-sm font-semibold text-moe-600 underline underline-offset-4">
            {{ SUPPORT_EMAIL }}
          </a>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { LegalDoc } from '#shared/types/legal'
import { EFFECTIVE_DATE, SUPPORT_EMAIL } from '~/constants/site'

defineProps<{ doc: LegalDoc }>()

const localePath = useLocalePath()
</script>
