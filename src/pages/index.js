import './index.css'
import Card from '../components/Card.js';
import {settings, initialCards, cardListSelector} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator  from '../components/FormValidator.js'

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

// Создание класса UserInfo
const profileInfo = new UserInfo({profileNameSelector: '.profile__text-title', profileDescriptionSelector: '.profile__text-subtitle'});


// ПОПАП ПРОФИЛЬ 
// 
// Сохранить изменения профиля
const handleProfilFormSubmit = (evt, values) => {
  evt.preventDefault(); 
  profileInfo.setUserInfo(values.name, values.description);
  handleProfilePopup.close();
}

// Создание класса для попапа "Редактировать профиль"
const handleProfilePopup = new PopupWithForm('#popup-profile', handleProfilFormSubmit);
handleProfilePopup.setEventListeners();

// Открыть Popup профиля
const openPopupProfile = () => {
  popupProfileValidation.resetValidation();
  handleProfilePopup.open();
  const {name, description} = profileInfo.getUserInfo();
  profileName.value = name;
  profileJob.value = description;
}
// Слушатель клика на кпопку редактирования профиля
popupProfileOpenButton.addEventListener('click', openPopupProfile);


// ПОПАП НОВАЯ КАРТОЧКА
// 
// Функция создания карточки
const generateCard = (card) => {
  return card.generateCard();
}

// Добавить новую карточку
const addNewCard = (evt, values) => {
  evt.preventDefault(); 
  const newCardNameAndLink = 
    {
      name: values['form-input'],
      link: values.link
    };
  const card = new Card (newCardNameAndLink, '#card');
  defaultCardList.addItem(generateCard(card))
  handlePlacePopup.close();
}

// Создание класса для попапа "Добавить карточку"
const handlePlacePopup = new PopupWithForm('#popup-place', addNewCard);
handlePlacePopup.setEventListeners();

// Слушатель клика на кнопку "Добавить карточку"
popupPlaceOpenButton.addEventListener('click', () => {
  popupAddCardValidation.resetValidation(); 
  handlePlacePopup.open();
});


// ПОПАП С КАРТИНКОЙ КАРТОЧКИ
// 
// Создание экземпляра класса PopupWithImage для попапа с картинкой
const popupWithImg = new PopupWithImage('#popup-place-info');
popupWithImg.setEventListeners();


// ОТРИСОВКА КАРТОЧЕК НА СТРАНИЦЕ
// 
// Создание класса SECTION
const defaultCardList = new Section(cardListSelector);

// Клик по карточке открывает попап с картинкой карточки
const handleCardClick = (name, src) => {
  popupWithImg.open(name, src);
}

// Отрисовка карточек на странице
defaultCardList.renderItems({
  data: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem, '#card', handleCardClick);
    defaultCardList.addItem(generateCard(card));
  }, 
});

// Валидация карточек через класс
const popupProfileValidation = new FormValidator(settings, popupProfile);
const popupAddCardValidation = new FormValidator(settings, popupPlace);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();