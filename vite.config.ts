import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.102:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})