'use strict';
var filter = document.querySelector('.reviews-filter');
filter.classList.add('invisible');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.getElementById('review-template');
// Клонирование содержимого шаблона
var elementToClone;
if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}
// Создание нового элемента
var getReviewElement = function(data, container) {
  var element = elementToClone.cloneNode(true);
  element.querySelector('.review-rating').textContent = data.rating;
  element.querySelector('.review-text').textContent = data.description;
  container.appendChild(element);
  var avatarLoadTimeout;
  var avatar = new Image();
  // Если фотография загрузилась
  avatar.onload = function() {
    clearTimeout(avatarLoadTimeout);
    element.querySelector('img').src = data.author.picture;
    element.querySelector('img').width = 124;
    element.querySelector('img').height = 124;
  };
  // Если фотография не загрузилась
  avatar.onerror = function() {
    element.classList.add('review-load-failure');
  };
  // Загрузка изображения
  avatar.src = data.author.picture;
  // Установка таймаута
  var IMAGE_TIMEOUT = 10000;
  avatarLoadTimeout = setTimeout(function() {
    avatar.src = '';
    element.classList.add('review-load-failure');
  }, IMAGE_TIMEOUT);
};
window.reviews.forEach(function(review) {
  getReviewElement(review, reviewsContainer);
});
filter.classList.remove('invisible');
