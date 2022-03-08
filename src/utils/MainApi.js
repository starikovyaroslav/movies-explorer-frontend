class MainApi {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  register(name, email, password) {
    return fetch(`${this.url}/signup`, {
      credentials: "include",
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  authorize(email, password) {
    return fetch(`${this.url}/signin`, {
      credentials: "include",
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  logout() {
    return fetch(`${this.url}/signout`, {
      credentials: "include",
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      credentials: "include",
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  setUserInfo(name, email) {
    return fetch(`${this.url}/users/me`, {
      credentials: "include",
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  addSavedMovies(movie) {
    return fetch(`${this.url}/movies`, {
      credentials: "include",
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        id: movie.id,
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        trailerLink: movie.trailerLink,
        image: movie.image.url
          ? `https://api.nomoreparties.co${movie.image.url}`
          : movie.image,
        thumbnail: movie.thumbnail
          ? movie.thumbnail
          : `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${this.baseAuthUrl}/movies`, {
      credentials: "include",
      method: "GET",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  deleteSavedMovies(_id) {
    return fetch(`${this.baseAuthUrl}/movies/${_id}`, {
      credentials: "include",
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const auth = new MainApi({
  url: "https://api.movies-explorer.strkv.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
