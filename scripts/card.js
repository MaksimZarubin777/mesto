
import {openPopup, popupPlaceInfo} from './index.js';

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._element.querySelector('.card__img').src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
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
    popupPlaceInfo.querySelector('.popup__place-title').textContent = this._name;
    popupPlaceInfo.querySelector('.popup__place-img').src = this._link;
    popupPlaceInfo.querySelector('.popup__place-img').alt = this._name;
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

