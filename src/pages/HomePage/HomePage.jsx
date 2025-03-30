import React, { useEffect, useState } from "react";
import "./homePage.css";

import MovieFeatured from "../../components/movies/movieFeatured/MovieFeatured";
import MoviesSort from "../../components/movies/moviesSort/MoviesSort";
import MovieDetail from "../../components/movies/movieDetail/MovieDetail";
import MoviesList from "../../components/movies/moviesList/MoviesList";
import Button from "../../components/ui/button/Button";
import Footer from "../../components/ui/footer/Footer";


function HomePage() {
    const apiKey = "fd289448dafe0650ad648b0826b5ee68"
    const [moviesToShow, setMoviesToShow] = useState(10);
    const [moviesList, setMoviesList] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        async function getMoviesList() {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=true&language=fr-FR&page=1&sort_by=popularity.desc&region=fr`;
            try {
                await fetch(url)
                    .then(response => response.json())
                    .then(json => setMoviesList(json.results));
                console.log();
            } catch (error) {
                console.log("Les données n'ont pas pu être chargé" + error);
            }
        };

        getMoviesList();
    }, []);

    function showAll() {
        setMoviesToShow(moviesList.length);
    }

    function showLess() {
        setMoviesToShow(10);
    }

    const handleDetailsClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleBackClick = () => {
        setSelectedMovie(null);
    };

    const handleRecommendationClick = (movie) => {
        setSelectedMovie(movie);
        window.scrollTo(0, 0);
    };

    return (
        <div className="HomePage">
            <MovieFeatured />
            <main>
                <div className="movies-header" id='movies-header'>
                    <MoviesSort moviesList={moviesList} />
                </div>
                <div className="movies">
                    {selectedMovie ? (
                        <div>
                            <button onClick={handleBackClick}>Retour</button>
                            <MovieDetail movie={selectedMovie} onRecommendationClick={handleRecommendationClick} />
                        </div>
                    ) : (
                        moviesList.slice(0, moviesToShow).map((movie, index) => {
                            return (
                                <div className="movie" onClick={() => handleDetailsClick(movie)}>
                                    <MoviesList key={index} poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} release_date={movie.release_date} vote_average={movie.vote_average} title={movie.title} />
                                </div>
                            )
                        })
                    )}
                </div>
                <div className="movies-showAll">
                    <hr />
                    <Button link={"#movies-header"} onclick={moviesToShow > 10 ? showLess : showAll} text={moviesToShow > 10 ? "Voir ﹣" : "Voir ﹢"} />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default HomePage;