import "./moviesList.css";

function MoviesList({ title, poster_path, vote_average }) {
    return (
        <div className="MoviesList">
            <div className="movie-img">
                <img src={poster_path} alt={title} />
            </div>
            <div className="movie-text">
                <span>{title}</span>
                <span>{Math.round(vote_average)}/10</span>
            </div>
        </div>
    )
}

export default MoviesList;