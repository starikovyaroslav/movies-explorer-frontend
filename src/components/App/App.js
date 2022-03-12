import React from "react";

import "./App.css";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import auth from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedMovies, setSavedMovies] = React.useState([]);

  function handleLogout() {
    localStorage.clear()
    sessionStorage.clear()
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

  React.useEffect(() => {
    if (localStorage.loggedIn) {
      auth.getUserInfo()
        .then((user) => {
          setCurrentUser(user)
          localStorage.setItem("user", JSON.stringify(user));
          setLoggedIn(true);
        })
        .catch((err) => {
          console.error(err);
          navigate("/");
      })
    }
  }, []);

    const getCurrentUser = () => {
    auth
      .getUserInfo()
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAuthorization = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("loggedIn", true);
        getCurrentUser();
        setLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegistration = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        setTimeout(() => {
          handleAuthorization(email, password);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateUser = (name, email) => {
    auth
      .setUserInfo(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSavedMovies = () => {
    auth
      .getSavedMovies()
      .then((data) => {
        const saved = data.map((item) => item._id);
        localStorage.setItem("savedMovies", JSON.stringify(saved));
        setSavedMovies(saved);
        console.log(saved);
      })
      .catch((err) => {
        localStorage.removeItem("savedMovies");
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (loggedIn) {
      console.log(loggedIn);
      getSavedMovies();
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                path="/movies"
                loggedIn={loggedIn}
                component={Movies}
                savedMovies={savedMovies}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                path="/saved-movies"
                loggedIn={loggedIn}
                component={SavedMovies}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegistration={handleRegistration} />}
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleAuthorization} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                path="/profile"
                loggedIn={loggedIn}
                component={Profile}
                isLogout={handleLogout}
                currentUser={currentUser}
                onUpdateUser={handleUpdateUser}
              />
            }
          />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
