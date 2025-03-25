import "./moviesList.css";

function MoviesList({ title, poster_path, release_date, vote_average }) {
    return (
        <div className="MoviesList">
            <div className="movie-img">
                <img src={poster_path} alt={title} />
                <span>{Math.round(vote_average)}/10</span>
            </div>
            <div className="movie-text">
                <span>{title}</span>
            </div>
        </div>
    )
}

export default MoviesList;