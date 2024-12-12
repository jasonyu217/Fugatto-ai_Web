import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  server: {
    port: 3000,
  },
  build: {
    cssCodeSplit: false,
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}) 