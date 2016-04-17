'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };


  var rating = document.getElementsByName('review-mark');
  var name = document.querySelector('#review-name');
  var text = document.querySelector('#review-text');
  var hintField = document.querySelector('.review-fields');
  var hintName = document.querySelector('.review-fields-name');
  var hintText = document.querySelector('.review-fields-text');
  // По умолчанию оценка - 3, поле с отзывом заполнять не надо
  hintText.style.visibility = 'hidden';
  // Проверка валидации формы
  function validateForm() {
    var validForm = true;
    // Проверка на заполнение поля с именем
    if (name.value === '') {
      validForm = false;
      hintName.style.visibility = 'visible';
    } else {
      hintName.style.visibility = 'hidden';
    }
    // Получение значения оценки
    for(var i = 0; i < rating.length; i++) {
      if (rating[i].checked) {
        var b = rating[i].value;
        break;
      }
    }
    // Проверка значения оценки и поведение поля с отзывом
    if (b < 3) {
      text.required = true;
      if (text.value === '') {
        validForm = false;
        hintText.style.visibility = 'visible';
      }
    } else {
      text.required = false;
    }
    // Поведение кнопки и общего блока с подказками
    if (validForm === false) {
      document.querySelector('.review-submit').disabled = true;
      hintField.style.visibility = 'visible';
    } else {
      document.querySelector('.review-submit').disabled = false;
      hintField.style.visibility = 'hidden';
      hintText.style.visibility = 'hidden';
    }
  }

  for(var i = 0; i < rating.length; i++) {
    rating[i].onchange = validateForm;
  }
  name.oninput = function() {
    validateForm();
  };
  text.oninput = function() {
    validateForm();
  };
})();

