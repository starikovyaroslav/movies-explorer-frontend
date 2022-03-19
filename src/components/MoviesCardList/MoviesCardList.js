import React from "react";

import { WINDOW_WIDTH } from "../../utils/Consts";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import "./MoviesCardList.css";


const MoviesCardList = ({loggedIn, moviesList, addMovie, deleteMovies, isMovieAdded}) => {

  const [size, setSize] = React.useState(window.innerWidth);
  const [moviesTotal, setMoviesTotal] = React.useState(0);
  const [addMovies, setAddMovies] = React.useState(0);

  function resizeHandler() {
    setSize(window.innerWidth);
  }

  function getCards() {
    if (size >= WINDOW_WIDTH.L) {
      setMoviesTotal(12);
      setAddMovies(3);
    } else if (size < WINDOW_WIDTH.L && size >= WINDOW_WIDTH.M) {
      setMoviesTotal(8);
      setAddMovies(2);
    } else if (size < WINDOW_WIDTH.M) {
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
                  isMovieAdded={isMovieAdded}
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
