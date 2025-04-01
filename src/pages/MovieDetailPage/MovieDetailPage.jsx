import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import "./movieDetailPage.css";
import Footer from '/src/components/ui/footer/Footer';
import Header from '/src/components/ui/header/Header';

function MovieDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [runtime, setRuntime] = useState(null);
    const [status, setStatus] = useState(null);
    const [director, setDirector] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_KEY = 'fd289448dafe0650ad648b0826b5ee68';

    const getMovie = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`
            );
            const data = await response.json();
            setMovie(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails du film:", error);
        }
    };

    const getVideo = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
            );
            const data = await response.json();

            const trailers = data.results.filter(
                (video) => video.type === 'Trailer' && video.site === 'YouTube'
            );

            if (trailers.length > 0) {
                const mostRecentTrailer = trailers.sort(
                    (a, b) => new Date(b.published_at) - new Date(a.published_at)
                )[0];

                setVideoList([{ ...mostRecentTrailer, movieId: id }]);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des vidéos:", error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-FR`
            );
            const data = await response.json();
            setCategoryList(data.genres);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories:", error);
        }
    };

    const getMovieDetails = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=fr-FR`
            );
            const data = await response.json();
            setRuntime(data.runtime);
            setStatus(data.status);
        } catch (error) {
            console.error("Erreur lors de la récupération des détails:", error);
        }
    };

    const getMovieCredits = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
            const data = await response.json();
            const directorData = data.crew.find((member) => member.job === 'Director');
            setDirector(directorData);
            setCast(data.cast.slice(0, 8)); // Récupérer les 8 premiers acteurs
        } catch (error) {
            console.error("Erreur lors de la récupération des crédits:", error);
        }
    }

    const getRecommendations = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=fr-FR&page=1`);
            const data = await response.json();
            setRecommendations(data.results.slice(0, 8)); // Limiter à 8 recommandations
        } catch (error) {
            console.error("Erreur lors de la récupération des recommandations:", error);
        }
    }

    const formatRuntime = (minutes) => {
        if (!minutes) return "";
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes} min`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString('fr-FR');
    };

    const handleRecommendationClick = (recommendation) => {
        navigate(`/movies/${recommendation.id}`);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getMovie();
            await getCategories();
            await getVideo();
            await getMovieDetails();
            await getMovieCredits();
            await getRecommendations();
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading || !movie) {
        return (
            <div className="loading">
                <div className="loading-spinner"></div>
                <p>Chargement du film...</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="movie-detail">
                <div className="movie-header">
                    {movie.backdrop_path && (
                        <img
                            className="movie-backdrop"
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                            alt={`Arrière-plan de ${movie.title}`}
                        />
                    )}
                    <div className="movie-backdrop-overlay"></div>

                    <div className="movie-header-content">
                        <div className="movie-poster-container">
                            {movie.poster_path && (
                                <img
                                    className="movie-poster"
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={`Affiche de ${movie.title}`}
                                />
                            )}
                        </div>

                        <div className="movie-header-info">
                            <h1>{movie.title}</h1>

                            <div className="movie-rating">
                                <span className="star">★</span>
                                <span className="rating-value">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
                                <span>({movie.vote_count} votes)</span>
                            </div>

                            <div className="movie-meta">
                                {runtime > 0 && (
                                    <div className="movie-meta-item">
                                        <span className="movie-meta-label">Durée</span>
                                        <span className="movie-meta-value">{formatRuntime(runtime)}</span>
                                    </div>
                                )}

                                <div className="movie-meta-item">
                                    <span className="movie-meta-label">Sortie</span>
                                    <span className="movie-meta-value">{formatDate(movie.release_date)}</span>
                                </div>

                                <div className="movie-meta-item">
                                    <span className="movie-meta-label">Statut</span>
                                    <span className="movie-meta-value">
                                        {status === 'Released' ? 'Film sorti' : 'À venir'}
                                    </span>
                                </div>
                            </div>

                            <div className="category-tags">
                                {categoryList
                                    .filter((category) => movie.genres && movie.genres.some(g => g.id === category.id))
                                    .map((category) => (
                                        <span key={category.id} className="category-tag">
                                            {category.name}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="movie-info-section">
                    <h3>Synopsis</h3>
                    <p>{movie.overview || "Aucune description disponible."}</p>
                </div>

                {director && director.name && (
                    <div className="movie-info-section">
                        <h3>Réalisé par</h3>
                        <p>{director.name}</p>
                    </div>
                )}

                {videoList.length > 0 && (
                    <div className="movie-trailers movie-info-section">
                        <h3>Bande-annonce</h3>
                        {videoList.map((video) => (
                            video.key ? (
                                <YouTube
                                    key={video.id}
                                    videoId={video.key}
                                    opts={{
                                        width: '100%',
                                        playerVars: {
                                            autoplay: 0,
                                        },
                                    }}
                                    onReady={(event) => event.target.pauseVideo()}
                                />
                            ) : null
                        ))}
                    </div>
                )}

                {cast.length > 0 && (
                    <div className="movie-crew movie-info-section">
                        <h3>Casting</h3>
                        <div className="crew-list">
                            {cast.map((person) => (
                                <div key={person.id} className="crew-member">
                                    <img
                                        className="crew-member-photo"
                                        src={person.profile_path
                                            ? `https://image.tmdb.org/t/p/w185/${person.profile_path}`
                                            : 'https://via.placeholder.com/150x150'
                                        }
                                        alt={person.name}
                                    />
                                    <p className="crew-member-name">{person.name}</p>
                                    <p className="crew-member-role">{person.character}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {recommendations.length > 0 && (
                    <div className="movie-recommendations movie-info-section">
                        <h3>Recommandations</h3>
                        <div className="recommendations-grid">
                            {recommendations.map((recommendation) => (
                                <div
                                    className="recommendation-item"
                                    onClick={() => handleRecommendationClick(recommendation)}
                                    key={recommendation.id}
                                >
                                    {recommendation.poster_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500/${recommendation.poster_path}`}
                                            alt={recommendation.title}
                                        />
                                    )}
                                    <span>{recommendation.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default MovieDetailPage;