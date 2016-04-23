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

  var browserCookies = require('browser-cookies');
  var form = document.querySelector('.review-form');
  var rating = form.elements['review-mark'];
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
    // Проверка значения оценки и поведение поля с отзывом
    if (rating.value < 3) {
      text.required = true;
      if (text.value === '') {
        validForm = false;
        hintText.style.visibility = 'visible';
      } else {
        hintText.style.visibility = 'hidden';
      }
    } else {
      text.required = false;
      hintText.style.visibility = 'hidden';
    }
    // Поведение кнопки и общего блока с подказками
    if (validForm === true) {
      document.querySelector('.review-submit').disabled = false;
      hintField.style.visibility = 'hidden';
    } else {
      document.querySelector('.review-submit').disabled = true;
      hintField.style.visibility = 'visible';
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

  // Cookies
  name.value = browserCookies.get('name') || '';
  rating.value = browserCookies.get('rating') || 3;
  var today = new Date();
  var birthday = new Date(today.getFullYear(), 8, 30);
  if (today < birthday) {
    birthday.setFullYear(birthday.getFullYear() - 1);
  }
  form.onsubmit = function(evt) {
    evt.preventDefault();

    browserCookies.set('name', name.value, {
      expires: (today) - (birthday)
    });
    browserCookies.set('rating', rating.value, {
      expires: (today) - (birthday)
    });
    this.submit();
  };
})();

