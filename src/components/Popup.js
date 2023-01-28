import { popupOpenSelector, ESC_CODE, popupCloseButtonSelector } from "../components/constants.js"; 

export default class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  open () {
    this._popupSelector.classList.add(popupOpenSelector);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close () {
    this._popupSelector.classList.remove(popupOpenSelector);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
      if (evt.key === ESC_CODE) {
        this.close()
      }
  }

  setEventListeners () {
    document.addEventListener('click', (evt) => {
      const classList = [...evt.target.classList];
      if (classList.includes(popupOpenSelector) || classList.includes(popupCloseButtonSelector)) {
        this.close()
      };
    })
  }
}