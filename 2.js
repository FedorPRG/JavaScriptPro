"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.


Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/
const specCook = new Map([['Пицца', 'Олег'], ['Суши', 'Андрей'], ['Десерт', 'Анна']]);
const menu = new Map([['Пицца', new Set(['Маргарита', 'Пепперони', 'Три сыра'])], ['Суши', new Set(['Филадельфия', 'Калифорния', 'Чизмаки', 'Сеякемаки'])], ['Десерт', new Set(['Тирамису', 'Чизкейк'])]]);

// Посетитель ресторана.
class Client {
  constructor (firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  error = '';
  clientsAndOrders = new Map();//База данных клиентов и их заказов
  upDatedOrders = [];//

  newOrder(Client, ...Order) {
    //Проверяем, что заказ корректный
    if (!this.checkOrder(Order)) {
      console.log(this.error);
    } else {
      //Проверяем есть ли клиент в базе данных клиентов и их заказов
      if (!this.clientsAndOrders.has(Client)) {
        /*если клиента нет в базе данных, то добавляем его
        ключ - это объект Клиент
        значение - заказ клиента*/
        this.clientsAndOrders.set(Client, Order);
      } else {
        /*если клиент уже есть в базе данных клиентов и их заказов
        то проверяем есть ли в новом заказе совпадающие блюда с заказом из базы данных
        берем каждую позицию заказа (значение) клиента (ключ) из базы данных*/
        for (const itemInData of this.clientsAndOrders.get(Client)) {
          //и сравниваем с каждой позицией нового заказа 
          for (let i = 0; i < Order.length; i++) {
            //сравнение производится по имени блюда
            if (itemInData.name === Order[i].name) {
              /*если есть совпадения, то добавляем к количеству блюда
               из базы данных количество блюда из нового заказа*/
              itemInData.quantity = itemInData.quantity + Order[i].quantity;
              //удаляем совпадающие позиции из нового заказа
              Order.splice(i, 1);
            }
          }
        }
        /*Создаем новый массив заказов с позициями из базы данных 
        (с новым количеством совпавших блюд) и позициями из нового заказа,
        которые не совпали с позициями из базы данных клиентов и их заказов
        и не были удалены из списка нового заказа*/
        //Добавляем позиции из базы данных клиентов и их заказов
        this.upDatedOrders.push(...this.clientsAndOrders.get(Client));
        //Добавляем позиции из нового заказа
        this.upDatedOrders.push(...Order);
        //Перезаписываем в Мар по ключу клиента обновленный список заказов
        this.clientsAndOrders.set(Client, this.upDatedOrders);
      }
      let order = '\n';
      //Пробегаемся по списку заказов (значение) клиента (ключ)
      for (let i = 0; i < this.clientsAndOrders.get(Client).length; i++) {
        //формируем строку вывода. Повара (значение) получаем по типу блюда (ключ) из Мар поваров
        order = order + `${this.clientsAndOrders.get(Client)[i].type} "${this.clientsAndOrders.get(Client)[i].name}" - ${this.clientsAndOrders.get(Client)[i].quantity}; готовит повар ${specCook.get(`${this.clientsAndOrders.get(Client)[i].type}`)}\n`;
      }
      return console.log(`Клиент ${Client.firstname} заказал:
    ${order}-------------------------------------------`);
    }
  };

  checkOrder(Order) {
    //Пробегаемся по всем строчкам заказа
    for (const item of Order) {
      /*Берем названия блюд (значения) из menu по типу блюда (ключу) из заказа,
       преобразуем их в массив, и в этом массиве ищем название блюда из заказа,
       если такого блюда нет, то выбрасываем ошибку*/
      if (!Array.from(menu.get(item.type)).includes(item.name)) {
        this.error = `${item.type} "${item.name}" - такого блюда не существует`;
        return false;
      }
    } return true;
  }
}

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"),
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel,
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel,
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.