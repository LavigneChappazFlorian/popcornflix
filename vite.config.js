import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        format: 'es'
      }
    }
  },
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src')
    }
  },
  base: './',
  plugins: [
    react()
  ],
});