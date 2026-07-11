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
    freeSeats: number;

    @checkAmountOfFuel
    isOpen(value: string) {
        return this.open ? "open" : `close ${value}`;
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
console.log(car.isOpen("checked"));

// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
