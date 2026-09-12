<template>
  <section id="sites" class="scroll-mt-14 border-y border-kun bg-content1">
    <div class="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
      <div class="max-w-2xl">
        <h2
          class="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
        >
          {{ $t('sites.title') }}
        </h2>
        <p class="mt-5 text-base leading-relaxed text-default-600">
          {{ $t('sites.body') }}
        </p>
      </div>

      <ul class="mt-14 grid gap-5 md:grid-cols-3">
        <li v-for="site in MEMBER_SITES" :key="site.key">
          <a
            :href="site.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group block h-full"
          >
            <KunCard is-hoverable class-name="h-full" content-class="gap-0">
              <img
                :src="site.icon"
                alt=""
                width="56"
                height="56"
                loading="lazy"
                decoding="async"
                class="size-14 rounded-kun-md ring-1 ring-default-100"
              />

              <h3 class="mt-7 text-lg font-semibold text-foreground">
                {{ $t(`sites.${site.key}.name`) }}
              </h3>
              <p class="mt-3 flex-1 text-sm leading-relaxed text-default-500">
                {{ $t(`sites.${site.key}.desc`) }}
              </p>

              <div
                class="mt-8 flex items-center justify-between border-t border-kun pt-4"
              >
                <span class="font-mono text-xs" :class="site.accent">{{
                  site.host
                }}</span>
                <span
                  class="flex items-center gap-1.5 text-sm font-medium text-default-600 transition-colors group-hover:text-primary"
                >
                  {{ $t('sites.visit') }}
                  <KunIcon
                    name="lucide:arrow-up-right"
                    class="transition-transform group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </KunCard>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MEMBER_SITES } from '~/constants/site'
</script>
