import React from "react";

import './App.css';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { Route, Routes, useNavigate  } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  function handleAuthorization() {
    setLoggedIn(true);
    navigate('/movies');
  }

  function handleLogout() {
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            exact path='/'
            element={
              <Main
              loggedIn={loggedIn}
              />
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                exact path='/movies'
                loggedIn={loggedIn}
                component={Movies}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                exact path='/saved-movies'
                loggedIn={loggedIn}
                component={SavedMovies}
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
              <ProtectedRoute
                exact path='/profile'
                loggedIn={loggedIn}
                component={Profile}
                isLogout={handleLogout}
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
