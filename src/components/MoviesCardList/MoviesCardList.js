import React from "react";

import { useLocation } from 'react-router';
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";

const MoviesCardList = ({loggedIn, moviesList, addMovie, deleteMovies}) => {

  const location = useLocation();
  const [size, setSize] = React.useState(window.innerWidth);
  const [moviesTotal, setMoviesTotal] = React.useState(0);
  const [addMovies, setAddMovies] = React.useState(0);

  function resizeHandler() {
    setSize(window.innerWidth);
  }

  function getCards() {
    if (size >= 1280) {
      setMoviesTotal(12);
      setAddMovies(3);
    } else if (size < 1280 && size >= 768) {
      setMoviesTotal(8);
      setAddMovies(2);
    } else if (size < 768) {
      setMoviesTotal(5);
      setAddMovies(2);
    }
  }

  function addCards() {
    setMoviesTotal(moviesTotal + addMovies);
  }

  React.useLayoutEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);


  React.useLayoutEffect(() => {
    getCards();
  }, [size]);

  return (
    <>
      <section>
        { moviesList.length === 0 ? (
          <Preloader />
        ) : (
          <ul className="movies-list">
          { moviesList.map((movie, id) => {
            if (id + 1 <= moviesTotal) {
              return(
                <MoviesCard
                  movie={movie}
                  key={id}
                  moviesList={moviesList}
                  addMovie={addMovie}
                  deleteMovies={deleteMovies}
                />
              );
            } else {
              return '';
            }
            })}
          </ul>
        )}
      </section>
      { moviesTotal < moviesList.length /* && location.pathname === '/movies' */ && (
        <div className="movies-list__more">
          <button className="movies-list__button" onClick={addCards}>Еще</button>
        </div>
      )}
    </>
  );
};

export default MoviesCardList;
