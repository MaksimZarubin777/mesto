
// Переменные для Popup "Редактировать профиль"
const openPopup = document.querySelector('.profile__button-edit');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('#profile-name'); 
const profileJob = document.querySelector('#profile-job');
const myName = document.querySelector('.profile__text-title');
const myJob = document.querySelector('.profile__text-subtitle');
const closePopup = document.querySelector('.popup__button-close');
const formElement = document.querySelector('#change-info');

// Переменные для Popup "Добавить карточку"
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card');
const popupPlace = document.querySelector('#popup-place');
const openPopupPlace = document.querySelector('.profile__button-add'); 
const closePopupPlace = document.querySelector('#popup-close');
const placeName = document.querySelector('#place-name'); 
const placeImg = document.querySelector('#place-img');
const formElementPlace = document.querySelector('#new-place');
const createBtn = document.querySelector('#create-btn');

// Переменные для Popup с картинкой места
const popupPlaceInfo = document.querySelector('#popup-place-info');
const closePopupPlaceInfo = document.querySelector('#popup-close-info');

// Редактирование профиля
// 
// Открыть Popup профиля
const toOpen = () => {
  popup.classList.add('popup_opened');
  profileName.value = myName.textContent; 
  profileJob.value = myJob.textContent;
}

// Закрыть Popup профиля
const toClose = () => {
  popup.classList.remove('popup_opened');
}

// Сохранить изменения профиля
const formSubmitHandler = (evt) => {
    evt.preventDefault(); 
    let nameInputValue = profileName.value;
    let jobInputValue = profileJob.value;
    myName.textContent = nameInputValue;
    myJob.textContent = jobInputValue;
    toClose();
}

// Блок с карточками
// 
// Список карточек
const initialCards = [
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

// Добавить новое место
// 
// Открыть Popup "Добавить карточку"
const toOpenPlace = () => {
  popupPlace.classList.add('popup_opened');
  placeName.value = '';
  placeImg.value = '';
}

// Закрыть Popup "Добавить карточку"
const toClosePlace = () => {
  popupPlace.classList.remove('popup_opened');
}

// Создать карточку
createCard = (item) => {
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__title').textContent = item.name;
  card.querySelector('.card__img').src = item.link;
  card.querySelector('.card__img').alt = item.name;
  const likeBtn = card.querySelector('.card__heart');
  const deleteBtn = card.querySelector('.card__trash');
  likeBtn.addEventListener('click', likeClick);
  deleteBtn.addEventListener('click', deleteClick);
  card.querySelector('.card__img').addEventListener('click', toOpenPlaceInfo);
  return card;
}

// Добавить новую карточку
const addNewCard = (evt) => {
  evt.preventDefault(); 
  const input = [
    {
      name: placeName.value,
      link: placeImg.value
    }
  ];
  initialCards.unshift(input[0]);
  item = initialCards[0];
  elements.prepend(createCard(item));
  toClosePlace();
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
const toOpenPlaceInfo = (e) => {
  popupPlaceInfo.classList.add('popup_opened');
  popupPlaceInfo.querySelector('.popup__place-title').textContent = e.target.closest('.card').querySelector('.card__title').textContent;
  popupPlaceInfo.querySelector('.popup__place-img').src = e.target.closest('.card').querySelector('.card__img').src;
  popupPlaceInfo.querySelector('.popup__place-img').alt = e.target.closest('.card').querySelector('.card__title').textContent;
}

// Закрыть Popup с картинкой
const toClosePlaceInfo = () => {
  popupPlaceInfo.classList.remove('popup_opened');
}

// Отображение карточек из InitialCards
initialCards.forEach(function(item) {
  createCard(item);
  elements.append(createCard(item));
})

openPopup.addEventListener('click', toOpen);
closePopup.addEventListener('click', toClose);
formElement.addEventListener('submit', formSubmitHandler); 
openPopupPlace.addEventListener('click', toOpenPlace);
closePopupPlace.addEventListener('click', toClosePlace);
formElementPlace.addEventListener('submit', addNewCard);
closePopupPlaceInfo.addEventListener('click', toClosePlaceInfo);
