import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz',
        changeOrigin: true //支持跨域
      }
    }
  },
  resolve: {
    alias: {
      '~@': __dirname,
      '@': path.resolve(__dirname, './src')
    }
  }
})
