import { useEffect, useState } from 'react';
import './App.css';
import MoviesList from './components/movies/moviesList/moviesList';
import MovieFeatured from './components/movies/movieFeatured/movieFeatured';
import MoviesSort from './components/movies/moviesSort/moviesSort';
import Button from './components/ui/button/button';
import Footer from './components/ui/footer/footer';

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movieShowAll, setMovieShowAll] = useState(false);

  useEffect(() => {
    async function getMoviesList() {
      const apiKey = "fd289448dafe0650ad648b0826b5ee68"
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=true&language=fr-FR&page=1&sort_by=popularity.desc&region=fr`;
      try {
        await fetch(url)
          .then(response => response.json())
          .then(json => setMoviesList(json.results));
        console.log();
      } catch (error) {
        console.log("Les données n'ont pas pu être chargé" + error);
      } finally {
        setIsLoading(false);
      }
    };

    getMoviesList();
  }, []);

  function showAll() {
    setMovieShowAll(!movieShowAll);
  }

  return (
    <div className="App">

      <MovieFeatured />
      <main>
        <div className="movies-header" id='movies-header'>
          <MoviesSort />
        </div>
        <div className="movies">
          {
            movieShowAll ?
              moviesList.map((movie, index) => {
                return <MoviesList key={index} poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} release_date={movie.release_date} vote_average={movie.vote_average} title={movie.title} />
              }) :
              moviesList.slice(0, 10).map((movie, index) => {
                return <MoviesList key={index} poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} release_date={movie.release_date} vote_average={movie.vote_average} title={movie.title} />
              })
          }
        </div>
        <div className="movies-showAll">
          <hr />
          <Button link={"#movies-header"} onclick={showAll} text={movieShowAll ? "Voir ﹣" : "Voir ﹢"} />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;