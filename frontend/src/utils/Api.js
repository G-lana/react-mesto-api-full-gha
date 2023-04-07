class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _requestResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._requestResult(res));
  }

  getProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._requestResult(res));
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => this._requestResult(res));
  }
  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => this._requestResult(res));
  }
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._requestResult(res));
  }
  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => this._requestResult(res));
  }
  _deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes `, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._requestResult(res));
  }
  _addLike(id) {
    return fetch(`${this._url}/cards/${id}/likes `, {
      method: 'PUT',
      headers: this._headers,
      credentials: 'include',
    }).then((res) => this._requestResult(res));
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._deleteLike(id);
    } else {
      return this._addLike(id);
    }
  }
}

export const api = new Api({
  url: 'https://api.g.lana.students.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});
