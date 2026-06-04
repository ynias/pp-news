<script setup lang="ts">
const props = defineProps<{ product: string; size?: number }>()
const px = computed(() => props.size ?? 16)

const staticIcons: Record<string, string> = {
  'Power Apps': '/PowerApps_scalable.svg',
  'Power Automate': '/PowerAutomate_scalable.svg',
  'Power BI': '/Power_BI_Logo.svg',
  'Power Pages': '/PowerPages_scalable.svg',
  'Copilot Studio': '/CopilotStudio_scalable.svg',
  'General': '/PowerPlatform_scalable.svg',
}
</script>

<template>
  <!-- Static SVG files (official logos) -->
  <img
    v-if="staticIcons[product]"
    :src="staticIcons[product]"
    :width="px"
    :height="px"
    :alt="product"
    class="shrink-0 inline-block"
  />

  <!-- Fallback: nothing -->
  <span v-else />
</template>
