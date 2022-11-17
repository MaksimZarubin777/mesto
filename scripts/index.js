let openPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('#profile-name'); 
let profileJob = document.querySelector('#profile-job');
let myName = document.querySelector('.profile__text-title');
let myJob = document.querySelector('.profile__text-subtitle');
let closePopup = document.querySelector('.popup__button-close');
let formElement = document.querySelector('#change-info');

function toOpen () {
  popup.classList.add('popup_opened');
  profileName.value = myName.textContent; 
  profileJob.value = myJob.textContent;
}

function toClose() {
  popup.classList.remove('popup_opened');
}

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