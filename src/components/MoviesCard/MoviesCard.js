import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

const MoviesCard = ({ loggedIn, movie , savedList, addMovie, deleteMovies, isMovieAdded}) => {
  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);
/*   const isAdded = isMovieAdded(movie); */

  const getTime = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };


  /*   function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  } */

  const onClickHandler = () => {
    console.log(movie)
    if (!isSaved) {
      setIsSaved(!isSaved);
      addMovie(movie);
    } else {
      setIsSaved(!isSaved);
      deleteMovies(movie);
    }
  };

  /*   const handleBookmarkClick = (e) => {
    e.preventDefault();
    savedClick(movie, isSaved);
  }; */

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
              isSaved ? "movie__button-saved" : "movie__button-save"
            }`}
            type="button"
            onClick={onClickHandler}
          >
            {`${isSaved ? "" : "Сохранить"}`}
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
