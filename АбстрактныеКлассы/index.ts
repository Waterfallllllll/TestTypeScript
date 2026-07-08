interface IEngine {
    model: string;
    capacity: number;
    startEngine: (time: Date) => string;
}

abstract class AbstractVehicle {
    model: string;
    capacity: number;
    abstract startEngine: (time: Date) => string;
    stopEngine(time: Date): string {
        this.startEngine(new Date());
        return "Engine Stopped";
    }
}

// new AbstractVehicle();

class Vehicle extends AbstractVehicle {
    startEngine = (time: Date) => {
        return "Started";
    };
}

// new Vehicle().
