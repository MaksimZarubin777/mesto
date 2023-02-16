import Popup from "../components/Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor (popupSelector, handledeleteCard) {
    super(popupSelector);
    this._handleDeleteCard = handledeleteCard;
    this._form = this._popupSelector.querySelector('form');
    this._submitButton = this._form.querySelector('.popup__button-submit');
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setSubmitButtonText (text) {
    this._submitButton.textContent = text;
  }

  setEventListeners () {
    super.setEventListeners();
    this._form.addEventListener('submit', (e)=>{
      e.preventDefault();
      this._handleDeleteCard(this._card);
    })
  }
}