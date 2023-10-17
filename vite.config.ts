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
      input: path.resolve(__dirname, 'dir/render/main.ts')
    },
  },
  resolve: {
    alias: {
      '@app': path.join(__dirname, 'dir/render/app')
    },
  },
  server: {
      server: '0.0.0.0',
      port: 65534,
      hmr: {
      overlay: false,
    },
  },
  plugins: [
    vue(),
    splitVendorChunkPlugin(),
    liveReload([
      // edit live reload paths according to your source code
      // for example:
      // using this for our example:
      __dirname + 'dir/render/app/*.php',
      __dirname + 'dir/render/app/**/*.php'

    ]),
  ],
});
