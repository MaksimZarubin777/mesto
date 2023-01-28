import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  open(name, src) {
    this._popupSelector.querySelector('.popup__place-img').src = src;
    this._popupSelector.querySelector('.popup__place-img').alt = name;
    this._popupSelector.querySelector('.popup__place-title').textContent = name;
    super.open();
  }
}
