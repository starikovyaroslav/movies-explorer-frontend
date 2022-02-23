import React from "react";
import moviePhoto from '../../images/photo.png';
import './MoviesCard.css';

const MoviesCard = () => {
  return (
    <li className="movie">
      <div className="movie__container">
        <button className='movie__button movie__button-save' type='button'>Сохранить</button>
        <img className="movie__image" src={moviePhoto} alt="Название фильма"/>
      </div>
      <div className="movie__text-box">
        <h2 className="movie__title">Название</h2>
        <p className='movie__subtitle'>Время</p>
      </div>
    </li>
  );
}

export default MoviesCard;
