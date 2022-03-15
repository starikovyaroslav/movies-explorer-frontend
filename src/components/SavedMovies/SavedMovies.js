import React from "react";

import "../Movies/Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


const SavedMovies = ({ loggedIn, savedList, isSuccess, deleteMovies, isMovieAdded, onSubmit, movies }) => {

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmit} />

      { isSuccess ?
       (
        <MoviesCardList
          moviesList={movies}
          deleteMovies={deleteMovies}
          isMovieAdded={isMovieAdded}
        />
        ) :
        (
          <MoviesCardList
            moviesList={savedList}
            deleteMovies={deleteMovies}
            isMovieAdded={isMovieAdded}
          />
        )
      }

      <Footer />
    </div>
  );
};

export default SavedMovies;
