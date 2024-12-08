import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    cors: true,
    port: 3000,
    host: true,
    open: true
  }
}) 