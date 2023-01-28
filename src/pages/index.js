import './index.css'
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import {settings, initialCards, cardListSelector, popupProfileOpenButton, popupProfile, profileName, 
  profileJob, popupPlace, popupPlaceOpenButton, popupPlaceInfo} from '../components/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator  from '../components/FormValidator.js'

// Создание класса UserInfo
const profileInfo = new UserInfo({profileNameSelector: '.profile__text-title', profileDescriptionSelector: '.profile__text-subtitle'});


// ПОПАП ПРОФИЛЬ 
// 
// Создание класса для попапа "Редактировать профиль"
const handleProfilePopup = new Popup(popupProfile);
handleProfilePopup.setEventListeners();

// Сохранить изменения профиля
const profileSubmitHandle = (evt, values) => {
  evt.preventDefault(); 
  profileInfo.setUserInfo(values.name, values.description);
  popupProfileWithForm.close();
}

// Открыть Popup профиля
const openPopupProfile = () => {
  handleProfilePopup.open();
  const {name, description} = profileInfo.getUserInfo();
  profileName.value = name;
  profileJob.value = description;
}
// Слушатель клика на кпопку редактирования профиля
popupProfileOpenButton.addEventListener('click', openPopupProfile);

// Создание экземпляра класса PopupWithForm для попапа "Редактировать профиль"
const popupProfileWithForm = new PopupWithForm(popupProfile, profileSubmitHandle);
popupProfileWithForm.setEventListeners();


// ПОПАП НОВАЯ КАРТОЧКА
// 
// Создание класса для попапа "Добавить карточку"
const handlePlacePopup = new Popup(popupPlace);
handlePlacePopup.setEventListeners();

// Слушатель клика на кнопку "Добавить карточку"
popupPlaceOpenButton.addEventListener('click', () => handlePlacePopup.open());

// Добавить новую карточку
const addNewCard = (evt, values) => {
  evt.preventDefault(); 
  const newCardNameAndLink = 
    {
      name: values['form-input'],
      link: values.link
    };
  const card = new Card (newCardNameAndLink.name, newCardNameAndLink.link, '#card');
  const cardElement = card.generateCard();
  document.querySelector('.elements').prepend(cardElement);
  popupNewCardWithForm.close();
}

// Создание экземпляра класса PopupWithForm для попапа "Добавить карточку"
const popupNewCardWithForm = new PopupWithForm(popupPlace, addNewCard);
popupNewCardWithForm.setEventListeners();


// ПОПАП С КАРТИНКОЙ КАРТОЧКИ
// 
// Создание экземпляра класса PopupWithImage для попапа с картинкой
const popupWithImg = new PopupWithImage(popupPlaceInfo);
popupWithImg.setEventListeners();


// ОТРИСОВКА КАРТОЧЕК НА СТРАНИЦЕ
// 
// Создание класса SECTION
const defaultCardList = new Section({
  data: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem.name, cardItem.link, '#card', handleCardClick);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }, 
}, cardListSelector);

// Клик по карточке открывает попап с картинкой карточки
const handleCardClick = (name, src) => {
  popupWithImg.open(name, src);
}

// Отрисовка карточек на странице
defaultCardList.renderItems();

// Валидация карточек через класс
const popupProfileValidation = new FormValidator(settings, popupProfile);
const popupAddCardValidation = new FormValidator(settings, popupPlace);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();