// Находим все формы
const forms = document.querySelectorAll('form')
// Объявляем массив для инпутов
const inputs = [...document.querySelectorAll('.popup__input')]
// Кнопка сабмит
const submitButton = document.querySelector('.popup__button-submit')


// Функция проверки все ли инпуты формы валидны
function isSubmitButtonIsValid (input) {
  const formInputs = input.closest('form').querySelectorAll('input')
  const result = []
  formInputs.forEach(function(element){
    result.push(element.validity.valid)
  })
  if (result.includes(false)) {
    submitButton.classList.add('popup__button-submit_blocked')
    submitButton.setAttribute('disabled', true)
  } else {
    submitButton.classList.remove('popup__button-submit_blocked')
    submitButton.removeAttribute('disabled')
  }
}

// проходим по каждому инпуту в масиве
inputs.forEach(function (input) {
  // добавлем на каждый инпут отслеживатель ввода 
  input.addEventListener('input', function() {
    console.log(input)
    // если инпут невалиден, то выделяем его красной линией и блокируем сабмит
    switch (input.validity.valid) {
      case false:
        input.classList.add('popup__input_type_error');
        isSubmitButtonIsValid(input)
        break;
      case true:
        input.classList.remove('popup__input_type_error');
        isSubmitButtonIsValid(input)
        break;
    }
    // если инпут пустой, то показываем сообщение об ошибке
    switch (input.validity.valueMissing) {
      case false:
        // находим спан с id соответствующим id инпута и добавляем ему класс и текст или убираем
        document.querySelector(`#${input.id}-text-error`).classList.remove('popup__input-error_active');
        break;
      case true:
        document.querySelector(`#${input.id}-text-error`).classList.add('popup__input-error_active');
        document.querySelector(`#${input.id}-text-error`).textContent = input.validationMessage;
        break;
    }
    // если инпут короткий, то показываем сообщение об ошибке
    switch (input.validity.tooShort) {
      case true:
        document.querySelector(`#${input.id}-text-error`).classList.add('popup__input-error_active');
        document.querySelector(`#${input.id}-text-error`).textContent = input.validationMessage;
        break;
    }
  })
})

