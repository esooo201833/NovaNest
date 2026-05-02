import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'animations': ['framer-motion', 'gsap', '@studio-freight/lenis', 'aos'],
          '3d': ['@react-three/fiber', '@react-three/drei', 'three'],
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    // Minimize build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
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
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', 'use-sync-external-store', 'scheduler'],
    exclude: ['@react-three/fiber']
  }
})
