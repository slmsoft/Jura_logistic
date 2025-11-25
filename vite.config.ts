import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@app': fileURLToPath(new URL('./src/app', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url)),
      '@entities': fileURLToPath(new URL('./src/entities', import.meta.url)),
      '@features': fileURLToPath(new URL('./src/features', import.meta.url)),
      '@widgets': fileURLToPath(new URL('./src/widgets', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/pages', import.meta.url))
    }
  },
  optimizeDeps: {
    include: ['maplibre-gl'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  build: {
    target: 'es2020',
    commonjsOptions: {
      include: [/maplibre-gl/, /node_modules/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Выделяем MapLibre GL в отдельный chunk (большая библиотека)
          'maplibre-gl': ['maplibre-gl'],
          // Выделяем Vue Router в отдельный chunk
          'vue-router': ['vue-router'],
          // Выделяем Pinia в отдельный chunk
          'pinia': ['pinia'],
          // Выделяем Axios в отдельный chunk
          'axios': ['axios'],
          // Выделяем Vue в отдельный chunk
          'vue-core': ['vue']
        },
        // Оптимизация имен файлов для лучшего кеширования
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    // Включаем source maps только для разработки
    sourcemap: false,
    // Оптимизация размера
    cssCodeSplit: true
  },
  server: {
    fs: {
      strict: false
    }
  }
})

