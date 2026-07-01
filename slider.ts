interface ISlider {
	container?: string;
	numberOfSlides?: number;
	speed?: 300 | 500 | 700;
	direction?: "horizontal" | "vertical";
	dots?: boolean;
	arrows?: boolean;
	animationName?: string;
}

function createSlider({
	container = "",
	numberOfSlides = 1,
	speed = 300,
	direction = "horizontal",
	dots = true,
	arrows = true,
}: ISlider = {}): void {
	console.log(container, numberOfSlides, speed, direction, dots, arrows);
}

createSlider();

interface ICustomSliderOptions extends Omit<Required<ISlider>, "animationName" | "speed"> {
	speed: number;
}

// Все поля обязательны для заполнения
const customSliderOptions: ICustomSliderOptions = {
	container: "id",
	numberOfSlides: 4,
	speed: 1100,
	direction: "horizontal",
	dots: true,
	arrows: true,
};

function createCustomSlider(options: ICustomSliderOptions): void {
	if ("container" in options) {
		console.log(options);
	}
}
