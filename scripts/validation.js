class FormValidator {
  constructor(settings, formElement) {
    this.formSelector = settings.formSelector;
    this.inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;
    this.form = formElement;
  }

  _toggleSubmitButton  (inputsList, buttonSubmit) {
    const isFormValid = inputsList.every(input => input.validity.valid); // вернет тру или фолс
        if (isFormValid) { //если форма валидна, то делаем кнопку активной и наоборот
          buttonSubmit.classList.remove(this.inactiveButtonClass);
          buttonSubmit.disabled = '';
        } else {
          buttonSubmit.classList.add(this.inactiveButtonClass);
          buttonSubmit.disabled = 'disabled';
        }
  }

  _inputValidity (input) {
    const errorMessage = this.form.querySelector(`#${input.id}-text-error`);
    if (input.validity.valid) { //если инпут валиден, то удаляем ошибку и красную линию
      errorMessage.classList.remove(this.errorClass);
      input.classList.remove(this.inputErrorClass);
    } else { //если невалиден, то добавляем ошибку и красную линию
      errorMessage.textContent = input.validationMessage;
      errorMessage.classList.add(this.errorClass);
      input.classList.add(this.inputErrorClass);
    }
  }

  enableValidation () {
    const formsList = [...document.querySelectorAll(this.formSelector)];
    // проходим по всем формам
    formsList.forEach(form => {
      const inputsList = [...form.querySelectorAll(this.inputSelector)];
      const buttonSubmit = form.querySelector(this.submitButtonSelector);

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
}