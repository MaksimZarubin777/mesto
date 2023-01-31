export default class UserInfo {
  constructor ({profileNameSelector, profileDescriptionSelector}) {
    this._name = document.querySelector(profileNameSelector);
    this._description = document.querySelector(profileDescriptionSelector);
  }

  getUserInfo () {
    return {name: this._name.textContent, description: this._description.textContent};
  }

  setUserInfo (data) {
    this._name.textContent = data.name;
    this._description.textContent = data.description;
  }
}