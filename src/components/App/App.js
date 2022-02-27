import React from "react";

import './App.css';
import { Main } from '../Main/Main';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Movies } from '../Movies/Movies';
import { Route, Routes, useNavigate  } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

function App() {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);

  function handleAuthorization() {
    setLoggedIn(true);
    navigate('/movies');
  }

  function handleLogout() {
    setLoggedIn(false);
  }

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
        <Route
          path='/signin'
          element={
            <Login
              onLogin={handleAuthorization}
            />
          }
        />
        <Route
          path='/profile'
          element={
            <Profile
              isLoggedIn={loggedIn}
              isLogout={handleLogout}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
