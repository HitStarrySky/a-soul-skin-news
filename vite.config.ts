import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(() => ({
  build: {
    outDir: 'dist'
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnable: true
      }
    }
  },
  define: {
    'process.env': {}
  },
  server: {
    port: 8090
  },
  plugins: [vue()]
}));
