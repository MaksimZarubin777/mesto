export default class FormValidator {
  constructor(settings, formElement) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
    this._inputsList = [...this._form.querySelectorAll(this._inputSelector)];
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
    this._buttonClose = this._form.querySelector('.popup__button-close');
  };

  _toggleSubmitButton  () {
    const isFormValid = this._inputsList.every(input => input.validity.valid); // вернет тру или фолс
        if (isFormValid) { //если форма валидна, то делаем кнопку активной и наоборот
          this._buttonSubmit.classList.remove(this._inactiveButtonClass);
          this._buttonSubmit.disabled = '';
        } else {
          this._buttonSubmit.classList.add(this._inactiveButtonClass);
          this._buttonSubmit.disabled = 'disabled';
        }
  }

  _inputValidity (input) {
    this._errorMessage = this._form.querySelector(`#${input.id}-text-error`);
    if (input.validity.valid) { //если инпут валиден, то удаляем ошибку и красную линию
      this._hideInputError(input);
    } else { //если невалиден, то добавляем ошибку и красную линию
      this._errorMessage.textContent = input.validationMessage;
      this._errorMessage.classList.add(this._errorClass);
      input.classList.add(this._inputErrorClass);
    } 
  };

// Очистка сообщений об ошибке
  _hideInputError (input) {
    this._errorMessage = this._form.querySelector(`#${input.id}-text-error`);
    input.classList.remove(this._inputErrorClass);
    this._errorMessage.classList.remove(this._errorClass);
  }

  enableValidation () {
    this._inputsList.forEach(input => {
      input.addEventListener('input', () => {
        this._inputValidity(input); // проверяем валидность инпута
        this._toggleSubmitButton(); // проверяем активна или неактивна должна быть кнопка
      });
    });
  };

  resetValidation() {
    this._inputsList.forEach((input) => {
      this._hideInputError(input)
    })
    this._toggleSubmitButton()
  } 
};
