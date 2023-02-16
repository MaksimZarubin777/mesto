import './index.css'
import Card from '../components/Card.js';
import {settings, cardListSelector} from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator  from '../components/FormValidator.js'
import { api } from '../components/Api';
import PopupWithConfirm from '../components/PopupWithConfirm';

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

// Переменные для Popup изменение аватара 
const popupAvatar = document.querySelector('#popup-update-avatar')
const avatar = document.querySelector('.profile__avatar')

let myUserId;

// Создание класса UserInfo
const profileInfo = new UserInfo({
  profileNameSelector: '.profile__text-title', 
  profileDescriptionSelector: '.profile__text-subtitle'});

// ПОПАП Аватар
//
// Сохранить изменения аватара
const handleAvatarUpdateSubmit = (evt, avatarInput) => {
  evt.preventDefault(); 
  popupUdpadeAvatar.setSubmitButtonText('Сохранить...');
  api.avatarUpdate(avatarInput.link) // отправляем новую ссылку на сервер
  .then((data) => { // если все ок - меняем аватар
    document.querySelector('.profile__avatar').src = data.avatar;
  })
  .catch ((err) => {
    console.log(err);
  })
  .finally (() => {
    popupUdpadeAvatar.setSubmitButtonText('Сохранить');
  });
  popupUdpadeAvatar.close();
}

// Создание класса для попапа "Обновить аватар" 
const popupUdpadeAvatar = new PopupWithForm('#popup-update-avatar', handleAvatarUpdateSubmit);
popupUdpadeAvatar.setEventListeners();

// Слушатель клика на кпопку редактирования аватара
avatar.addEventListener('click', () => {
  popupUdpadeAvatar.open();
})

// ПОПАП ПРОФИЛЬ 
// 
// Сохранить изменения профиля
const handleProfilFormSubmit = (evt, values) => {
  evt.preventDefault(); 
  handleProfilePopup.setSubmitButtonText('Сохранить...');
  api.updateProfileInfo(values) //отправяем новые данные на сервер
  .then((data) => { //если ок - меняем данные на странице
    document.querySelector('.profile__text-title').textContent = data.name;
    document.querySelector('.profile__text-subtitle').textContent = data.about;
  })
  .catch ((err) => {
    console.log(err);
  })
  .finally(() => {
    handleProfilePopup.setSubmitButtonText('Сохранить');
  })
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
const generateCard = (cardData) => {
  const card = new Card ( //в класс карточки передаем: 
    cardData, //данные карточки
    '#card', //селектор
    myUserId, // мой Id
    { 
    handleCardClick: (name, src) => {// функция клика по карточке
      popupWithImg.open(name, src);
    },
    handleCardDelete: () => { // функция удаления карточки
      handlePopupConfirmation.open(card);
    },
    handleLike: () => { //функция клака по лайку
      const isLiked = card.isLiked()
      const isCardLiked = isLiked ? api.handleDeleteLike(cardData._id) : api.handlePutLike(cardData._id);
      isCardLiked
      .then((initialCard)=>{
        card.manageCardLikes(initialCard)
      })
    },
  }) 
  const cardElement = card.generateCard();
  return cardElement;
}

// Добавить новую карточку
const addNewCard = (evt, values) => {
  evt.preventDefault(); 
  handlePlacePopup.setSubmitButtonText('Создать...');
  const newCard = {
        name: values['formInput'],
        link: values.link,
      };
  api.addNewCard(newCard)
  .then((newCard) => {
    const cardElement = generateCard(newCard);
    defaultCardList.addItem(cardElement);
    handlePlacePopup.close();
  })
  .catch ((err) => {
    console.log(err);
  })
  .finally(() => {
    handlePlacePopup.setSubmitButtonText('Создать');
  })
};

// Создание класса для попапа "Добавить карточку"
const handlePlacePopup = new PopupWithForm('#popup-place', addNewCard);
handlePlacePopup.setEventListeners();

// Слушатель клика на кнопку "Добавить карточку"
popupPlaceOpenButton.addEventListener('click', () => {
  popupAddCardValidation.resetValidation(); 
  handlePlacePopup.open();
});

// функция удаления карточки
const handleDeleteCard = (card) => {
  handlePopupConfirmation.setSubmitButtonText('Удаление...');
  api.deleteCard(card._cardData._id)
  .then(() => {
    card.deleteCard();
    handlePopupConfirmation.close();
  })
  .catch ((err) => {
    console.log(err);
  })
  .finally(() => {
    handlePopupConfirmation.setSubmitButtonText('Да');
  })
}

// ПОПАП УДАЛЕНИЯ КАРТОЧКИ
const handlePopupConfirmation = new PopupWithConfirm('#popup-confirmation', handleDeleteCard);
handlePopupConfirmation.setEventListeners();


// ПОПАП С КАРТИНКОЙ КАРТОЧКИ
// 
// Создание экземпляра класса PopupWithImage для попапа с картинкой
const popupWithImg = new PopupWithImage('#popup-place-info');
popupWithImg.setEventListeners();


// ОТРИСОВКА КАРТОЧЕК НА СТРАНИЦЕ
// 
// Создание класса SECTION
const defaultCardList = new Section({
  renderer: (cardData) => {
    const cardElement = generateCard(cardData);
    defaultCardList.addItem(cardElement);
  }
}, cardListSelector);


// Валидация  
const popupProfileValidation = new FormValidator(settings, popupProfile);
const popupAddCardValidation = new FormValidator(settings, popupPlace);
const popupUdpadeAvatarValidation = new FormValidator(settings, popupAvatar);
popupProfileValidation.enableValidation();
popupAddCardValidation.enableValidation();
popupUdpadeAvatarValidation.enableValidation();


//карточки отображаются на странице после получения id пользователя.
const getData = () => {
  api.getProfileInfo()
    .then(data => {
      document.querySelector('.profile__text-title').textContent = data.name;
      document.querySelector('.profile__text-subtitle').textContent = data.about;
      document.querySelector('.profile__avatar').src = data.avatar;
      myUserId = data._id
    })
    .then(() => {
      getCardData()
    })
    .catch ((err) => {
      console.log(err);
    })
}

//функция получения и отображения данных карточек
const getCardData = () => {
  api.getInitialCard()
  .then((result) => {
    defaultCardList.renderItems({
    data: result
    });
  })
  .catch ((err) => {
    console.log(err);
  })
}

getData()
