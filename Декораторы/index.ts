interface ICar {
    fuel: string;
    open: boolean;
    freeSeats: number;
}

@closeCar
class myCar implements ICar {
    fuel: string = "50%";
    open: boolean = true;
    freeSeats: number;
    isOpen() {
        console.log(this.fuel);
        return this.open ? "open" : "close";
    }
}

function closeCar<T extends {new (...args: any[]): {}}>(constructor: T) {
    // constructor.prototype.open = false; // Мы используем prototype потому, что класс это по сути шаблон по которому будет настраиваться объект. Этих свойств и метода ещё по сути не сущетсвует. Они существуют только в прототипе. И только потом, когда мы создадим объект они появятся в объекте. Поэтому мы обращаемся к прототипу и изменяем его значение.

    return class extends constructor {
        open = false;
    }
}

const car = new myCar();
console.log(car.isOpen());

// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }


