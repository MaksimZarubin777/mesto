// Настройки валидации 
export const settings = {
  formSelector: 'form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_blocked',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// Переменные для Popup "Редактировать профиль"
export const popupProfileOpenButton = document.querySelector('.profile__button-edit');
export const popupProfile = document.querySelector('#popup-profile');
export const profileName = document.querySelector('#profile-name'); 
export const profileJob = document.querySelector('#profile-job');

// Переменные для Popup "Добавить карточку"
export const popupPlace = document.querySelector('#popup-place');
export const popupPlaceOpenButton = document.querySelector('.profile__button-add'); 

// Переменные для Popup с картинкой места
export const popupPlaceInfo = document.querySelector('#popup-place-info');

// Селектор для создания класса Section
export const cardListSelector = '.elements';

// Селектор открытого попапа для класса Popup
export const popupOpenSelector = 'popup_opened';

// Константа кнопки эскейп для класса Popup
export const ESC_CODE = 'Escape';

// Селектор кнопки закрыть для класса Popup
export const popupCloseButtonSelector = 'popup__button-close';

// Список карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 
