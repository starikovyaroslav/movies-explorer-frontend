import React from "react";

import "./Movies.css";
import { SearchForm } from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import api from "../../utils/MoviesApi";

const Movies = ({ loggedIn, addMovie, deleteMovies, isMovieAdded }) => {

  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setMoviesList(cards);
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
      });
  }, []);

  return (
    <div className="movies">
      <Header loggedIn={loggedIn} />
      <SearchForm />
      <MoviesCardList
        loggedIn={loggedIn}
        moviesList={moviesList}
        addMovie={addMovie}
        deleteMovies={deleteMovies}
        isMovieAdded={isMovieAdded}
      />
      <Footer />
    </div>
  );
};

export default Movies;
