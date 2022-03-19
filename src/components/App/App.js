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
  const [querySaved, setQuerySaved] = React.useState(JSON.parse(localStorage.getItem('querySaved')));
  const [searchError, setSearchError] = React.useState("");
  const [searchSaveError, setSearchSaveError] = React.useState("");
  const [error, setError] = React.useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
  const [message, setMessage] = React.useState({text: '' })
  const [filterMovies, setFilterMovies] = React.useState(JSON.parse(localStorage.getItem('filter')) || []);
  const [filterSaved, setFilterSaved] = React.useState(JSON.parse(localStorage.getItem('filterSaved')) || []);
  const [isSuccess, setIsSuccess] = React.useState(JSON.parse(localStorage.getItem('isSuccess')) || false);
  const [isSuccessSaved, setIsSuccessSaved] = React.useState(false);
  localStorage.setItem("filter", JSON.stringify(filterMovies));
  localStorage.setItem("filterSaved", JSON.stringify(filterSaved));
  localStorage.setItem("isSuccess", JSON.stringify(isSuccess));
  localStorage.setItem("isSuccessSaved", JSON.stringify(isSuccessSaved))

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    setLoggedIn(false);
    setCurrentUser({});
    setFilterSaved([]);
    setFilterMovies([]);
    setSavedList([]);
    setMoviesList([]);
    setIsSuccess(false);
    setIsSuccessSaved(false);
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
        setMessage({text: 'Произошла ошибка при авторизации.'});
        console.log(`${err.message} (${err.status})`);
        setIsInfoTooltipOpen(true);
      })
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
      .finally(() => setIsInfoTooltipOpen(true));
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
        setMessage({text: 'Невозможно добавить фильм' });
        setIsInfoTooltipOpen(true);
        console.log(`${err.message} (${err.status})`);
      })
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
        setMessage({text: 'Фильм удален' });
        console.log("Фильм удален");
      })
      .catch((err) => {
        setMessage({text: 'Невозможно удалить фильм' });
        console.log(`${err.message} (${err.status})`);
      })
      .finally(() => setIsInfoTooltipOpen(true));
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
        location.pathname === '/saved-movies' ? setIsSuccessSaved(false) : setIsSuccess(false);
        location.pathname === '/saved-movies' ? setSearchSaveError("Ничего не найдено") : setSearchError("Ничего не найдено");
      } else {
        location.pathname === '/saved-movies' ? setIsSuccessSaved(true) : setIsSuccess(true);
        setSearchError("");
        setSearchSaveError("");
      }
      return filter;
    }
    return [];
  };

  const searchHandler = (search) => {
    localStorage.setItem("query", JSON.stringify(search));
    setQuery(search);
    setFilterMovies(searchFilter(moviesList, search));
  };

  const searchSavedhHandler = (search) => {
    localStorage.setItem("querySaved", JSON.stringify(search));
    setQuerySaved(search);
    setFilterSaved(searchFilter(savedList, search));
  };

  React.useEffect(() => {

    if (loggedIn) {
      getInitialCards();
      getSavedMovies();
    }

  }, [loggedIn]);

  React.useEffect(() => {
    setError('');
    if (query === '') {
      setIsSuccess(false);
      setSearchError("")
    } else if (querySaved === '') {
      setIsSuccessSaved(false);
      setError("");
      setSearchSaveError("");
    }
  },)

  React.useEffect(() => {
    if (savedList.length === 0) {
      setError("У вас нет сохраненных фильмов");
    } else setError("");
  })

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
                isSuccess={isSuccessSaved}
                savedList={isSuccessSaved ? filterSaved : savedList}
                deleteMovies={deleteMovies}
                isMovieAdded={isMovieAdded}
                onSubmit={searchSavedhHandler}
                searchError={searchSaveError}
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
