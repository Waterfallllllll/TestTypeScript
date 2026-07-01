// Создать Generic-интерфейс PlayerData, который подходил бы для создания таких объектов:

interface PlayerData<T, U> {
    game: T;
    hours: U;
    server: string;
}

const player1: PlayerData<string, number> = {
    game: "CS:GO",
    hours: 300,
    server: "basic",
};

const player2: PlayerData<number, string> = {
    game: 2048,
    hours: "300 h.",
    server: "arcade",
};

const player3: PlayerData<string, object> = {
    game: "Chess",
    hours: {
        total: 500,
        inMenu: 50,
    },
    server: "chess",
};

// Массив данных с фигурами содержит объекты, у каждого из которых обязательно есть свойство name
// Каждый объект может еще содержать дополнительные свойства в случайном виде
// Свойство name может иметь только 4 варианта
// Функция calculateAmountOfFigures должна принимать массив с объектами, у которых обязательно должно быть свойство name
// Возвращает она объект-экземпляр AmountOfFigures
// Внутри себя подсчитывает сколько каких фигур было в массиве и записывает результаты в AmountOfFigures
// С текущими данными должно в консоль попадет:
// { squares: 3, circles: 2, triangles: 2, others: 1 }

enum Name {
    Rect = "rect",
    Triangle = "triangle",
    Line = "line",
    Circle = "circle",
}

interface NameOfUser {
	name: Name;
}

interface AmountOfFigures {
    squares: number;
    circles: number;
    triangles: number;
    others: number;
}

function calculateAmountOfFigures<T extends NameOfUser>(figure: T[]): AmountOfFigures {
	const amount: AmountOfFigures = {
		squares: 0,
		circles: 0,
		triangles: 0,
		others: 0,
	}

	figure.forEach((fig) => {
		switch (fig.name) {
			case Name.Rect:
				amount.squares++;
				break;
			case Name.Circle:
				amount.circles++;
				break;
			case Name.Triangle:
				amount.triangles++;
				break;
			default:
				amount.others++;
		}
	});

	return amount;
}

interface CustomFigure extends NameOfUser {
	data?: {};
}

const data: CustomFigure[] = [
    {
        name: Name.Rect,
        data: { a: 5, b: 10 },
    },
    {
        name: Name.Rect,
        data: { a: 6, b: 11 },
    },
    {
        name: Name.Triangle,
        data: { a: 5, b: 10, c: 14 },
    },
    {
        name: Name.Line,
        data: { l: 15 },
    },
    {
        name: Name.Circle,
        data: { r: 10 },
    },
    {
        name: Name.Circle,
        data: { r: 5 },
    },
    {
        name: Name.Rect,
        data: { a: 15, b: 7 },
    },
    {
        name: Name.Triangle,
    },
];

console.log(calculateAmountOfFigures(data));
