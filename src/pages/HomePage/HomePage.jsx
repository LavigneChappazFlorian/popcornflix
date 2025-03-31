import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./homePage.css";

import MovieFeatured from "../../components/movies/movieFeatured/MovieFeatured";
import MoviesSort from "../../components/movies/moviesSort/MoviesSort";
import MoviesList from "../../components/movies/moviesList/MoviesList";
import Button from "../../components/ui/button/Button";
import Footer from "../../components/ui/footer/Footer";
import Header from "../../components/ui/header/Header";

function HomePage() {
    const navigate = useNavigate();
    const apiKey = "fd289448dafe0650ad648b0826b5ee68";
    const [moviesToShow, setMoviesToShow] = useState(10);
    const [moviesList, setMoviesList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [sortBy, setSortBy] = useState("popularity.desc");

    useEffect(() => {
        async function getMoviesList() {
            setLoading(true);
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=true&language=fr-FR&sort_by=${sortBy}${selectedGenre}&region=fr`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setMoviesList(data.results);
            } catch (error) {
                console.log("Les données n'ont pas pu être chargées: " + error);
            } finally {
                setLoading(false);
            }
        };

        getMoviesList();
    }, [apiKey, selectedGenre, sortBy]);

    // Appliquer filtres et tri
    useEffect(() => {
        let movies = [...moviesList];

        // Filtrer par recherche
        if (searchInput) {
            movies = movies.filter(movie =>
                movie.title.toLowerCase().includes(searchInput.toLowerCase())
            );
        }

        // Filtrer par genre
        if (selectedGenre) {
            movies = movies.filter(movie =>
                movie.genre_ids.includes(parseInt(selectedGenre))
            );
        }

        // Trier les films
        // eslint-disable-next-line
        movies.sort((a, b) => {
            if (sortBy === "popularity.desc") return b.popularity - a.popularity;
            if (sortBy === "release_date.desc") return new Date(b.release_date) - new Date(a.release_date);
            if (sortBy === "vote_average.desc") return b.vote_average - a.vote_average;
            if (sortBy === "original_title.asc") return a.title.localeCompare(b.title);
        });

        setFilteredMovies(movies);
    }, [searchInput, selectedGenre, sortBy, moviesList]);

    function showAll() {
        setMoviesToShow(filteredMovies.length);
    }

    function showLess() {
        setMoviesToShow(10);
    }

    const handleDetailsClick = (movie) => {
        navigate(`/movies/${movie.id}`);
    };

    return (
        <div className="HomePage">
            <Header />
            <MovieFeatured />
            <main>
                <div className="movies-header" id='movies-header'>
                    <MoviesSort
                        input={searchInput}
                        selectedGenre={selectedGenre}
                        sortBy={sortBy}
                        onSearchChange={setSearchInput}
                        onGenreChange={setSelectedGenre}
                        onSortChange={setSortBy}
                    />
                </div>

                {loading ? (
                    <div className="loading">
                        <p>Chargement des données ...</p>
                    </div>
                ) : (
                    <div className="movies">
                        {filteredMovies.slice(0, moviesToShow).map((movie) => (
                            <div
                                className="movie"
                                key={movie.id}
                                onClick={() => handleDetailsClick(movie)}
                            >
                                <MoviesList
                                    poster_path={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    release_date={movie.release_date}
                                    vote_average={movie.vote_average}
                                    title={movie.title}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="movies-showAll">
                    <hr />
                    <Button
                        link={"#movies-header"}
                        onclick={moviesToShow > 10 ? showLess : showAll}
                        text={moviesToShow > 10 ? "Voir ﹣" : "Voir ﹢"}
                    />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default HomePage;