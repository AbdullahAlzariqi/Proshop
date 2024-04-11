import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api'
    proxy: {
      '/api/products': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/users': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/orders': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/api/config': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/uploads': 'http://localhost:5000',
    },
  },
})
