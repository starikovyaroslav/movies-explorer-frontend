import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

const MoviesCard = ({ movie, addMovie, deleteMovies, isMovieAdded}) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);
  const isAdded = isMovieAdded(movie);

  const getTime = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };

  const onClickHandler = () => {
    if (!isAdded) {
      setIsSaved(!isSaved);
      addMovie(movie);
    } else {
      setIsSaved(!isSaved);
      deleteMovies(movie);
    }
  };
    const removeHandler = () => {
      deleteMovies(movie);
  };


  return (
    <li className="movie">
      <div className="movie__container">
        { location.pathname === "/movies" ?
         (
          <button
            className={`movie__button ${
              isAdded ? "movie__button-saved" : "movie__button-save"
            }`}
            type="button"
            onClick={onClickHandler}
          >
            {`${isAdded ? "" : "Сохранить"}`}
          </button>
        )
        : (
        <button
            className="movie__button movie__button-del"
            type="button"
            onClick={removeHandler}
          >
        </button>
        )}
        <a
          className="movie__image"
          href={movie.trailerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="movie__image"
            src={
              location.pathname === "/movies"
                ? `https://api.nomoreparties.co/${movie.image.url}`
                : `${movie.image}`
            }
            alt={movie.nameRU}
          />
        </a>
      </div>
      <div className="movie__text-box">
        <h2 className="movie__title">{movie.nameRU}</h2>
        <p className="movie__subtitle">{getTime()}</p>
      </div>
    </li>
  );
};

export default MoviesCard;
