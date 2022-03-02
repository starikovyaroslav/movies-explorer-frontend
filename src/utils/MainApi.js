class MainApi {
  constructor({url, headers }) {
      this.url = url;
      this.headers = headers
  };

  register({ name, password, email, }) {
      return fetch(`${this.url}/signup`, {
          credentials: 'include',
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
              name: name,
              password: password,
              email: email
          }),
      })
      .then(this._checkResponse);
  }

  authorize({ password, email }) {
      return fetch(`${this.url}/signin`, {
          credentials: 'include',
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
              password: password,
              email: email
          }),
          })

      .then(this._checkResponse);
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const auth = new MainApi({
  url: 'https://api.movies-explorer.strkv.nomoredomains.work',
  headers: {'Content-Type': 'application/json'}
});

export default auth
