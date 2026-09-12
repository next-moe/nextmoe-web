<template>
  <article>
    <header class="border-b border-kun bg-content1">
      <div class="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex items-center gap-1.5 text-sm font-medium text-default-500 transition-colors hover:text-primary"
        >
          <KunIcon name="lucide:arrow-left" />
          {{ $t('legal.backHome') }}
        </NuxtLink>

        <h1 class="mt-8 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {{ doc.title }}
        </h1>
        <p class="mt-6 max-w-3xl text-base leading-relaxed text-default-600">
          {{ doc.summary }}
        </p>
        <p class="mt-8 flex items-baseline gap-2 text-xs tracking-wider text-default-400 uppercase">
          {{ $t('legal.effective') }}
          <span class="font-semibold text-foreground tabular-nums">{{ EFFECTIVE_DATE }}</span>
        </p>
      </div>
    </header>

    <div
      class="mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[15rem_1fr] lg:py-20"
    >
      <nav :aria-label="$t('legal.toc')" class="lg:sticky lg:top-20 lg:self-start">
        <h2 class="text-xs font-semibold tracking-[0.2em] text-default-400 uppercase">
          {{ $t('legal.toc') }}
        </h2>
        <ul class="mt-5 space-y-2 border-l border-kun pl-5 text-sm">
          <li v-for="section in doc.sections" :key="section.id">
            <a
              :href="`#${section.id}`"
              class="block text-default-500 transition-colors hover:text-primary"
            >
              {{ section.title }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="max-w-3xl min-w-0">
        <section
          v-for="section in doc.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-20 border-b border-kun py-8 first:pt-0 last:border-none"
        >
          <h2 class="text-xl font-semibold tracking-tight text-foreground">
            {{ section.title }}
          </h2>

          <p
            v-for="(paragraph, index) in section.body"
            :key="`p-${index}`"
            class="mt-4 text-[15px] leading-[1.85] text-default-600 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary-600 [&_strong]:font-semibold [&_strong]:text-foreground"
            v-html="paragraph"
          />

          <ul v-if="section.list" class="mt-4 space-y-3">
            <li
              v-for="(entry, index) in section.list"
              :key="`l-${index}`"
              class="relative pl-6 text-[15px] leading-[1.85] text-default-600 [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary-600 [&_strong]:font-semibold [&_strong]:text-foreground"
            >
              <span
                class="absolute top-[0.72em] left-1 size-1.5 rounded-full bg-default-300"
                aria-hidden="true"
              />
              <span v-html="entry" />
            </li>
          </ul>
        </section>

        <div class="mt-12 border-t-2 border-foreground pt-6">
          <h2 class="text-sm font-semibold text-foreground">
            {{ $t('legal.contactTitle') }}
          </h2>
          <p class="mt-2 text-sm text-default-500">
            {{ $t('legal.contactBody') }}
          </p>
          <KunLink
            :href="`mailto:${SUPPORT_EMAIL}`"
            color="primary"
            underline="always"
            class-name="mt-2 text-sm font-semibold"
          >
            {{ SUPPORT_EMAIL }}
          </KunLink>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { LegalDoc } from '#shared/types/legal'
import { EFFECTIVE_DATE, SUPPORT_EMAIL } from '#shared/constants/site'

defineProps<{ doc: LegalDoc }>()

const localePath = useLocalePath()
</script>
