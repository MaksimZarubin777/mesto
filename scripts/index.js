import {initialCards} from './initialCards.js';
import {Card} from './card.js';
import {settings} from './settings.js';

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
const popupPlace = document.querySelector('#popup-place');
const popupPlaceOpenButton = document.querySelector('.profile__button-add'); 
const popupPlaceCloseButton = document.querySelector('#popup-close');
const placeName = document.querySelector('#place-name'); 
const placeImg = document.querySelector('#place-img');
const formElementPlace = document.querySelector('#new-place');

// Переменные для Popup с картинкой места
export const popupPlaceInfo = document.querySelector('#popup-place-info');
const popupPlaceInfoCloseButton = document.querySelector('#popup-close-info');

// Константа кнопки эскейп
const ESC_CODE = 'Escape';

// Открыть попап
export const openPopup = (popup) => {
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
  document.removeEventListener('click', closePopupWithOverlay);
}

// Закрыть попап эскейпом
const closePopupWithEsc = (e) => {
  if (e.key === ESC_CODE) { 
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Закрыть попап черезе оверлей
const closePopupWithOverlay = (e) => {
  const classList = [...e.target.classList];
  const openedPopup = document.querySelector('.popup_opened');
  if (classList.includes('popup_opened')) {
    closePopup(openedPopup);
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

// Добавить новую карточку
const addNewCard = (evt) => {
  evt.preventDefault(); 
  const newCardNameAndLink = 
    {
      name: placeName.value,
      link: placeImg.value
    };
  const card = new Card (newCardNameAndLink.name, newCardNameAndLink.link);
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  closePopup(popupPlace);
}

// создание карточек через класс
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
})

// валидация карточек через класс
const popupProfileValidation = new FormValidator(settings, popupProfile);
const popupAddCardValidation = new FormValidator(settings, popupPlace);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();



// Закрыть Popup с картинкой
const closePopupPlaceInfo = () => {
  closePopup(popupPlaceInfo);
}

popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
formElementProfile.addEventListener('submit', formSubmitHandler); 
popupPlaceOpenButton.addEventListener('click', openPopupPlace);
popupPlaceCloseButton.addEventListener('click', closePopupPlace);
formElementPlace.addEventListener('submit', addNewCard);
popupPlaceInfoCloseButton.addEventListener('click', closePopupPlaceInfo);