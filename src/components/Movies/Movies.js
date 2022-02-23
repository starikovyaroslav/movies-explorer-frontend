import React from "react";

import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export const Movies = () => {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList />
    </div>
  );
}
