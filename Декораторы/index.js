"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
let myCar = class myCar {
    fuel = "50%";
    open = true;
    freeSeats;
    isOpen() {
        console.log(this.fuel);
        return this.open ? "open" : "close";
    }
};
myCar = __decorate([
    closeCar
], myCar);
function closeCar(constructor) {
    // constructor.prototype.open = false; // Мы используем prototype потому, что класс это по сути шаблон по которому будет настраиваться объект. Этих свойств и метода ещё по сути не сущетсвует. Они существуют только в прототипе. И только потом, когда мы создадим объект они появятся в объекте. Поэтому мы обращаемся к прототипу и изменяем его значение.
    return class extends constructor {
        open = false;
    };
}
const car = new myCar();
console.log(car.isOpen());
// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
//# sourceMappingURL=index.js.map