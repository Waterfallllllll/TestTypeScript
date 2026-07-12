// Синтаксис после пятой версии typeScript

interface ICar {
    fuel: string;
    open: boolean;
    freeSeats: number;
}

// Композиция декораторов. Декораторы работают по такому же принципу, что и композиция функций f(x()). Чем ниже записан декоратор в цепочке, тем он глубже
@changeDoorStatus(false)
@changeAmountOfFuel(95)
class myCar implements ICar {
    fuel: string = "50%";
    open: boolean = true;
    errors: any;
    _weight: number = 1000;
    @logOnSet
    set weight(num: number) {
        this._weight = this._weight + num;
    }
     // Мы можем применить декоратор к одной из сущностей get или set, так как результат будет такой же. К двум одновременно нельзя
    @logOnGet
    get weight() {
        return this._weight;
    }

    @checkNumberOfSeats(4)
    freeSeats: number = 3;

    @checkAmountOfFuel
    isOpen(value: string) {
        return this.open ? "open" : `close ${value}`;
    }
}

function logOnSet<T, R>(
    target: (this: T, value: number) => R, // По своей сути это и есть аннотация метода set в классе
    context: ClassSetterDecoratorContext<T, number>
){
    return function(this: T, ...args: any): R {
        console.log(`Изменяем значение на ${[...args]}`);
        return target.apply(this, args); // target это метод к которому применяется декоратор
    }
}

function logOnGet<T, R>(
    target: (this: T) => R, // По своей сути это и есть аннотация метода set в классе
    context: ClassGetterDecoratorContext<T, number>
) {
    return function(this: T): R {
        console.log(`Test`);
        return target.apply(this);
    }
}


function checkNumberOfSeats(limit: number) {
    return function (target: undefined, context: ClassFieldDecoratorContext) {
        return function (this: any, newAmount: number) {
            if (newAmount >= 1 && newAmount < limit) {
                return newAmount;
            } else {
                throw Error(`Больше ${limit} сидений быть не может, меньше 1 тоже`);
                // Валидация сработает только на этапе значений по умолчанию. Дальше уже не будет работать
            }
        }
    }
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
function checkAmountOfFuel<T, A extends any[], R>(
    target: (this: T, ...args: A) => R, // Это метод к которому применяется декоратор
    context: ClassMethodDecoratorContext<T, (this: T, ...args: A) => R>, // Это объект который содержит определённые характеристики того, к чему мы применяем этот декоратор
    // Типизация самого контекста. То есть интерфейса который является дженериком.
) {
    return function (this: T, ...args: A): R {
        // console.log(this.fuel);
        console.log(`${String(context.name)} был запущен`);
        return target.apply(this, args);
    };
}

function changeDoorStatus(status: boolean) {
    // Значение динамически меняется при помощи фабрики декораторов. Это функция которая принимает какие-то аргументы, после этого использует их внутри декоратора и возвращает этот декоратор который в свою очередь уже работает на классе.
    console.log("door init");
    return <T extends { new (...args: any[]): {} }>(
        target: T,
        context: ClassDecoratorContext<T>,
    ) => {
        console.log("door changed");
        return class extends target {
            open = status;
        };
    };
}

function changeAmountOfFuel(amount: number) {
    console.log("fuel init");
    return <T extends { new (...args: any[]): {} }>(
        target: T,
        context: ClassDecoratorContext<T>,
    ) => {
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
car.weight = 3;
console.log(car.weight);

// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
