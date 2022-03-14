import React from "react";

import "./App.css";
import { Main } from "../Main/Main";
import Movies from "../Movies/Movies";
import { Route, Routes, useNavigate } from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import auth from "../../utils/MainApi";
import api from "../../utils/MoviesApi";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [savedList, setSavedList] = React.useState([]);


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

  React.useEffect(() => {
    auth
      .getSavedMovies()
      .then((cards) => {
        localStorage.setItem("savedMovies", JSON.stringify(cards));
        setSavedList(cards);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const addMovie = (movie) => {
    auth
      .addSavedMovies(movie)
      .then((res) => {
        setSavedList([...savedList, { ...res, id: res.id }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMovies = (movie) => {
    const id = savedList.find((item) => item.id === movie.id)._id;
    auth
      .deleteSavedMovies(id)
      .then((res) => {
        if (res) {
          const newList = savedList.filter((item) => item.id !== res.id)
          setSavedList(newList);
        }
        console.log("Фильм удален");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isMovieAdded = (movie) => savedList.some((item) => item.id === movie.id);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                component={Movies}
                addMovie={addMovie}
                isMovieAdded={isMovieAdded}
                deleteMovies={deleteMovies}
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
                savedList={savedList}
                deleteMovies={deleteMovies}
                isMovieAdded={isMovieAdded}
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
