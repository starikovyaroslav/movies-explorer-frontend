import React from "react";

import './App.css';
import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { Route, Routes } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="app">
      <Header
        isLoggedIn={loggedIn}
      />

      <Routes>
        <Route
          exact path='/'
          element={
            <Main />
          }
        />
        <Route
          path='/movies'
          element={
            <Movies />
          }
        />
        <Route
          path='/saved-movies'
          element={
            <SavedMovies />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
