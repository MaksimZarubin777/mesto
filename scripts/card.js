
import {openPopup, popupPlaceInfo} from './index.js';

export class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link
  }

  _getTemplate () {
    const cardElement = document
    .querySelector('#card')
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.card__img').src = this.link;
    this._element.querySelector('.card__title').textContent = this.name;
    this._setEventListeners();
    return this._element;
  }

  _likeClick () {
    this._element.querySelector('.card__heart').classList.toggle('card__heart_active');
    }
  
  _deleteClick () {
    this._element.querySelector('.card__trash').closest('.card').remove();
  }

  _openCardImage () {
    openPopup(popupPlaceInfo);
    popupPlaceInfo.querySelector('.popup__place-title').textContent = this.name;
    popupPlaceInfo.querySelector('.popup__place-img').src = this.link;
  }

  _setEventListeners () {
    this._element.querySelector('.card__heart').addEventListener('click', () => {
      this._likeClick();
    })
    this._element.querySelector('.card__trash').addEventListener('click', () => {
      this._deleteClick();
    })
    this._element.querySelector('.card__img').addEventListener('click', () => {
      this._openCardImage();
    })
  };
}

