<script setup lang="ts">
const consent = useCookie<boolean>('pp-consent', {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
})

const visible = ref(false)

onMounted(() => {
  if (!consent.value) visible.value = true
})

function accept() {
  consent.value = true
  visible.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-xl px-4 py-4"
    >
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div class="flex items-start gap-3">
          <svg class="h-5 w-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-gray-600">
            This site uses cookies to save your <span class="font-semibold text-gray-800">favourite articles</span> locally in your browser. No tracking or third-party cookies.
          </p>
        </div>
        <button
          @click="accept"
          class="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
