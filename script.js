let openPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');

let profileName = document.querySelector('#profile-name'); 
let profileJob = document.querySelector('#profile-job');

let myName = document.querySelector('.text__profile-title');
let myJob = document.querySelector('.text__profile-subtitle');
let closePopup = document.querySelector('.popup__button-close');

function toOpen () {
  popup.classList.add('popup_opened');
  profileName.setAttribute('value', myName.textContent);
  profileJob.setAttribute('value', myJob.textContent);
}

function toClose() {
  popup.classList.remove('popup_opened');
  nameInput.value = myName.textContent;
  jobInput.value = myJob.textContent;
}

openPopup.addEventListener('click', toOpen);
closePopup.addEventListener('click', toClose);

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('#profile-name'); 
let jobInput = document.querySelector('#profile-job');
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInputValue = nameInput.value;
    jobInputValue = jobInput.value;
    myName.textContent = nameInputValue;
    myJob.textContent = jobInputValue;
    popup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler); 