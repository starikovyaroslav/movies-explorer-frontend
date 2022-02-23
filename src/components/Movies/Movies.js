import React from "react";

import './Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';

export const Movies = () => {
  return (
    <div className="movies">
      <SearchForm />
    </div>
  );
}
