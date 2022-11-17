let openPopup = document.querySelector('.profile__button-edit');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('#profile-name'); 
let profileJob = document.querySelector('#profile-job');
let myName = document.querySelector('.profile__text-title');
let myJob = document.querySelector('.profile__text-subtitle');
let closePopup = document.querySelector('.popup__button-close');
let formElement = document.querySelector('.popup__container');

function toOpen () {
  popup.classList.add('popup_opened');
  profileName.setAttribute('value', myName.textContent);
  profileJob.setAttribute('value', myJob.textContent);
}

function toClose() {
  popup.classList.remove('popup_opened');
  // Функция именно для закрытия попапа, которая не изменяет введенное значение в инпут.
  // если удалить две строчки ниже, то введя что-то в инпут, закрыв и открыв попап снова, 
  // то в инпуте будет предыдущий текст. Не нашел другого решения :)
  profileName.value = myName.textContent; 
  profileJob.value = myJob.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nameInputValue = profileName.value;
    let jobInputValue = profileJob.value;
    myName.textContent = nameInputValue;
    myJob.textContent = jobInputValue;
    // при сохранении используется просто удаление класса, т.к. у функции toClose немного другойфункционал
    popup.classList.remove('popup_opened'); 
}

openPopup.addEventListener('click', toOpen);
closePopup.addEventListener('click', toClose);
formElement.addEventListener('submit', formSubmitHandler); 