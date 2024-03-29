export class Api {
  constructor(options) {
    this._options = options;
    this._baseurl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _getResponseData (res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileInfo() {
    return fetch(`${this._baseurl}/users/me`, {
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res)
    })  
  } 

  getInitialCard () {
    return fetch (`${this._baseurl}/cards`, {
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res)
    }) 
  }

  handlePutLike (cardId) {
    return fetch (`${this._baseurl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res)
    }) 
  }

  handleDeleteLike (cardId) {
    return fetch (`${this._baseurl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this._getResponseData(res)
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
      return this._getResponseData(res)
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
      return this._getResponseData(res)
    }) 
  }

  deleteCard (cardId) {
    return fetch(`${this._baseurl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._getResponseData(res)
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
      return this._getResponseData(res)
    }) 
  }  
}

