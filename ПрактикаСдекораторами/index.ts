interface ICuboid {
	width: number;
	length: number;
	height: number;
	calcArea: (multiply?: number) => number;
	calcVolume: (multiply?: number) => number;
}

@createClassDate
class ShippingContainer implements ICuboid {
	// @IsInt()
	// @Min(1)
	width: number;

	// @IsInt()
	// @Min(1)
	length: number;

	// @IsInt()
	// @Min(1)
	// @Max(8)
	height: number;

	createdAt: Date;

	constructor(width: number, length: number, height: number) {
		this.width = width;
		this.length = length;
		this.height = height;
	}

	calcArea(multiply?: number): number {
		return this.width * this.length * (multiply ? multiply : 1);
	}

	calcVolume(multiply?: number) {
		return this.width * this.length * this.height * (multiply ? multiply : 1);
	}

	classDate() {
		return this.createdAt;
	}
}

function createClassDate(constructor: Function) {
	constructor.prototype.createdAt = new Date().toLocaleDateString();
}

function isInt(digit: number) {
	return function (target: Object, propertyKey: string | symbol) {
		let value: number;

		const getter = function(this: any) {
			return this[symbol];
		}

		const setter = function (this: any, newAmount: number) {
			if (Number.isInteger(newAmount)) {
				this[symbol] = newAmount;
			}
		}
	}
}
// 1. Необходимо создать декоратор класса, который будет записывать дату создания контейнера
// Простыми словами - создавать в нем новое свойство createdAt с датой создания экземпляра

// 2. Необходимо создать декораторы IsInt, Min и Max, которые будут валидировать свойства класса
// Применение смотрите в самом классе. При ошибке выполняйте throw new Error
// IsInt проверяет на то, что было передано целое число

// 3. Необходимо создать декоратор метода, который при каждом запуске метода будет создавать
// ИЛИ менять содержимое свойства самого класса lastCalculation
// Как значение записывать в него строку "Последний подсчет ${method} был ${Дата}",
// Где method - это название подсчета, который передается при вызове декоратора (площадь или объем)

const container = new ShippingContainer(10, 100, 10);
container.width = 0;
container.height = 5;
console.log(container.calcVolume());

console.log(container.classDate());
