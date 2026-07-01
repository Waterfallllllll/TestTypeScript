interface IPhone {
    company: string;
    number: number;
}

interface IMobilePhone extends IPhone {
    size: string;
    companyPartner: IPhone["company"];
    manufactured: Date;
}

const phones: IMobilePhone[] = [
    {
        company: "Nokia",
        number: 1285637,
        size: "5.5",
        companyPartner: "MobileNokia",
        manufactured: new Date("2022-09-01"),
    },
    {
        company: "Samsung",
        number: 4356637,
        size: "5.0",
        companyPartner: "SamMobile",
        manufactured: new Date("2021-11-05"),
    },
    {
        company: "Apple",
        number: 4552833,
        size: "5.7",
        companyPartner: "no data",
        manufactured: new Date("2022-05-24T12:00:00"),
    },
];

interface IPhonesManufacturedAfterDate extends IMobilePhone {
    initialDate: string;
}

// function filterPhonesByDate(
//     phones: IMobilePhone[],
//     key: keyof IMobilePhone,
//     initial: IPhonesManufacturedAfterDate["initialDate"],
// ): IPhonesManufacturedAfterDate[] {
//     const initialDate = new Date(initial);

//     return phones.filter((item) => item[key] > initialDate).map(phone => {
// 		const newObj = {...phone, initialDate: initial};
// 		return newObj;
// 	});
// }

function filterPhonesByDate<T>(
    phones: T[],
    key: keyof T,
    initial: IPhonesManufacturedAfterDate["initialDate"],
): Partial<IPhonesManufacturedAfterDate>[] {
    const initialDate = new Date(initial);

    return phones.filter((item) => item[key] > initialDate).map(phone => {
		const newObj = {...phone, initialDate: initial};
		return newObj;
	});
}

console.log(filterPhonesByDate(phones, "manufactured", "2022-01-01"));
