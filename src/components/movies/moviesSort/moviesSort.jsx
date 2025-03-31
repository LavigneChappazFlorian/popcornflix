import { useEffect, useState } from "react";
import "./moviesSort.css";

function MoviesSort({ input, selectedGenre, sortBy, onSearchChange, onGenreChange, onSortChange }) {
    const [genres, setGenres] = useState([]);
    const apiKey = 'fd289448dafe0650ad648b0826b5ee68';

    const getGenres = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=fr-FR&api_key=${apiKey}`);
        const data = await response.json();
        setGenres(data.genres);
    };

    useEffect(() => { getGenres(); }, []);

    return (
        <div className="MoviesSort">
            <form method="GET">
                <div className="form-left">
                    <select value={selectedGenre} onChange={(e) => onGenreChange(e.target.value)}>
                        <option value="">Tous les genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}> {genre.name} </option>
                        ))}
                    </select>

                    <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
                        <option value="popularity.desc">Les plus populaires</option>
                        <option value="release_date.desc">Les plus récents</option>
                        <option value="vote_average.desc">Les mieux notés</option>
                        <option value="original_title.asc">Ordre alphabétique</option>
                    </select>
                </div>

                <div className="form-right">
                    <input
                        type="search"
                        value={input}
                        onInput={(e) => onSearchChange(e.target.value)}
                        placeholder="Rechercher..."
                    />
                </div>
            </form>
        </div>
    );
}

export default MoviesSort;