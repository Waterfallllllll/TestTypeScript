"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Синтаксис до пятой версии typeScript
require("reflect-metadata");
// Композиция декораторов. Декораторы работают по такому же принципу, что и композиция функций f(x()). Чем ниже записан декоратор в цепочке, тем он глубже
let myCar = class myCar {
    constructor() {
        this.fuel = "50%";
        this.open = true;
        this._weight = 1000;
    }
    isOpen(value) {
        return this.open ? "open" : `close ${value}`;
    }
    startTravel(passengers) {
        console.log(`Started with ${passengers} passengers`);
    }
};
__decorate([
    checkNumberOfSeats(4)
    // freeSeats: number = 5; // Декоратор сработает даже на этапе конструирования объекта
    ,
    __metadata("design:type", Number)
], myCar.prototype, "freeSeats", void 0);
__decorate([
    checkAmountOfFuel,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], myCar.prototype, "isOpen", null);
__decorate([
    __param(0, limit),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], myCar.prototype, "startTravel", null);
myCar = __decorate([
    changeDoorStatus(false),
    changeAmountOfFuel(95)
], myCar);
// Когда мы работали с методами или со свойствами propertyKey это было само свойство или метод
// Когда мы применяем декоратор к параметру, propertyKey будет ссылаться на тот метод с которым мы работает
// Названия параметров могут быть абсолютно любыми
// parameterIndex показывает номер параметра по порядку
// Обычно использует комбинацию декоратора метода + декоратора параметра для валидации параметров которые приходят в методы
// Под валидацией имеется ввиду введение каких-то ограничений аргументу при передаче его функции
function limit(target, propertyKey, parameterIndex) {
    console.log(Reflect.getOwnMetadata("design:type", target, propertyKey)); // target - объект на котором работаем // propertyKey - свойство на котором работаем или же сам метод в котором есть этот параметр
    console.log(Reflect.getOwnMetadata("design:paramtypes", target, propertyKey));
    console.log(Reflect.getOwnMetadata("design:returntype", target, propertyKey));
}
function checkNumberOfSeats(limit) {
    return function (target, propertyKey) {
        // let value: number;
        let symbol = Symbol();
        const getter = function () {
            return this[symbol];
        };
        const setter = function (newAmount) {
            if (newAmount >= 1 && newAmount < limit) {
                this[symbol] = newAmount + 1;
                // value = `value: ${newAmount}`;
            }
            else {
                // console.log(`Больше ${limit} сидений быть не может`);
                Object.defineProperty(target, "errors", {
                    value: `Больше ${limit} сидений быть не может`
                });
            }
        };
        // target на котором мы применяем этот метод
        // propertyKey к свойству которому мы всё это применяем
        // Объект с теми значениями которые мы заменяем
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
            // get меняем на getter, set меняем на setter
        });
        // Взяли свойство к которому мы применили декоратор и изменили то, как оно себя ведёт при установке и получении значений
    };
}
function checkAmountOfFuel(target, // Это объект к которому относится этот метод. К которому мы применим этот декоратор
propertyKey, // Название этого метода который может быть либо строкой, либо символом. 
descriptor) {
    // descriptor.enumerable = false; // Теперь этот метод нельзя использовать в for in
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
        console.log(this.fuel);
        return oldValue.apply(this, args);
    };
}
function changeDoorStatus(status) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.open = status;
            }
        };
    };
}
function changeAmountOfFuel(amount) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.fuel = `${amount}%`;
            }
        };
    };
}
// function closeCar<T extends { new (...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         open = false;
//     };
// }
const car = new myCar();
// console.log(car.errors);
// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
//# sourceMappingURL=index1.js.map