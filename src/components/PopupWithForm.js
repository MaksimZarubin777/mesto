import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupSelector.querySelector('form');
  }

  _getInputValues () {
    const values = {};
    const inputs = [...this._form.querySelectorAll('.popup__input')];
    inputs.forEach(input => {
      const name = input.name;
      const value = input.value;
      values[name] = value;
    })
    return values;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._handleSubmit(evt, this._getInputValues()));
  }

  close () {
    super.close();
    this._form.reset();
  }  
}
