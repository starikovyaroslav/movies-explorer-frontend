import React from "react";

import './App.css';
import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { Route, Routes } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <div className="app">
      <Routes>
        <Route
          exact path='/'
          element={
            <Main
              isLoggedIn={loggedIn}
            />
          }
        />
        <Route
          path='/movies'
          element={
            <Movies
              isLoggedIn={loggedIn}
            />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <SavedMovies
              isLoggedIn={loggedIn}
            />
          }
        />
        <Route
        path='/signup'
        element={
          <Register />
        }
      />
      </Routes>
    </div>
  );
}

export default App;
