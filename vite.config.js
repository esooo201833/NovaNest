import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunks - function form for Vite 8 + Rolldown
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('framer-motion') || id.includes('gsap') || id.includes('lenis') || id.includes('aos')) {
              return 'animations';
            }
            if (id.includes('@react-three') || id.includes('three')) {
              return '3d';
            }
            return 'vendor';
          }
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    // Minimize build (using default esbuild minifier)
    minify: true
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      // Fix for use-sync-external-store with React 19
      'use-sync-external-store/shim/with-selector.js': 'use-sync-external-store/shim/with-selector.js'
    }
  },
  // Optimize pre-bundling - Vite 8 uses Rolldown
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'use-sync-external-store', 'scheduler', 'lucide-react'],
    exclude: ['@react-three/fiber']
  }
})
