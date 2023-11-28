"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
    #books = [];
    constructor (books) {
        checkDublicat(books);
        this.#books = books;
    }
    get allBooks() {
        return this.#books;
    }

    addBook(title) {
        if (this.checkTitle(title) !== -1) {
            throw new Error(`Добавляемая книга ${title} есть в списке`);
        };
        this.#books.push(title);
    }

    removeBook(title) {
        if (this.checkTitle(title) === -1) {
            throw new Error(`Удаляемой книги ${title} нет в списке`);
        };
        this.#books.splice(this.checkTitle(title), 1);
    }

    hasBook(title) {
        if (this.checkTitle(title) !== -1) { return true; }
        else { return false; }
    }

    checkTitle(title) {
        return this.#books.indexOf(title);
    }
}


function checkDublicat(books) {
    if (books.length !== new Set(books).size)
        throw new Error("Переданный список книг содержит дубликаты");
}

// const bookDublicat = new Library(['Война и мир', 'Одиссея', 'Капитал', 'Капитал', 'Гамлет']);
const books = new Library(['Война и мир', 'Одиссея', 'Капитал', 'Гамлет']);

console.log(books.allBooks);
books.addBook('Король Лир');
console.log(books.allBooks);
// books.addBook('Гамлет');
books.removeBook('Гамлет');
// books.removeBook('Отелло');
console.log(books.allBooks);
console.log(books.hasBook('Одиссея'));
console.log(books.hasBook('Отелло'));
