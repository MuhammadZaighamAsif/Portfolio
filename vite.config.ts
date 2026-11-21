import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '::',
    port: 5173,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        // Split stable third-party code into long-lived, separately cached chunks.
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor'
          if (id.includes('react-router') || id.includes('@remix-run')) return 'router'
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('@radix-ui') || id.includes('sonner')) return 'ui-vendor'
          return undefined
        },
      },
    },
  },
})
