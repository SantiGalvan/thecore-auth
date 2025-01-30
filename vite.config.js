import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode']
  },
  build: {
    lib: {
      entry: './src/index.js',
      name: 'thecore-auth',
      fileName: (format) => `thecore-auth.${format}.js`,
      formats: ['esm', 'cjs']
    },
    rollupOptions : {
      external: ['react', 'react-dom', 'axios', 'react-router-dom','react-icons','jwt-decode'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          axios: 'axios',
          'react-router-dom': 'ReactRouterDOM',
        }
      }
    }
  }
});

