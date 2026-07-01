interface Car {
	name: "car";
	engine: string;
	wheels: number;
}

interface Ship {
	name: "ship";
	engine: string;
	sail: string;
}

interface Airplane {
	name: "airplane";
	engine: string;
	wings: string;
}

interface SuperAirplane {
	name: "smth";
	engine: string;
	wings: string;
}

type Vehicle = Car | Ship | Airplane | SuperAirplane;

// function isCar(car: Vehicle): car is Car {
// 	return "wheels" in car;
// }

// function isShip(ship: Vehicle): ship is Ship {
// 	return "sail" in ship;
// }

// function repairVehicle(vehicle: Vehicle) {
// 	if (isCar(vehicle)) {
// 		vehicle.wheels;
// 	} else if (isShip(vehicle)) {
// 		vehicle.sail;
// 	} else {
//         vehicle.wings
//     }
// }

function repairVehicle(vehicle: Vehicle) {
	switch (vehicle.name) {
		case "car":
			console.log(vehicle.engine);
			break;
		case "ship":
			console.log(vehicle.sail);
			break;
		case "airplane":
			console.log(vehicle.wings);
			break;
		default:
			const smth: never = vehicle;
			console.log("Ouuups!");
	}
}
