import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  constructor (popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popupSelector.querySelector('form');
    this._inputs = [...this._form.querySelectorAll('.popup__input')];
    this._submitButton = this._popupSelector.querySelector('.popup__button-submit');
  }

  _getInputValues () {
    const values = {};
    this._inputs.forEach(input => {
      const name = input.name;
      const value = input.value;
      values[name] = value;
    })
    return values;
  }

  setSubmitButtonText (text) {
    this._submitButton.textContent = text;
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
