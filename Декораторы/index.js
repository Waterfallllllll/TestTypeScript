"use strict";
// Синтаксис после пятой версии typeScript
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Композиция декораторов. Декораторы работают по такому же принципу, что и композиция функций f(x()). Чем ниже записан декоратор в цепочке, тем он глубже
let myCar = class myCar {
    constructor() {
        this.fuel = "50%";
        this.open = true;
        this._weight = 1000;
        this.freeSeats = 3;
    }
    set weight(num) {
        this._weight = this._weight + num;
    }
    // Мы можем применить декоратор к одной из сущностей get или set, так как результат будет такой же. К двум одновременно нельзя
    get weight() {
        return this._weight;
    }
    isOpen(value) {
        return this.open ? "open" : `close ${value}`;
    }
};
__decorate([
    logOnSet,
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], myCar.prototype, "weight", null);
__decorate([
    checkNumberOfSeats(4),
    __metadata("design:type", Number)
], myCar.prototype, "freeSeats", void 0);
__decorate([
    checkAmountOfFuel,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], myCar.prototype, "isOpen", null);
myCar = __decorate([
    changeDoorStatus(false),
    changeAmountOfFuel(95)
], myCar);
function logOnSet(target, // По своей сути это и есть аннотация метода set в классе
context) {
    return function (...args) {
        console.log(`Изменяем значение на ${[...args]}`);
        return target.apply(this, args); // target это метод к которому применяется декоратор
    };
}
function logOnGet(target, // По своей сути это и есть аннотация метода set в классе
context) {
    return function () {
        console.log(`Test`);
        return target.apply(this);
    };
}
function checkNumberOfSeats(limit) {
    return function (target, context) {
        return function (newAmount) {
            if (newAmount >= 1 && newAmount < limit) {
                return newAmount;
            }
            else {
                throw Error(`Больше ${limit} сидений быть не может, меньше 1 тоже`);
                // Валидация сработает только на этапе значений по умолчанию. Дальше уже не будет работать
            }
        };
    };
}
// function checkAmountOfFuel(
//     target: any, // Это метод к которому применяется декоратор
//     context: ClassMethodDecoratorContext, // Это объект который содержит определённые характеристики того, к чему мы применяем этот декоратор
// ) {
//     return function (this: any, ...args: any[]) {
//         console.log(this.fuel);
//         return target.apply(this, args);
//     };
// }
// В дженерике первый идентификатор отвечается за контекст
// Второй за аргументы
// Третий за возвращаемые значения
function checkAmountOfFuel(target, // Это метод к которому применяется декоратор
context) {
    return function (...args) {
        // console.log(this.fuel);
        console.log(`${String(context.name)} был запущен`);
        return target.apply(this, args);
    };
}
function changeDoorStatus(status) {
    // Значение динамически меняется при помощи фабрики декораторов. Это функция которая принимает какие-то аргументы, после этого использует их внутри декоратора и возвращает этот декоратор который в свою очередь уже работает на классе.
    console.log("door init");
    return (target, context) => {
        console.log("door changed");
        return class extends target {
            constructor() {
                super(...arguments);
                this.open = status;
            }
        };
    };
}
function changeAmountOfFuel(amount) {
    console.log("fuel init");
    return (target, context) => {
        console.log("fuel changed");
        return class extends target {
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
car.weight = 3;
console.log(car.weight);
// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
//# sourceMappingURL=index.js.map