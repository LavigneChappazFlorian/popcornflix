import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    rollupOptions: {
      external: [
        '/src/components/ui/button/Button',
        '/src/components/movies/movieFeatured/MovieFeatured',
        '/src/components/movies/moviesSort/MoviesSort',
        '/src/components/movies/moviesList/MoviesList',
        '/src/components/ui/button/Button',
        '/src/components/ui/footer/Footer',
        '/src/components/ui/header/Header'
      ]
    }
  },
  plugins: [
    react()
  ],
});