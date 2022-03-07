import React from "react";
import "./MoviesCard.css";

const MoviesCard = ({ movie }) => {
  const getTime = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };

  return (
    <li className="movie">
      <div className="movie__container">
        <button className="movie__button movie__button-save" type="button">
          Сохранить
        </button>
        <a
          className="movie__image"
          href={movie.trailerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="movie__image"
            src={`https://api.nomoreparties.co/${movie.image.url}`}
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
