export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._cardImage = this._element.querySelector('.card__img')
    this._cardLike = this._element.querySelector('.card__heart')
    this._cardTrash =  this._element.querySelector('.card__trash')
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }

  _likeClick () {
     this._cardLike.classList.toggle('card__heart_active');
    }
  
  _deleteClick () {
    this._cardTrash.closest('.card').remove();
  }

  _setEventListeners () {
     this._cardLike.addEventListener('click', () => {
      this._likeClick();
    })
    this._cardTrash.addEventListener('click', () => {
      this._deleteClick();
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  };
}

