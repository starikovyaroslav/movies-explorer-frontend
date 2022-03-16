import React from "react";

import "./App.css";
import { Main } from "../Main/Main";
import Movies from "../Movies/Movies";
import { Route, Routes, useNavigate, useLocation, Navigate} from "react-router-dom";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import auth from "../../utils/MainApi";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import api from "../../utils/MoviesApi";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [moviesList, setMoviesList] = React.useState([]);
  const [savedList, setSavedList] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [searchError, setSearchError] = React.useState("");
  const [filterMovies, setFilterMovies] = React.useState([]);
  const [filterSaved, setFilterSaved] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setFilterSaved([]);
    setFilterMovies([]);
    setSavedList([]);
    setMoviesList([]);
    auth.logout();
    navigate("/");
  }

  React.useEffect(() => {
    const path = location.pathname;
    if (localStorage.loggedIn) {
      auth
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          setLoggedIn(true);
          navigate(path);
        })
        .catch((err) => {
          console.error(err);
          navigate("/");
        });
    }
  }, []);

  const getInitialCards = () => {
    api
      .getInitialCards()
      .then((cards) => {
        localStorage.setItem("movies", JSON.stringify(cards));
        setMoviesList(cards);
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
      });
  };

  const getSavedMovies = () => {
    auth
      .getSavedMovies()
      .then((cards) => {
        localStorage.setItem("savedMovies", JSON.stringify(cards));
        setSavedList(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (loggedIn) {
      getInitialCards();
      getSavedMovies();
    }

  }, [loggedIn]);

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
          const newList = savedList.filter((item) => item.id !== res.id);
          setSavedList(newList);
        }
        console.log("Фильм удален");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isMovieAdded = (movie) =>
    savedList.some((item) => item.id === movie.id);

  const searchFilter = (data, query) => {
    if (query) {
      const regex = new RegExp(query, "gi");
      const filter = data.filter(
        (item) => regex.test(item.nameRU) || regex.test(item.nameEN)
      );
      if (filter.length === 0) {
        setIsSuccess(false);
        setSearchError("Ничего не найдено");
      } else {
        setIsSuccess(true);
        setSearchError("");
      }
      return filter;
    }
    return [];
  };

  const searchHandler = (search) => {
    setTimeout(() => {
      localStorage.setItem("query", JSON.stringify(search));
      setQuery(search);
      setFilterMovies(searchFilter(moviesList, search));
      localStorage.setItem("filter", JSON.stringify(filterMovies));
    }, 1000);
  };

  const searchSavedhHandler = (search) => {
    setTimeout(() => {
      localStorage.setItem("query", JSON.stringify(search));
      setQuery(search);
      setFilterSaved(searchFilter(savedList, search));
      localStorage.setItem("filter", JSON.stringify(filterSaved));
    }, 1000);
  };

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
                isSuccess={isSuccess}
                component={Movies}
                moviesList={isSuccess ? filterMovies : moviesList}
                addMovie={addMovie}
                isMovieAdded={isMovieAdded}
                deleteMovies={deleteMovies}
                onSubmit={searchHandler}
                searchError={searchError}
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
                isSuccess={isSuccess}
                savedList={isSuccess ? filterSaved : savedList}
                deleteMovies={deleteMovies}
                isMovieAdded={isMovieAdded}
                onSubmit={searchSavedhHandler}
                searchError={searchError}
              />
            }
          />
          <Route
            path="/signup"
            element={ loggedIn ? <Navigate to ="/"/> : <Register handleRegistration={handleRegistration} />}
          />
          <Route
            path="/signin"
            element={loggedIn ? <Navigate to ="/"/> : <Login onLogin={handleAuthorization} />}
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
