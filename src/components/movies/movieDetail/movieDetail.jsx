import "./movieDetail.css";
import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

function MovieDetail({ movie, onRecommendationClick }) {
  const [videoList, setVideoList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [runtime, setRuntime] = useState(null);
  const [status, setStatus] = useState(null);
  const [director, setDirector] = useState(null);

  const API_KEY = 'fd289448dafe0650ad648b0826b5ee68';

  const getVideo = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    );
    const data = await response.json();

    const trailers = data.results.filter(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    if (trailers.length > 0) {
      const mostRecentTrailer = trailers.sort(
        (a, b) => new Date(b.published_at) - new Date(a.published_at)
      )[0];

      setVideoList((prevVideoList) => {
        const exists = prevVideoList.some(
          (video) => video.movieId === movieId && video.id === mostRecentTrailer.id
        );
        if (!exists) {
          return [...prevVideoList, { ...mostRecentTrailer, movieId }];
        }
        return prevVideoList;
      });
    }
  };

  const getCategories = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    setCategoryList(data.genres);
  };

  const getMovieDetails = async (movieId) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    setRuntime(data.runtime);
    setStatus(data.status);
  };

  const getMovieCredits = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    const directorData = data.crew.find((member) => member.job === 'Director');
    setDirector(directorData);
  }

  const getRecommandations = async (movieId) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${API_KEY}&language=fr-FR&page=1`);
    const data = await response.json();
    setRecommendations(data.results);
  }

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes} min`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  useEffect(() => {
    getVideo(movie.id);
    getCategories();
    getRecommandations(movie.id);
    getMovieDetails(movie.id);
    getMovieCredits(movie.id);
  }, [movie.id]);

  return (
    <div className="movie-detail">
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <div>
        <h3>Catégories :</h3>
        {categoryList
          .filter((category) => movie.genre_ids.includes(category.id))
          .map((category) => (
            <span key={category.id} style={{ marginRight: '10px' }}>
              {category.name}
            </span>
          ))}
      </div>
      {
        runtime > 0 && (
          <div>
            <h3>Durée :</h3>
            <span>{formatRuntime(runtime)}</span>
          </div>
        )
      }
      <div>
        <h3>Sortie :</h3>
        <span>{formatDate(movie.release_date)}</span>
      </div>

      <div>
        <h3>Statut :</h3>
        {status === 'Released' ? (
          <span>Film sorti</span>
        ) : (
          <span>À venir</span>
        )}
      </div>

      {director && director.name && (
        <div>
          <h3>Réalisé par :</h3>
          <span> {director.name} </span>
        </div>
      )

      }

      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
        alt={movie.title}
      />

      {videoList
        .filter((video) => video.movieId === movie.id)
        .map((video) => ( (
          video.key ? (
            <YouTube key={video.id} videoId={video.key} onReady={(event) => event.target.pauseVideo()} />
          ) : null
        )
          
        ))}

      <div>
        <h3>Recommendations</h3>
        {recommendations.map((recommendation) => (

          <div onClick={() => onRecommendationClick(recommendation)} style={{cursor : 'pointer'}} key={recommendation.id}>
            <h4>{recommendation.title}</h4>
            <img
              src={`https://image.tmdb.org/t/p/w500/${recommendation.poster_path}`}
              alt={recommendation.title}
            />
          </div>
        ))}

      </div>


    </div>


  );
}

export default MovieDetail;