import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@pages': path.resolve(__dirname, './src/pages'),
    }
  },
  plugins: [svelte()]
})
