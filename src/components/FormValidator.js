export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  };

  _toggleSubmitButton  (inputsList, buttonSubmit) {
    const isFormValid = inputsList.every(input => input.validity.valid); // вернет тру или фолс
        if (isFormValid) { //если форма валидна, то делаем кнопку активной и наоборот
          buttonSubmit.classList.remove(this._inactiveButtonClass);
          buttonSubmit.disabled = '';
        } else {
          buttonSubmit.classList.add(this._inactiveButtonClass);
          buttonSubmit.disabled = 'disabled';
        }
  }

  _inputValidity (input) {
    const errorMessage = this._form.querySelector(`#${input.id}-text-error`);
    const buttonClose = this._form.querySelector('.popup__button-close');

    if (input.validity.valid) { //если инпут валиден, то удаляем ошибку и красную линию
      errorMessage.classList.remove(this._errorClass);
      input.classList.remove(this._inputErrorClass);
    } else { //если невалиден, то добавляем ошибку и красную линию
      errorMessage.textContent = input.validationMessage;
      errorMessage.classList.add(this._errorClass);
      input.classList.add(this._inputErrorClass);
    } 

    // очистка текста ошибки при закрытии 
    buttonClose.addEventListener('click', () => {
      input.classList.remove(this._inputErrorClass);
      errorMessage.classList.remove(this._errorClass);
    })
  };

  enableValidation () {
    const formsList = [...document.querySelectorAll(this._formSelector)];

    // проходим по всем формам
    formsList.forEach(form => {
      const inputsList = [...form.querySelectorAll(this._inputSelector)];
      const buttonSubmit = form.querySelector(this._submitButtonSelector);

      form.addEventListener('submit', (evt) => {
        evt.preventDefault()
      })

      //  проходим по всем инпутам в форме
      inputsList.forEach(input => {
        input.addEventListener('input', () => {
          this._inputValidity(input); // проверяем валидность инпута
          this._toggleSubmitButton(inputsList, buttonSubmit); // проверяем активна или неактивна должна быть кнопка
        });
      });
    });
  };
};
