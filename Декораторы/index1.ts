// Синтаксис до пятой версии typeScript

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


    set weight(num: number) {
        this._weight = this._weight + num;
    }
    @log // Мы можем применить декоратор к одной из сущностей get или set, так как результат будет такой же. К двум одновременно нельзя
    get weight() {
        return this._weight;
    }

    @checkNumberOfSeats(4)
    // freeSeats: number = 5; // Декоратор сработает даже на этапе конструирования объекта
    freeSeats: number;

    @checkAmountOfFuel
    isOpen(value: string) {
        return this.open ? "open" : `close ${value}`;
    }
}

function log(
    target: Object, // Это объект к которому относится этот метод. К которому мы применим этот декоратор
    propertyKey: string | symbol, // Название этого метода который может быть либо строкой, либо символом. 
    descriptor: PropertyDescriptor
) : PropertyDescriptor | void {
    // descriptor.enumerable = false; // Теперь этот метод нельзя использовать в for in
    const oldValue = descriptor.set;
    const oldGet = descriptor.get;
    descriptor.set = function(this: any, ...args: any) {
        console.log(`Изменяем значение на ${[...args]}`);
        return oldValue?.apply(this, args);
    }
    descriptor.get = function() {
        console.log(`Test`);
        return oldGet?.apply(this);
    }
}

function checkNumberOfSeats(limit: number) {
    return function (target: Object, propertyKey: string | symbol) {
        // let value: number;
        let symbol = Symbol();

        const getter = function (this: any) {
            return this[symbol];
        }

        const setter = function (this: any, newAmount: number) {
            if (newAmount >= 1 && newAmount < limit) {
                this[symbol] = newAmount + 1;
                // value = `value: ${newAmount}`;
            } else {
                // console.log(`Больше ${limit} сидений быть не может`);
                Object.defineProperty(target, "errors", { // Object.defineProperty работает с прототипом. То есть оно привязывает это свойство с прототипом класса и оно будет доступно во всех экземплярах этого класса.
                    value: `Больше ${limit} сидений быть не может`
                })
            }
        }

        // target на котором мы применяем этот метод
        // propertyKey к свойству которому мы всё это применяем
        // Объект с теми значениями которые мы заменяем
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
            // get меняем на getter, set меняем на setter
        });

        // Взяли свойство к которому мы применили декоратор и изменили то, как оно себя ведёт при установке и получении значений
    }
}

function checkAmountOfFuel(
    target: Object, // Это объект к которому относится этот метод. К которому мы применим этот декоратор
    propertyKey: string | symbol, // Название этого метода который может быть либо строкой, либо символом. 
    descriptor: PropertyDescriptor
) : PropertyDescriptor | void {
    // descriptor.enumerable = false; // Теперь этот метод нельзя использовать в for in
    const oldValue = descriptor.value;
    descriptor.value = function(this: any, ...args: any[]) {
        console.log(this.fuel);
        return oldValue.apply(this, args);
    }
}

function changeDoorStatus(status: boolean) { // Значение динамически меняется при помощи фабрики декораторов. Это функция которая принимает какие-то аргументы, после этого использует их внутри декоратора и возвращает этот декоратор который в свою очередь уже работает на классе.
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            open = status;
        };
    };
}

function changeAmountOfFuel(amount: number) {
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
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
// console.log(car.errors);

// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
