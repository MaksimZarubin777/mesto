// Попап
let openPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('#profile-name'); 
let profileJob = document.querySelector('#profile-job');
let myName = document.querySelector('.profile__text-title');
let myJob = document.querySelector('.profile__text-subtitle');
let closePopup = document.querySelector('.popup__button-close');
let formElement = document.querySelector('#change-info');

// функция открыть попап
function toOpen () {
  popup.classList.add('popup_opened');
  profileName.value = myName.textContent; 
  profileJob.value = myJob.textContent;
}

// функция закрыть попап
function toClose() {
  popup.classList.remove('popup_opened');
}

// функция кнопки сохранить
function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInputValue = profileName.value;
    let jobInputValue = profileJob.value;
    myName.textContent = nameInputValue;
    myJob.textContent = jobInputValue;
    toClose();
}

openPopup.addEventListener('click', toOpen);
closePopup.addEventListener('click', toClose);
formElement.addEventListener('submit', formSubmitHandler); 

// список карточек
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


// Добавление карточек из массива и теплейт
for (i = 0; i < initialCards.length; i+=1) {
  const elements = document.querySelector('.elements');
  const cardTemplate = document.querySelector('#card');
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__title').textContent = initialCards[i].name;
  card.querySelector('.card__img').src = initialCards[i].link;
  elements.append(card)
}

