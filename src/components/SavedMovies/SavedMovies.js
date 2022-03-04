import React from "react";

import '../Movies/Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";

const SavedMovies = ({loggedIn}) => {
  return (
    <div className="movies">
      <Header
        loggedIn={loggedIn}
      />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default SavedMovies;
