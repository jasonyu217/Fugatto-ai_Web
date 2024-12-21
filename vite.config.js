import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    historyApiFallback: true
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        workspace: './workspace.html'
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});
