/*2. Страница просмотра отзывов.
Показывает список всех продуктов, на которые были оставлены отзывы.
Рядом с каждым продуктом должна быть кнопка "показать отзывы" / "скрыть отзывы" 
(надпись кнопки меняется), при нажатии на которую показываются / скрываются 
отзывы продукта.
После текста отзыва должна быть кнопка "удалить", которая удаляет данный отзыв 
из localstorage и со страницы. 
Если удалены все отзывы продукта, то продукт вовсе должен быть удален, как из 
localstorage, так и со страницы.*/

//Удаление последнего отзыва
function removeItemLocalStorage(keyFromLocalStorage, event) {
    localStorage.removeItem(keyFromLocalStorage);
    for (let i = 0; i < productNameList.length; i++) {
        if (productNameList[i] === keyFromLocalStorage) {
            productNameList.splice(i, 1);
        }
    }
    //Если удалены все товары
    if (productNameList.length === 0) {
        console.log(productNameKey);
        localStorage.removeItem('productName');
    } else {
        localStorage.setItem(productNameKey, JSON.stringify(productNameList));
    }
    event.target.closest('.product').remove();
}

//Показать отзывы
function showReviews(event) {
    //Меняем флаг
    event.target.dataset.show = 'true';
    //Меняем текст кнопки
    event.target.textContent = 'скрыть отзывы';
    //Ищем родителя
    let productName;
    productName = event.target.closest(".product").dataset.key;
    //Получаем отзывы
    const reviewsList =
        JSON.parse(localStorage.getItem(productName));
    //Формируем блок с отзывами
    let reviewsDiv = ``;
    for (let i = 0; i < reviewsList.length; i++) {
        reviewsDiv = `${reviewsDiv}
        <div data-idreview="${reviewsList[i].id}" class="reviews">Отзыв: ${reviewsList[i].reviews}
            <button data-key="${productName}"
            data-idreview="${reviewsList[i].id} " class="delet">удалить</button>
        </div>`;
    }
    //Помещаем отзывы на страницу перед кнопкой
    event.target.insertAdjacentHTML('beforeBegin', reviewsDiv);
}

//Убрать отзывы
function hideReviews(event) {
    //Меняем флаг
    event.target.dataset.show = 'false';
    //Меняем текст кнопки
    event.target.textContent = 'показать отзывы';
    //Находим отзывы
    const divFromReviews = event.target.closest(".product").querySelectorAll('.reviews');
    //Убераем отзывы
    divFromReviews.forEach(e => e.remove());
}

const container = document.querySelector('.container');
const productNameKey = 'productName';
//Получаем список товаров
let productNameList = JSON.parse(localStorage.getItem(productNameKey));
//Формируем страницу
for (let i = 0; i < productNameList.length; i++) {
    let product =
        `<div class="product" data-key="${productNameList[i]}">
            <h1>Наименование продукта: ${productNameList[i]}</h1>
            <button data-show='false' class="showReviews">показать отзывы</button>
        </div>`;
    container.insertAdjacentHTML('beforeEnd', product);
}
//Показать / убрать отзывы
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('showReviews')) {
        event.target.dataset.show === 'false' ? showReviews(event) : hideReviews(event);
    }
});

//Удалить отзывы
container.addEventListener('click', (event) => {
    if (event.target.classList.contains('delet')) {
        const keyFromLocalStorage = event.target.dataset.key;
        const idReview = event.target.dataset.idreview;
        const reviewsList =
            JSON.parse(localStorage.getItem(keyFromLocalStorage));
        for (let i = 0; i < reviewsList.length; i++) {
            if (reviewsList[i].id === Number(idReview)) {
                reviewsList.splice(i, 1);
            }
        }
        if (reviewsList.length === 0) {
            //Если удаляемый отзыв был последним
            removeItemLocalStorage(keyFromLocalStorage, event);
        } else {
            //Если удаляемый отзыв был не последним
            localStorage.setItem(keyFromLocalStorage, JSON.stringify(reviewsList));
            //Находим отзывы на странице
            const divFromReviews = event.target.closest(".product").querySelectorAll('.reviews');
            //Удаляем выбранный отзыв
            divFromReviews.forEach((e) => {
                if (Number(e.dataset.idreview) === Number(idReview)) { e.remove(); }
            });
        }
    }
});
