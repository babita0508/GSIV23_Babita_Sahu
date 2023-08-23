import React from 'react';
import { MovieCardProps } from './types';

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="movie-card">
      <div className="movie-image">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      </div>
      <div className="movie-details">
        <div className="movie-title-rating">
            <span className="movie-title">{movie.title}</span>
            <span className="movie-rating">({movie.vote_average})</span>
        </div>
        <div className="movie-description">
        <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
