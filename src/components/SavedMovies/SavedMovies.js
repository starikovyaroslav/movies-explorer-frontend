import React from "react";

import '../Movies/Movies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { Header } from "../Header/Header";
import Footer from "../Footer/Footer";
import auth from "../../utils/MainApi";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";


const SavedMovies = ({loggedIn}) => {

  const [savedList, setSavedList] = React.useState([]);

  React.useEffect(() => {
    auth
      .getSavedMovies()
      .then((cards) => {
        setSavedList(cards);
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
      });
  }, []);

  return (
    <div className="movies">
      <Header
        loggedIn={loggedIn}
      />
      <SearchForm />

      <section>
        { savedList.length === 0 ? (
          <Preloader />
        ) : (
          <ul className="movies-list">
          { savedList.map((movie) => {
              return <MoviesCard
                loggedIn={loggedIn}
                movie={movie}
                key={movie.id}
              />;
            }
            )}
          </ul>
        )}
      </section>






      <Footer />
    </div>
  );
}

export default SavedMovies;
