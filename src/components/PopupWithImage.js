import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._popupImg = this._popupSelector.querySelector('.popup__place-img');
    this._popupTitle = this._popupSelector.querySelector('.popup__place-title');
  }

  open(name, src) {
    this._popupImg.src = src;
    this._popupImg.alt = name;
    this._popupTitle.textContent = name;
    super.open();
  }
}
