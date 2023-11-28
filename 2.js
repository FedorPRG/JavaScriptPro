"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/

const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];
let currentRecall;
let currentIndexRecall = 0;
const container = document.querySelector('.container');
for (let i = 0; i < initialData.length; i++) {
  let recall = ``;
  let prodact =
    `<div id="${i}" class="prodact">
  <h1>${initialData[i].product}</h1>`;
  for (let j = 0; j < initialData[i].reviews.length; j++) {
    currentIndexRecall += 1;
    recall +=
      `<p>Отзыв №${initialData[i].reviews[j].id}: ${initialData[i].reviews[j].text}</p>`;
  }
  prodact = prodact + '<div class="wrapper">' + recall +
    '<input type="text" class="currentRecall">' +
    '<div class="error-message"></div>' +
    '<button class="add-button">Добавить</button>' +
    '</div>' +
    '</div>';
  container.insertAdjacentHTML('beforeEnd', prodact);
}

const message = document.querySelector('.error-message');
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('add-button')) {
    currentRecall = event.target.previousSibling.previousSibling;
    addElement(currentRecall);
  }
});

function addElement(currentRecall) {
  if (currentRecall.value.split('').length >= 5 && currentRecall.value.split('').length <= 500) {
    currentIndexRecall += 1;
    currentRecall.previousSibling.insertAdjacentHTML('afterEnd',
      `<p>Отзыв №${currentIndexRecall}: ${currentRecall.value}</p>`);
    currentRecall.nextSibling.textContent = '';
    for (let i = 0; i < initialData.length; i++) {
      if (i === +currentRecall.closest('.prodact').id) {
        initialData[i].reviews.push({
          id: `${currentIndexRecall}`,
          text: `${currentRecall.value}`,
        });
      }
    }
    currentRecall.value = '';
  } else {
    currentRecall.nextSibling.textContent = 'Отзыв менее 50 или более 500 символов в длину';
  }
}