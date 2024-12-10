import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3001,
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}) 