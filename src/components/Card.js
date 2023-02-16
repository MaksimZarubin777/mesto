export default class Card {
  constructor(cardData, templateSelector, myUserId, {handleCardClick, handleCardDelete, handleLike}) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLike = handleLike;
    this._myUserId = myUserId;
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__img');
    this._cardLike = this._element.querySelector('.card__heart');
    this._cardTrash =  this._element.querySelector('.card__trash');
    this._likeCounter = this._element.querySelector('.card__like-counter');
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
    this._ownerId = this._cardData.owner._id;
    this._likeCounter.textContent = this._cardData.likes.length;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardId = this._cardData._id;
    this._element.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    this._manageDeleteButtom();
    this._manageCardLikeToggle();
    return this._element;
  }

  // метод проверяет поставлен ли уже лайк на карточку для функции handleLike в index.js
  isLiked () { 
    return this._cardData.likes.some((like) => like._id === this._myUserId)
  }

  //метод показывает/убирает кнопку удалить карточку
  _manageDeleteButtom () {
    if (this._ownerId != this._myUserId) {
      this._element.querySelector('.card__trash').remove()
    }
  }

  // при генерации карточки метод проверяет был ли на ней лайк и ставит его 
  _manageCardLikeToggle () {
    this._cardData.likes.forEach((cardLike)=>{
      if (cardLike._id == this._myUserId) {
        this._cardLike.classList.add('card__heart_active');
      }   
    })
  }

  // Метод меняет количетсво лайков. Используется в handleLike в index.js. 
  manageCardLikes (initialCard) { 
    this._cardData.likes = initialCard.likes
    this._likeCounter.textContent = this._cardData.likes.length
    this._likeClick()
  }

  //Метод меняет кноку лайка на _active и обратно при клике
  _likeClick () { 
     this._cardLike.classList.toggle('card__heart_active');
    }
  
  //Метод для удаления карточки из разметки  
  deleteCard () {
    this._cardTrash.closest('.card').remove();
  }

  _setEventListeners () {
     this._cardLike.addEventListener('click', () => {
      this._handleLike(this._cardData)
    })
    this._cardTrash.addEventListener('click', () => {
      this._handleCardDelete(this._cardData);
    })
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  };
}

