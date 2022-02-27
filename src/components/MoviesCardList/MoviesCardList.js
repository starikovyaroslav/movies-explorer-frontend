import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css';

const MoviesCardList = () => {
  return (
    <>
      <section className="movies-list">
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
      </section>
      <div className="movies-list__more">
        <button className="movies-list__button">Еще</button>
      </div>
    </>
  );
}

export default MoviesCardList;
