import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Movie } from "./types"; // Adjust the path accordingly

function MovieDetailsPage() {
  const { id } = useParams(); // Access the movie ID from the URL params

  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${id}`, {
        params: {
          api_key: "f520281a658d10cb88b9cf00a3d75c58",
        },
      })
      .then((response) => {
        setMovieDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
      });
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movieDetails-card">
    <section className="moviesDetails-img-sec">
    <div className="moviesDetails-img">
      <div className="movieDetails-image">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
      </div>
    </div>
    </section>
      <div className="movieDetails-details">
        <div className="movieDetails-title-rating">
        <p className="movieDetails-title">Title: {movieDetails.title}</p>
        <p className="movieDetails-rating">
           ({movieDetails.vote_average})
        </p>
        </div>
        <p>Year: {movieDetails.release_date}</p>
        <p className="movieDetails-description">Description: {movieDetails.overview}</p>
        <Link to="/">Back to List</Link>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
