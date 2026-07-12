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

    @checkNumberOfSeats(4)
    freeSeats: number = 3;

    @checkAmountOfFuel
    isOpen(value: string) {
        return this.open ? "open" : `close ${value}`;
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
car.freeSeats = -1;
console.log(car);
console.log(car.errors);

// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
