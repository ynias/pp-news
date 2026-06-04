import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{vue,ts}',
    './app/composables/**/*.ts',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  theme: { extend: {} },
  plugins: [],
} satisfies Config
