"use strict";
const myCar = {
    fuel: "50%",
    open: true,
    freeSeats: 3,
    isOpen() {
        console.log(this.fuel);
        return this.open ? "open" : "close";
    }
};
//Декоратор это функция которая может модифицировать объект myCar
function closeCar(car) {
    car.open = false;
    console.log("close car");
    return car;
    // Мы задекорировали объект. Такая функция и называется декоратором.
}
function addFuel(car) {
    car.fuel = "100%";
    console.log("add fuel");
    return car;
}
// console.log(closeCar(myCar).isOpen()); // Вернёт close. Декоратор правильно отроботал, мы получили модифицированный объект, с которым можем дальше работать
// f(x(y())) композиция функций. Результат идёт от внутренней к внешней.
console.log(addFuel(closeCar(myCar)).isOpen());
