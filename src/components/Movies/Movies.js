import React from "react";

import "./Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";

const Movies = ({ loggedIn, moviesList, movies, isSuccess, addMovie, deleteMovies, isMovieAdded, onSubmit }) => {

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSubmit={onSubmit}
      />

      { isSuccess ?
       (
        <MoviesCardList
          loggedIn={loggedIn}
          moviesList={movies}
          addMovie={addMovie}
          deleteMovies={deleteMovies}
          isMovieAdded={isMovieAdded}
        />
        ) :
        (
          <MoviesCardList
            loggedIn={loggedIn}
            moviesList={moviesList}
            addMovie={addMovie}
            deleteMovies={deleteMovies}
            isMovieAdded={isMovieAdded}
          />
        )
      }
      <Footer />
    </div>
  );
};

export default Movies;
