import React from "react";

import "../Movies/Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIE } from "../../utils/Consts";

const SavedMovies = ({ loggedIn, savedList, searchError, deleteMovies, isMovieAdded, onSubmit, error }) => {

  const [shortfilm, setShortfilm] = React.useState(JSON.parse(localStorage.getItem('shortfilmSaved')));
  const state = shortfilm ? "checkbox__state_enable" : "checkbox__state_disable";
  localStorage.setItem("shortfilmSaved", JSON.stringify(shortfilm));

  const shortFilmFilter = (movies) => {
    const filter = movies.filter((item) => item.duration < SHORT_MOVIE);
    return filter;
  }

  const errorText = searchError === "" ? error : searchError;

  const onClickHandler = () => {
    setShortfilm(!shortfilm);
  };

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm onSubmit={onSubmit} onClickHandler={onClickHandler} state={state} shortfilm={shortfilm}/>

      { errorText === "" ?
       (
        <MoviesCardList
          moviesList={shortfilm ? shortFilmFilter(savedList) : savedList}
          deleteMovies={deleteMovies}
          isMovieAdded={isMovieAdded}
        />
        ) :
        (
          <div className="movies__error">{errorText}</div>
        )
      }

      <Footer />
    </div>
  );
};

export default SavedMovies;
