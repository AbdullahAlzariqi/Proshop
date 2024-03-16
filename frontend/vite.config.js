import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy requests prefixed '/api'
    proxy: {
      '/api/products': 'http://localhost:5000',
      '/uploads': 'http://localhost:5000',
    },
  },
})
