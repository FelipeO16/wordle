import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    alias: {
      '@/': new URL('./app/', import.meta.url).pathname,
      '#/': new URL('./', import.meta.url).pathname,
      '#shared/': new URL('./shared/', import.meta.url).pathname,
    }
  },
});
