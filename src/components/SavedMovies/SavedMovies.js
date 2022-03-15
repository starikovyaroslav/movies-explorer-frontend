import React from "react";

import "../Movies/Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


const SavedMovies = ({ loggedIn, savedList, isSuccess, deleteMovies, isMovieAdded, onSubmit, movies }) => {

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
      <SearchForm onSubmit={onSubmit} onClickHandler={onClickHandler} state={state} shortfilm={shortfilm}/>

      { isSuccess ?
       (
        <MoviesCardList
          moviesList={shortfilm ? shortFilmFilter(movies) : movies}
          deleteMovies={deleteMovies}
          isMovieAdded={isMovieAdded}
        />
        ) :
        (
          <MoviesCardList
            moviesList={shortfilm ? shortFilmFilter(savedList) : savedList}
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
