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
import Popup from "../Popup/Popup";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [moviesList, setMoviesList] = React.useState([]);
  const [savedList, setSavedList] = React.useState([]);
  const [query, setQuery] = React.useState(JSON.parse(localStorage.getItem('query')));
  const [searchError, setSearchError] = React.useState("");
  const [error, setError] = React.useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [message, setMessage] = React.useState({text: '' })
  const [filterMovies, setFilterMovies] = React.useState(JSON.parse(localStorage.getItem('filter')) || []);
  const [filterSaved, setFilterSaved] = React.useState(JSON.parse(localStorage.getItem('filterSaved')) || []);
  const [isSuccess, setIsSuccess] = React.useState(JSON.parse(localStorage.getItem('isSuccess')) || false);

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

  function closePopup() {
    setIsInfoTooltipOpen(false);
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
          console.log(`${err.message} (${err.status})`);
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
        console.log(`${err.message} (${err.status})`);
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
        console.log(`${err.message} (${err.status})`);
      });
  };



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
        console.log(`${err.message} (${err.status})`);
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
        console.log(`${err.message} (${err.status})`);
      });
  };

  const handleRegistration = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        setMessage({text: 'Вы успешно зарегистрировались!' });
        setTimeout(() => {
          handleAuthorization(email, password);
        }, 2000);
      })
      .catch((err) => {
        setMessage({text: 'При регистрации пользователя произошла ошибка.' });
        console.log(`${err.message} (${err.status})`);
      })
      .finally(() => setIsInfoTooltipOpen(true))
  };

  const handleUpdateUser = (name, email) => {
    auth
      .setUserInfo(name, email)
      .then((data) => {
        setMessage({text: 'Данные изменены' });
        setCurrentUser(data);
      })
      .catch((err) => {
        setMessage({text: 'При обновлении профиля произошла ошибка' });
        console.log(`${err.message} (${err.status})`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  };

  const addMovie = (movie) => {
    auth
      .addSavedMovies(movie)
      .then((res) => {
        setSavedList([...savedList, { ...res, id: res.id }]);
      })
      .catch((err) => {
        console.log(`${err.message} (${err.status})`);
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
        console.log(`${err.message} (${err.status})`);
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
      localStorage.setItem("isSuccess", JSON.stringify(isSuccess))
      return filter;
    }
    return [];
  };

  const searchHandler = (search) => {
    localStorage.setItem("query", JSON.stringify(search));
    setQuery(search);
    setFilterMovies(searchFilter(moviesList, search));
    localStorage.setItem("filter", JSON.stringify(filterMovies));
  };

  const searchSavedhHandler = (search) => {
    localStorage.setItem("query", JSON.stringify(search));
    setQuery(search);
    setFilterSaved(searchFilter(savedList, search));
    localStorage.setItem("filterSaved", JSON.stringify(filterSaved));
  };

  React.useEffect(() => {

    if (loggedIn) {
      getInitialCards();
      getSavedMovies();
    }

  }, [loggedIn]);

  React.useEffect(() => {
    setError('');
    if (filterMovies.length === 0) {
      setFilterMovies(moviesList);
    } else if (filterSaved.length === 0 || savedList.length === 0 ) {
      setFilterSaved(savedList);
      setError("У вас нет сохраненных фильмов");
    }
  },)

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
                error={error}
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

        <Popup
          isOpen={isInfoTooltipOpen}
          onClose={closePopup}
          title={message.text}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
