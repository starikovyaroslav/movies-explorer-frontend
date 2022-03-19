class Api {
  constructor({url, headers}) {
      this.url = url;
      this.headers = headers;
  };

  getInitialCards() {
      return fetch(this.url, {
          headers: this.headers
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

const api = new Api({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {'Content-Type': 'application/json'}
});

export default api
