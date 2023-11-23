"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/
const musicCollection = {
  alboms: [
    {
      title: "Времена года. Зима",
      artist: "Антонио Вивальди",
      year: "1725"
    }, {
      title: "Времена года. Весна",
      artist: "Антонио Вивальди",
      year: "1725"
    }, {
      title: "Времена года. Лето",
      artist: "Антонио Вивальди",
      year: "1725"
    }, {
      title: "Времена года. Осень",
      artist: "Антонио Вивальди",
      year: "1725"
    }
  ],
  // [Symbol.iterator]() {
  //   let index = 0;
  //   return {
  //     next: () => {
  //       if (index < this.alboms.length) {
  //         return {
  //           value: this.alboms[index++],
  //           done: false
  //         };
  //       }
  //       return {
  //         done: true
  //       };
  //     }
  //   };
  // }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.alboms.length; i++) {
      yield this.alboms[i];
    }
  }
};

for (const albom of musicCollection) {
  console.log(`${albom.title} - ${albom.artist} (${albom.year})`);
}
