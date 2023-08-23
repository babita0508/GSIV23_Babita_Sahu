import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMoviesRequest,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} from "../redux/actions";

import { Movie } from "./types"; // Adjust the path accordingly
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom"; // Import Link
import axios from "axios";

function ListPage() {
  const dispatch = useDispatch();

  const { movies } = useSelector(
    (state: { movies: Movie[]; loading: boolean; error: string | null }) =>
      state
  );
  const [page, setPage] = useState<number>(1); // Initialize page number
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  const fetchMoreMovies = () => {
    fetchMovies(searchQuery); // Fetch more movies based on the current search query
  };

  useEffect(() => {
    fetchMovies(); // Fetch initial movies
  }, []);

  const fetchMovies = (query?: string) => {
    dispatch(fetchMoviesRequest());
    axios
      .get("https://api.themoviedb.org/3/movie/upcoming", {
        params: {
          api_key: "f520281a658d10cb88b9cf00a3d75c58",
        },
      })
      .then((response) => {
        dispatch(fetchMoviesSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchMoviesFailure(error.message));
      });
  };

  useEffect(() => {
    // Intersection Observer for infinite scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreMovies();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const target = document.querySelector(".load-more");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [page]);

  movies.sort((a, b) => {
    return (
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });

  const moviesInRows: Movie[][] = [];
  for (let i = 0; i < movies.length; i += 5) {
    moviesInRows.push(movies.slice(i, i + 5));
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length >= 3) {
      setPage(1); // Reset page number when search query changes
      fetchMovies(query); // Fetch movies based on search query
    } else if (query.length === 0) {
      // If search query is empty, reset movies list
      dispatch(fetchMoviesSuccess([])); // Dispatch an action to reset the movies list
    } else {
      // Filter movies based on query
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(fetchMoviesSuccess(filteredMovies)); // Dispatch an action to update the filtered movies list
    }
  };

  const truncateDescription = (
    description: string,
    maxWords: number
  ): string => {
    const words = description.split(" ");

    if (words.length > maxWords) {
      const truncatedWords = words.slice(0, maxWords);
      return (
        truncatedWords.join(" ") +
        (truncatedWords.length < words.length ? "..." : "")
      );
    }

    return description;
  };

  return (
    <div className="movie-list">
      <div className="search-movies">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {moviesInRows.map((row, rowIndex) => (
        <div key={rowIndex} className="movie-row">
          {row.map((movie) => (
            <Link
              to={`/details/${movie.id}`}
              key={movie.id}
              className="movie-link"
            >
              {/* Use Link to wrap MovieCard */}
              <MovieCard
                movie={{
                  ...movie,
                  overview: truncateDescription(movie.overview, 10),
                }}
              />
            </Link>
          ))}
        </div>
      ))}
      <div className="load-more" />
    </div>
  );
}

export default ListPage;
