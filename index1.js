/*1. Страница добавления отзыва о продукте.
Должна содержать форму с полем для ввода названия продукта и текстовое поле 
для текста отзыва.
Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в localstorage.
Необходимо реализовать проверку, оба поля должны быть заполнены, если это не 
так, необходимо выводить ошибку пользователю.*/

const wrapper = document.querySelector('.wrapper');

let form = `<input type="text" class="nameProduct" placeholder="Hазваниe продуктa">
<textarea type="text" class="reviews" placeholder="Oтзыв"></textarea>
<div class="error-message"></div>
<button class="add-button">Добавить отзыв</button>`;

wrapper.insertAdjacentHTML('afterBegin', form);

const button = document.querySelector('.add-button');
const nameProduct = document.querySelector('.nameProduct');
const reviews = document.querySelector('.reviews');
const errorMessage = document.querySelector('.error-message');
const productNameKey = 'productName';
let productNameList = [];
let currentIndexRecall = 0;

button.addEventListener('click', () => {
    if (nameProduct.value && reviews.value) {
        reviewsList = localStorageReviewsList(nameProduct.value);
        reviewsList.push({ id: currentIndexRecall, reviews: reviews.value });
        currentIndexRecall += 1;
        localStorage.setItem(`${nameProduct.value}`, JSON.stringify(reviewsList));
        productNameList.push(nameProduct.value);
        productNameList = Array.from(new Set(productNameList));//убрал повторяющиеся названия
        localStorage.setItem(productNameKey, JSON.stringify(productNameList));
        errorMessage.textContent = '';
    } else { errorMessage.textContent = 'Не все поля для ввода заполнены'; }
});
function localStorageReviewsList(localStorageKey) {
    if (localStorage.getItem(localStorageKey)) {
        return JSON.parse(localStorage.getItem(localStorageKey));
    } else { return []; }
}

// localStorage.clear();