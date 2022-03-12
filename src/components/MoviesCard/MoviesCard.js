import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import api from '../../utils/MainApi';

const MoviesCard = ({loggedIn, movie, savedMovies, setSavedMovies}) => {

  const location = useLocation();
  const [isSaved, setIsSaved] = React.useState(false);

  const getTime = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };



  const addMovies = (movie) => {
    api
      .addSavedMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMovies = (movie) => {
    const movieId = savedMovies.find((item) => item === movie.id);
    api
      .deleteSavedMovies(movieId)
      .then((res) => {
        if (res) {
          setSavedMovies(
            savedMovies.filter((item) => item !== res.movieId)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isMovieAdded = (movie) => savedMovies.some((item) => item === movie.id);

/*   function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(err));
  } */

  const onClickHandler = () => {
    if (!isSaved) {
      setIsSaved(!isSaved);
      addMovies(movie);
    } else {
      setIsSaved(!isSaved);
      deleteMovies(movie._id);
    }


  };

/*   const handleBookmarkClick = (e) => {
    e.preventDefault();
    savedClick(movie, isSaved);
  }; */

/*   const removeHandler = () => {
    savedClick(movie, false);
  };
 */
  return (
    <li className="movie">
      <div className="movie__container">
        <button className={`movie__button ${ isSaved ? 'movie__button-saved' : 'movie__button-save'}`} type="button" onClick={onClickHandler}>
        {`${isSaved ? '' : 'Сохранить'}`}
        </button>
        <a
          className="movie__image"
          href={movie.trailerLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="movie__image"
            src={location.pathname === '/movies' ? `https://api.nomoreparties.co/${movie.image.url}` : `${movie.image}`}
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
