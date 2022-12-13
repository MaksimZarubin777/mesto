// проверяем валидность инпута и показываем ошибки при необходимости
const inputValidity = (input, settings) => {
  const errorMessage = document.querySelector(`#${input.id}-text-error`); // находим спан куда записать текст ошибки
  if (input.validity.valid) { //если инпут валиден, то удаляем ошибку и красную линию
    errorMessage.classList.remove(settings.errorClass);
    input.classList.remove(settings.inputErrorClass);
  } else { //если невалиден, то добавляем ошибку и красную линию
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(settings.errorClass);
    input.classList.add(settings.inputErrorClass);
  }
}

// функция меняет кнопку сабмит в зависимости от валидности импута
const toggleSubmitButton = (inputsList, buttonSubmit, settings) => {
  const isFormValid = inputsList.every(input => input.validity.valid); // вернет тру или фолс
      
      if (isFormValid) { //если форма валидна, то делаем кнопку активной и наоборот
        buttonSubmit.classList.remove(settings.inactiveButtonClass);
        buttonSubmit.disabled = '';
      } else {
        buttonSubmit.classList.add(settings.inactiveButtonClass);
        buttonSubmit.disabled = 'disabled';
      }
}
 
const enableValidation = (settings) => {
  const {formSelector, inputSelector, submitButtonSelector, ...restSettings} = settings; //сортируем массив 
  const formsList = [...document.querySelectorAll(formSelector)];
  // проходим по всем формам
  formsList.forEach(form => {
    const inputsList = [...form.querySelectorAll(inputSelector)];
    const buttonSubmit = form.querySelector(submitButtonSelector);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    
    //  проходим по всем инпутам в форме
    inputsList.forEach(input => {
      input.addEventListener('input', () => {
        inputValidity(input, restSettings); // проверяем валидность инпута
        toggleSubmitButton(inputsList, buttonSubmit, restSettings); // проверяем активна или неактивна должна быть кнопка
      });
    });
  });
}

enableValidation({
  formSelector: 'form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_blocked',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
