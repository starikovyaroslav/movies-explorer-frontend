import React from "react";

import '../Movies/Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";

const SavedMovies = ({isLoggedIn}) => {
  return (
    <div className="movies">
      <Header
        isLoggedIn={isLoggedIn}
      />
      <SearchForm />
      <MoviesCardList />
      <Footer />
    </div>
  );
}

export default SavedMovies;
