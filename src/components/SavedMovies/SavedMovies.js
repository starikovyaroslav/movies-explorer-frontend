import React from "react";

import "../Movies/Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";


const SavedMovies = ({ loggedIn, savedList, searchError, deleteMovies, isMovieAdded, onSubmit }) => {

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
      <SearchForm onSubmit={onSubmit} onClickHandler={onClickHandler} state={state} shortfilm={shortfilm}/>

      { searchError==='' ?
       (
        <MoviesCardList
          moviesList={shortfilm ? shortFilmFilter(savedList) : savedList}
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

export default SavedMovies;
