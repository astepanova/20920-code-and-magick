'use strict';
var filter = document.querySelector('.reviews-filter');
filter.classList.add('invisible');
var reviewsContainer = document.querySelector('.reviews-list');
var templateElement = document.getElementById('review-template');
var reviews = [];
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';
var Filter = {
  'ALL': 'reviews-all',
  'RECENT': 'reviews-recent',
  'GOOD': 'reviews-good',
  'BAD': 'reviews-bad',
  'POPULAR': 'reviews-popular'
};
var DEFAULT_FILTER = Filter.ALL;
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
  container.appendChild(element);
};
// Получение данных
var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();
  var reviewsSection = document.querySelector('.reviews');
  reviewsSection.classList.add('reviews-list-loading');
  xhr.onload = function(evt) {
    reviewsSection.classList.remove('reviews-list-loading');
    filter.classList.remove('invisible');
    var loadedData = JSON.parse(evt.target.response);
    callback(loadedData);
  };
  xhr.onerror = function() {
    reviewsSection.classList.remove('reviews-list-loading');
    reviewsSection.classList.add('reviews-load-failure');
  };
  xhr.timeout = 10000;
  xhr.ontimeout = function() {
    reviewsSection.classList.remove('reviews-list-loading');
    reviewsSection.classList.add('reviews-load-failure');
  };
  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};
// Создание локальной переменной
var renderReviews = function(reviews) {
  reviewsContainer.innerHTML = '';
  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

// Фильтрация
var getFilteredReviews = function(reviews, filter) {
  var reviewsToFilter = reviews.slice(0);

  switch (filter) {
    case Filter.RECENT:
      reviewsToFilter.sort(function(a, b) {
        var date1 = +new Date(a.date);
        var date2 = +new Date(b.date);
        return date2 - date1;
      });
      break;
    case Filter.GOOD:
      reviewsToFilter.filter(function(review) {
        return review.rating >= 3;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case Filter.BAD:
      reviewsToFilter.filter(function(review) {
        return review.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case Filter.POPULAR:
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return reviewsToFilter;
};

var setFilterEnabled = function(filter) {
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews);
};


// Подключение фильтров
var setFiltrationEnabled = function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  var filters = reviewsFilter.elements['reviews'];
  for (var i = 0; i < filters.length; i++) {
    filters[i].onclick = function() {
      setFilterEnabled(this.id);
    };
  }
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltrationEnabled();
  setFilterEnabled(DEFAULT_FILTER);
});

