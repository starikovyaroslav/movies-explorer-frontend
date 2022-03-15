import React from "react";

import "./Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";

const Movies = ({ loggedIn, moviesList, movies, isSuccess, addMovie, deleteMovies, isMovieAdded, onSubmit }) => {

  const [shortfilm, setShortfilm] = React.useState(false);
  const state = shortfilm ? "checkbox__state_enable" : "checkbox__state_disable";
  const shortFilmFilter = (movies) => {
    const filter = movies.filter((item) => item.duration < 40);
    if (filter === 0) {
      isSuccess = false;
    } else {
      return filter;
    }
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

      { isSuccess ?
       (
        <MoviesCardList
          loggedIn={loggedIn}
          moviesList={shortfilm ? shortFilmFilter(movies) : movies}
          addMovie={addMovie}
          deleteMovies={deleteMovies}
          isMovieAdded={isMovieAdded}
        />
        ) :
        (
          <MoviesCardList
            loggedIn={loggedIn}
            moviesList={shortfilm ? shortFilmFilter(moviesList) : moviesList}
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
