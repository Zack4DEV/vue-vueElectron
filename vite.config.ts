import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import liveReload from 'vite-plugin-live-reload'
import path from 'path'
import { join } from 'node:path' 

export default defineConfig({
  base: (process.env.MODE_ENV = 'development' ? '/' : '/dist/'),
  root: '/',
  build: {
    manifest: true,
    rollupOptions: {
      external: path.resolve(__dirname, 'src/main.ts')
    },
  },
  resolve: {
    alias: {
    '@e2e': path.join(__dirname, '/e2e'),
    },
  },
  server: {
      server: '0.0.0.0',
      port: 8000,
      hmr: {
      overlay: false
    }
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    liveReload([
      // edit live reload paths according to your source code
      // for example:
      // using this for our example:
    ]),
  ],
});
