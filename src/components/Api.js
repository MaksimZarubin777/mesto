class Api {
  constructor(options) {
    this._options = options;
    this._baseurl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  getProfileInfo() {
    return fetch(`${this._baseurl}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  } 

  getInitialCard () {
    return fetch (`${this._baseurl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  handlePutLike (cardId) {
    return fetch (`${this._baseurl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  handleDeleteLike (cardId) {
    return fetch (`${this._baseurl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  updateProfileInfo (data) {
    return fetch(`${this._baseurl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addNewCard (data) {
    return fetch(`${this._baseurl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCard (cardId) {
    return fetch(`${this._baseurl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  avatarUpdate (inputResult) {
    return fetch (`${this._baseurl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: inputResult,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '281df4cd-64fd-4e10-9c44-1157fa2ba97c',
    'Content-Type': 'application/json'
  }
}); 