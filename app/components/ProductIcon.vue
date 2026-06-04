<script setup lang="ts">
const props = defineProps<{ product: string; size?: number }>()
const px = computed(() => props.size ?? 16)
</script>

<template>
  <!-- Power Apps – purple grid -->
  <svg v-if="product === 'Power Apps'" :width="px" :height="px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Power Apps" role="img">
    <rect width="18" height="18" rx="2" fill="#742774"/>
    <rect x="3" y="3" width="5" height="5" rx="0.75" fill="white"/>
    <rect x="10" y="3" width="5" height="5" rx="0.75" fill="white"/>
    <rect x="3" y="10" width="5" height="5" rx="0.75" fill="white"/>
    <rect x="10" y="10" width="5" height="5" rx="0.75" fill="white" opacity="0.4"/>
  </svg>

  <!-- Power Automate – blue circular arrow -->
  <svg v-else-if="product === 'Power Automate'" :width="px" :height="px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Power Automate" role="img">
    <rect width="18" height="18" rx="2" fill="#0B6BE6"/>
    <path d="M9 4a5 5 0 0 1 4.33 7.5H11.5l2.5 2.5 2.5-2.5h-1.6A6.5 6.5 0 1 0 9 15.5v-1.5A5 5 0 0 1 9 4Z" fill="white"/>
  </svg>

  <!-- Power BI – yellow bar chart -->
  <svg v-else-if="product === 'Power BI'" :width="px" :height="px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Power BI" role="img">
    <rect width="18" height="18" rx="2" fill="#F2C811"/>
    <rect x="3"   y="11" width="3" height="4" rx="0.5" fill="#1A1A1A"/>
    <rect x="7.5" y="7"  width="3" height="8" rx="0.5" fill="#1A1A1A"/>
    <rect x="12"  y="3"  width="3" height="12" rx="0.5" fill="#1A1A1A"/>
  </svg>

  <!-- Power Pages – teal globe -->
  <svg v-else-if="product === 'Power Pages'" :width="px" :height="px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Power Pages" role="img">
    <rect width="18" height="18" rx="2" fill="#00B09E"/>
    <circle cx="9" cy="9" r="5" stroke="white" stroke-width="1.3" fill="none"/>
    <ellipse cx="9" cy="9" rx="2.2" ry="5" stroke="white" stroke-width="1.3" fill="none"/>
    <line x1="4" y1="9" x2="14" y2="9" stroke="white" stroke-width="1.3"/>
    <line x1="4.5" y1="6.5" x2="13.5" y2="6.5" stroke="white" stroke-width="1" opacity="0.6"/>
    <line x1="4.5" y1="11.5" x2="13.5" y2="11.5" stroke="white" stroke-width="1" opacity="0.6"/>
  </svg>

  <!-- Copilot Studio – purple sparkle -->
  <svg v-else-if="product === 'Copilot Studio'" :width="px" :height="px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Copilot Studio" role="img">
    <rect width="18" height="18" rx="2" fill="#7060FB"/>
    <path d="M9 2.5 L10.1 6.9 L14.5 8 L10.1 9.1 L9 13.5 L7.9 9.1 L3.5 8 L7.9 6.9 Z" fill="white"/>
    <circle cx="13.5" cy="13" r="1.2" fill="white" opacity="0.7"/>
    <circle cx="4.5" cy="4" r="0.8" fill="white" opacity="0.5"/>
  </svg>

  <!-- Fallback: nothing for General / unknown -->
  <span v-else />
</template>
