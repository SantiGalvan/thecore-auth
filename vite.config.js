import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr() ,react(), tailwindcss()],
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
    },
  }
});

