"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Композиция декораторов. Декораторы работают по такому же принципу, что и композиция функций f(x()). Чем ниже записан декоратор в цепочке, тем он глубже
@changeDoorStatus(true)
@changeAmountOfFuel(95)
class myCar {
    fuel = "50%";
    open = true;
    freeSeats;
    isOpen() {
        console.log(this.fuel);
        return this.open ? "open" : "close";
    }
}
// function changeDoorStatus(status: boolean) { // Значение динамически меняется при помощи фабрики декораторов. Это функция которая принимает какие-то аргументы, после этого использует их внутри декоратора и возвращает этот декоратор который в свою очередь уже работает на классе.
//     console.log("door init");
//     return <T extends { new (...args: any[]): {} }>(constructor: T) => {
//         console.log("door changed");
//         return class extends constructor {
//             open = status;
//         };
//     };
// }
// function changeAmountOfFuel(amount: number) {
//     console.log("fuel init");
//     return <T extends { new (...args: any[]): {} }>(constructor: T) => {
//         console.log("fuel changed");
//         return class extends constructor {
//             fuel = `${amount}%`;
//         };
//     };
// }
function changeDoorStatus(status) {
    console.log("door init");
    return (target, context) => {
        console.log("door changed");
        return class extends target {
            open = status;
        };
    };
}
function changeAmountOfFuel(amount) {
    console.log("fuel init");
    return (target, context) => {
        console.log("fuel changed");
        return class extends target {
            fuel = `${amount}%`;
        };
    };
}
// function closeCar<T extends { new (...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         open = false;
//     };
// }
const car = new myCar();
console.log(car.isOpen());
// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
//# sourceMappingURL=index.js.map