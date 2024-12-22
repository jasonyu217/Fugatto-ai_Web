import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      'Content-Security-Policy': [
        "default-src 'self' api.kodepay.io *.kodepay.io kodepay-global.zingfront.com;",
        "script-src 'self' 'unsafe-eval' 'unsafe-inline' api.kodepay.io *.kodepay.io kodepay-global.zingfront.com;",
        "style-src 'self' 'unsafe-inline';",
        "connect-src 'self' api.kodepay.io *.kodepay.io kodepay-global.zingfront.com;",
        "frame-src 'self' kodepay.io *.kodepay.io kodepay-global.zingfront.com;",
        "img-src 'self' data: https:;",
        "font-src 'self' data:;"
      ].join(' ')
    }
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
