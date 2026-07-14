// Синтаксис до пятой версии typeScript
import "reflect-metadata";
const limitMetadataKey = Symbol("limit");

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

    @checkNumberOfSeats(4)
    // freeSeats: number = 5; // Декоратор сработает даже на этапе конструирования объекта
    freeSeats: number;

    @checkAmountOfFuel
    isOpen(value: string) {
        return this.open ? "open" : `close ${value}`;
    }

    @validate
    startTravel(@limit passengers: number) {
        console.log(`Started with ${passengers} passengers`);
    }
}

// Когда мы работали с методами или со свойствами propertyKey это было само свойство или метод
// Когда мы применяем декоратор к параметру, propertyKey будет ссылаться на тот метод с которым мы работает
// Названия параметров могут быть абсолютно любыми
// parameterIndex показывает номер параметра по порядку
// Обычно использует комбинацию декоратора метода + декоратора параметра для валидации параметров которые приходят в методы
// Под валидацией имеется ввиду введение каких-то ограничений аргументу при передаче его функции
function limit(
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
) {
    // target - объект на котором работаем // propertyKey - свойство на котором работаем или же сам метод в котором есть этот параметр
    let limitedParametrs: number[] =
        Reflect.getOwnMetadata(limitMetadataKey, target, propertyKey) || []; // Эти метаданные о параметрах прикрепляем к самому методу с которым работаем
    limitedParametrs.push(parameterIndex); // Параметр под определенным номером нуждается в обработке. Параметр 0 допустим, или параметр 2
    Reflect.defineMetadata(
        limitMetadataKey,
        limitedParametrs,
        target,
        propertyKey,
    ); // 1) Как-то обзываем эти метаданные 2) передаем данные которые необходимо записать 3) Объект в котором мы работаем 4) Свойства к которым мы прикрепляем эти метаданные
    // После этого нужен декоратор метода потому что на самом методе уже есть метаданные которые уже можно использовать, чтобы валидировать те параметры которые у нас там будут
}

function validate(
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
) {
    let method = descriptor.value;

    descriptor.value = function (...args: any) {
        let limitedParametrs: number[] =
            Reflect.getOwnMetadata(limitMetadataKey, target, propertyKey); //Когда мы будем декорировать метод, мы получим вот этот вот массив с теми метаданными которые были записаны на этапе декорирования параметра

        if (limitedParametrs) {
            for (let index of limitedParametrs) {
                if (args[index] > 4) {
                    throw new Error("Нельзя больше 4-х пассажиров");
                }
            }
        }    
        return method?.apply(this, args);
    };
}

function checkNumberOfSeats(limit: number) {
    return function (target: Object, propertyKey: string | symbol) {
        // let value: number;
        let symbol = Symbol();

        const getter = function (this: any) {
            return this[symbol];
        };

        const setter = function (this: any, newAmount: number) {
            if (newAmount >= 1 && newAmount < limit) {
                this[symbol] = newAmount + 1;
                // value = `value: ${newAmount}`;
            } else {
                // console.log(`Больше ${limit} сидений быть не может`);
                Object.defineProperty(target, "errors", {
                    // Object.defineProperty работает с прототипом. То есть оно привязывает это свойство с прототипом класса и оно будет доступно во всех экземплярах этого класса.
                    value: `Больше ${limit} сидений быть не может`,
                });
            }
        };

        // target на котором мы применяем этот метод
        // propertyKey к свойству которому мы всё это применяем
        // Объект с теми значениями которые мы заменяем
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter,
            // get меняем на getter, set меняем на setter
        });

        // Взяли свойство к которому мы применили декоратор и изменили то, как оно себя ведёт при установке и получении значений
    };
}

function checkAmountOfFuel(
    target: Object, // Это объект к которому относится этот метод. К которому мы применим этот декоратор
    propertyKey: string | symbol, // Название этого метода который может быть либо строкой, либо символом.
    descriptor: PropertyDescriptor,
): PropertyDescriptor | void {
    // descriptor.enumerable = false; // Теперь этот метод нельзя использовать в for in
    const oldValue = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
        console.log(this.fuel);
        return oldValue.apply(this, args);
    };
}

function changeDoorStatus(status: boolean) {
    // Значение динамически меняется при помощи фабрики декораторов. Это функция которая принимает какие-то аргументы, после этого использует их внутри декоратора и возвращает этот декоратор который в свою очередь уже работает на классе.
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
car.startTravel(3);

// console.log(car.errors);

// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
