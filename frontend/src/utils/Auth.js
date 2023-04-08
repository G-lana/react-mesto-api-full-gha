class Auth {
  constructor({ url }) {
    this._url = url;
  }

  register(email, password) {
    return fetch(`${this._url}signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._requestResult(res));
  }
  login({ email, password }) {
    return fetch(`${this._url}signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => this._requestResult(res));
  }
  isValidToken(token) {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._requestResult(res));
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }
}
export const auth = new Auth({
  url: 'https://api.g.lana.students.nomoredomains.monster/',
});
