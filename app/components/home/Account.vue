<template>
  <section id="account" class="relative scroll-mt-14 overflow-hidden bg-foreground">
    <div class="mx-auto w-full max-w-6xl px-5 pt-24 sm:px-8 lg:pt-32">
      <div class="max-w-2xl">
        <h2 class="text-3xl font-semibold tracking-tight text-content1 sm:text-4xl">
          {{ $t('account.title') }}
        </h2>
        <p class="mt-5 text-base leading-relaxed text-content1/70">
          {{ $t('account.body') }}
        </p>
      </div>

      <dl class="mt-16 grid border-t border-content1/15 sm:grid-cols-2">
        <div
          v-for="key in ACCOUNT_FEATURES"
          :key="key"
          class="border-b border-content1/15 py-7 sm:odd:pr-12 sm:even:border-l sm:even:border-content1/15 sm:even:pl-12"
        >
          <dt class="text-base font-semibold text-content1">
            {{ $t(`account.features.${key}.name`) }}
          </dt>
          <dd class="mt-2 text-sm leading-relaxed text-content1/60">
            {{ $t(`account.features.${key}.note`) }}
          </dd>
        </div>
      </dl>

      <div class="mt-14 flex flex-wrap gap-3">
        <KunButton :href="PLATFORM.account" target="_blank" size="lg" icon icon-position="right">
          {{ $t('account.openAccount') }}
          <template #icon>
            <KunIcon name="lucide:arrow-up-right" />
          </template>
        </KunButton>
        <KunButton
          :href="localePath('/privacy')"
          size="lg"
          variant="bordered"
          color="default"
          class-name="border-content1/25 text-content1 hover:bg-content1/10"
        >
          {{ $t('account.readPrivacy') }}
        </KunButton>
      </div>
    </div>

    <img
      src="/images/bloom-koi.webp"
      :alt="$t('account.bloomAlt')"
      width="966"
      height="620"
      loading="lazy"
      decoding="async"
      class="pointer-events-none mx-auto -mb-[5%] block w-full max-w-3xl px-5 pt-16 select-none sm:px-8 lg:pt-20"
    />
  </section>
</template>

<script setup lang="ts">
import { ACCOUNT_FEATURES, PLATFORM } from '~/constants/site'

const localePath = useLocalePath()
</script>
