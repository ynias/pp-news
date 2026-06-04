<script setup lang="ts">
const props = defineProps<{ product: string; size?: number }>()
const px = computed(() => props.size ?? 16)

const staticIcons: Record<string, string> = {
  'Power Apps': '/PowerApps_scalable.svg',
  'Power Automate': '/PowerAutomate_scalable.svg',
  'Power Pages': '/PowerPages_scalable.svg',
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

  <!-- Power BI – yellow bar chart (no official file provided) -->
  <svg v-else-if="product === 'Power BI'" :width="px" :height="px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Power BI" role="img">
    <rect width="18" height="18" rx="2" fill="#F2C811"/>
    <rect x="3"   y="11" width="3" height="4" rx="0.5" fill="#1A1A1A"/>
    <rect x="7.5" y="7"  width="3" height="8" rx="0.5" fill="#1A1A1A"/>
    <rect x="12"  y="3"  width="3" height="12" rx="0.5" fill="#1A1A1A"/>
  </svg>

  <!-- Copilot Studio – purple sparkle (no official file provided) -->
  <svg v-else-if="product === 'Copilot Studio'" :width="px" :height="px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Copilot Studio" role="img">
    <rect width="18" height="18" rx="2" fill="#7060FB"/>
    <path d="M9 2.5 L10.1 6.9 L14.5 8 L10.1 9.1 L9 13.5 L7.9 9.1 L3.5 8 L7.9 6.9 Z" fill="white"/>
    <circle cx="13.5" cy="13" r="1.2" fill="white" opacity="0.7"/>
    <circle cx="4.5" cy="4" r="0.8" fill="white" opacity="0.5"/>
  </svg>

  <!-- Fallback: nothing -->
  <span v-else />
</template>
