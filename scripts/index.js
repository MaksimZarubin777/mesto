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

// Открыть попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
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
  clearPopupErrorMessage(popup);
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
  closePopupProfileWithBackground();
}

// закрыть попап профиля через эскейп
const closePopupProfileWithEsc = () => {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popupProfile);
    };
  });
}

// закрыть попап профиля через бекграунд
const closePopupProfileWithBackground = () => {
  document.addEventListener('click', function(evt){
    const classList = Array.from(evt.target.classList);
    const isPopupOpened = classList.includes('popup_opened');
    if (isPopupOpened) {
      closePopup(popupProfile);
    };
  });
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
}

// Закрыть Popup "Добавить карточку"
const closePopupPlace = () => {
  closePopup(popupPlace);
}

// Закрыть Popup "Добавить карточку" через эскейп
const closePopupPlaceWithEsc = () => {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popupPlace);
    };
  });
}

// Закрыть Popup "Добавить карточку" через бэкграунд
const closePopupPlaceWithBackground = () => {
  document.addEventListener('click', function(evt){
    const classList = Array.from(evt.target.classList);
    const isPopupOpened = classList.includes('popup_opened');
    if (isPopupOpened) {
      closePopup(popupPlace);
    }; 
  });
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

// Закрыть Popup с картинкой через эскейп
const closePopupPlaceInfoWithEsc = () => {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popupPlaceInfo);
    };
  });
}

// Закрыть Popup с картинкой через бэкграунд
const closePopupPlaceInfoWithBackground = () => {
  document.addEventListener('click', function(evt){
    const classList = Array.from(evt.target.classList);
    const isPopupOpened = classList.includes('popup_opened');
    if (isPopupOpened) {
      closePopup(popupPlaceInfo);
    };
  });
}

// Отображение карточек из InitialCards
initialCards.forEach(function(item) {
  cardsContainer.append(createCard(item));
})


popupProfileOpenButton.addEventListener('click', openPopupProfile);
popupProfileCloseButton.addEventListener('click', closePopupProfile);
document.addEventListener('keydown', closePopupProfileWithEsc);
closePopupProfileWithBackground();
formElementProfile.addEventListener('submit', formSubmitHandler); 
popupPlaceOpenButton.addEventListener('click', openPopupPlace);
popupPlaceCloseButton.addEventListener('click', closePopupPlace);
document.addEventListener('keydown', closePopupPlaceWithEsc);
closePopupPlaceWithBackground();
formElementPlace.addEventListener('submit', addNewCard);
popupPlaceInfoCloseButton.addEventListener('click', closePopupPlaceInfo);
document.addEventListener('keydown', closePopupPlaceInfoWithEsc);
closePopupPlaceInfoWithBackground();

