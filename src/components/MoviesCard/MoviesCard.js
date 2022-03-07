import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import api from '../../utils/MainApi';

const MoviesCard = ({ movie }) => {

  const [isSaved, setIsSaved] = React.useState(false);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const getTime = () => {
    return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
  };

  const getSavedMovies = () => {
    api
      .getSavedMovies()
      .then((data) => {
        const saved = data.map((item) => ({ ...item, id: item.movieId }));
        localStorage.setItem("savedMovies", JSON.stringify(saved));
        setSavedMovies(saved);
      })
      .catch((err) => {
        localStorage.removeItem("savedMovies");
        console.log(err);
      });
  };

  const addMovies = (movie) => {
    api
      .addSavedMovies(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, { ...res, id: res.movieId }]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteMovies = (movie) => {
    const movieId = savedMovies.find((item) => item.id === movie.id);
    api
      .deleteSavedMovies(movieId)
      .then((res) => {
        if (res) {
          setSavedMovies(
            savedMovies.filter((item) => item.movieId !== res.movieId)
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onClickHandler = () => {
    if (!isSaved) {
      setIsSaved(!isSaved);
      addMovies(movie);
    } else {
      setIsSaved(!isSaved);
      deleteMovies(movie);
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
