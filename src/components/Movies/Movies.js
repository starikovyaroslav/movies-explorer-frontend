import React from "react";

import "./Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";

const Movies = ({ loggedIn, moviesList, searchError, addMovie, deleteMovies, isMovieAdded, onSubmit }) => {

  const [shortfilm, setShortfilm] = React.useState(false);
  const state = shortfilm ? "checkbox__state_enable" : "checkbox__state_disable";
  const shortFilmFilter = (movies) => {
    const filter = movies.filter((item) => item.duration < 40);
    return filter;
  }

  const onClickHandler = () => {
    setShortfilm(!shortfilm);
  };

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm
        onSubmit={onSubmit} onClickHandler={onClickHandler} state={state} shortfilm={shortfilm}
      />

      { searchError==='' ?
       (
        <MoviesCardList
          loggedIn={loggedIn}
          moviesList={shortfilm ? shortFilmFilter(moviesList) : moviesList}
          addMovie={addMovie}
          deleteMovies={deleteMovies}
          isMovieAdded={isMovieAdded}
        />
        ) :
        (
          <div className="movies__error">{searchError}</div>
        )
      }
      <Footer />
    </div>
  );
};

export default Movies;
