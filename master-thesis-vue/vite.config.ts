import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-eslint-plugin'

export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/../../style.css";
      `
      }
    }
  }
})
