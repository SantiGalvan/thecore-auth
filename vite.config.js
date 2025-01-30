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
    },
    rollupOptions : {
      external: ['react', 'react-dom', 'axios', 'react-router-dom'],
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

