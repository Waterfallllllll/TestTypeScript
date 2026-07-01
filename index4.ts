type Animal = "cat" | "dog" | "bird";

enum AnimalStatus {
    Available = "available",
    NotAvailable = "not available",
}

interface AnimalData {
    animal: Animal;
    breed: string;
    sterilized?: string;
}

interface AnimalAvailableData extends AnimalData {
    location: string;
    age?: number;
}

interface AnimalNotAvailableData {
    message: string;
    nextUpdateIn: Date;
}

interface AnimalAvailableResponse {
    status: AnimalStatus.Available;
    data: AnimalAvailableData;
}

interface AnimalNotAvailableResponse {
	status: AnimalStatus.NotAvailable;
	data: AnimalNotAvailableData
}

type Res = AnimalAvailableResponse | AnimalNotAvailableResponse;

function isAvailable(res: Res): res is AnimalAvailableResponse {
	if (res.status === AnimalStatus.Available) {
		return true;
	} else {
		return false;
	}
}

function checkAnimalData(animal: Res): AnimalAvailableData | string {
    if (isAvailable(animal)) {
        // Заменить условие!
        return animal.data;
    } else {
        return `${animal.data.message}, you can try in ${animal.data.nextUpdateIn}`;
    }
}


