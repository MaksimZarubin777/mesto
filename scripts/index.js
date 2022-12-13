import {initialCards} from './initialCards.js';

// Переменные для Popup "Редактировать профиль"
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupProfile = document.querySelector('#popup-profile');
const profileName = document.querySelector('#profile-name'); 
const profileJob = document.querySelector('#profile-job');
const myName = document.querySelector('.profile__text-title');
const myJob = document.querySelector('.profile__text-subtitle');
const popupProfileCloseButton = document.querySelector('.popup__button-close');
const formElementProfile = document.querySelector('#change-info');



// Переменные для Popup "Добавить карточку"
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card');
const popupPlace = document.querySelector('#popup-place');
const popupPlaceOpenButton = document.querySelector('.profile__button-add'); 
const popupPlaceCloseButton = document.querySelector('#popup-close');
const placeName = document.querySelector('#place-name'); 
const placeImg = document.querySelector('#place-img');
const formElementPlace = document.querySelector('#new-place');


// Переменные для Popup с картинкой места
const popupPlaceInfo = document.querySelector('#popup-place-info');
const popupPlaceInfoCloseButton = document.querySelector('#popup-close-info');

// Константа кнопки эскейп
const ESC_CODE = 'Escape'

// Открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEsc);
  document.addEventListener('click', closePopupWithOverlay);
}

// Очистка полей ошибки при закрытии
const clearPopupErrorMessage = (popup) => {
  const popupInputs = [...popup.querySelectorAll('.popup__input')];
  const popupSpans = [...popup.querySelectorAll('.popup__input-error')];
  popupInputs.forEach((input) => {
    input.classList.remove('popup__input_type_error');
  });
  popupSpans.forEach((input) => {
    input.classList.remove('popup__input-error_active');
  });
}

// Закрыть попап
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEsc);
}

// Закрыть попап эскейпом
const closePopupWithEsc = (e) => {
  if (e.key === ESC_CODE) { // а почему мы тут используем глобальный ESC_CODE? почему нельзя оставить === 'Escape'?
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup)
    clearPopupErrorMessage(openedPopup);
  }
}

// Закрыть попап черезе оверлей
const closePopupWithOverlay = (e) => {
  const classList = [...e.target.classList];
  const openedPopup = document.querySelector('.popup_opened');
  if (classList.includes('popup_opened')) {
    closePopup(openedPopup);
    clearPopupErrorMessage(openedPopup);
  }
}

// Редактирование профиля
// 
// Открыть Popup профиля
const openPopupProfile = () => {
  openPopup(popupProfile);
  profileName.value = myName.textContent; 
  profileJob.value = myJob.textContent;
}

// Закрыть Popup профиля
const closePopupProfile = () => {
  closePopup(popupProfile);
  clearPopupErrorMessage(popupProfile);
}

// Сохранить изменения профиля
const formSubmitHandler = (evt) => {
    evt.preventDefault(); 
    const nameInputValue = profileName.value;
    const jobInputValue = profileJob.value;
    myName.textContent = nameInputValue;
    myJob.textContent = jobInputValue;
    closePopup(popupProfile);
}

// Добавить новое место
// 
// Открыть Popup "Добавить карточку"
const openPopupPlace = () => {
  openPopup(popupPlace)
  placeName.value = '';
  placeImg.value = '';
  const submitButton = popupPlace.querySelector('.popup__button-submit');
  submitButton.disabled = 'disabled';
  submitButton.classList.add('popup__button-submit_blocked');
}

// Закрыть Popup "Добавить карточку"
const closePopupPlace = () => {
  closePopup(popupPlace);
  clearPopupErrorMessage(popupPlace);
}

// Создать карточку
const createCard = (item) => {
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__title').textContent = item.name;
  const cardImage = card.querySelector('.card__img');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  const likeBtn = card.querySelector('.card__heart');
  const deleteBtn = card.querySelector('.card__trash');
  likeBtn.addEventListener('click', likeClick);
  deleteBtn.addEventListener('click', deleteClick);
  card.querySelector('.card__img').addEventListener('click', openPopupPlaceInfo);
  return card;
}

// Добавить новую карточку
const addNewCard = (evt) => {
  evt.preventDefault(); 
  const newCardNameAndLink = 
    {
      name: placeName.value,
      link: placeImg.value
    };
  cardsContainer.prepend(createCard(newCardNameAndLink));
  closePopup(popupPlace);
}

// Переключение лайка
const likeClick = (e) => {
  e.target.classList.toggle('card__heart_active');
  }

// Удаление карточки
const deleteClick = (e) => {
  e.target.closest('.card').remove();
}

// Popup с картинкой
// 
// Открыть Popup с картинкой
const openPopupPlaceInfo = (e) => {
  openPopup(popupPlaceInfo);
  popupPlaceInfo.querySelector('.popup__place-title').textContent = e.target.closest('.card').querySelector('.card__title').textContent;
  const popupPlaceImage = popupPlaceInfo.querySelector('.popup__place-img');
  popupPlaceImage.src = e.target.closest('.card').querySelector('.card__img').src;
  popupPlaceImage.alt = e.target.closest('.card').querySelector('.card__title').textContent;
}

// Закрыть Popup с картинкой
const closePopupPlaceInfo = () => {
  closePopup(popupPlaceInfo);
}

// Отображение карточек из InitialCards
initialCards.forEach(function(item) {
  cardsContainer.append(createCard(item));
})


popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
formElementProfile.addEventListener('submit', formSubmitHandler); 
popupPlaceOpenButton.addEventListener('click', openPopupPlace);
popupPlaceCloseButton.addEventListener('click', closePopupPlace);
formElementPlace.addEventListener('submit', addNewCard);
popupPlaceInfoCloseButton.addEventListener('click', closePopupPlaceInfo);




