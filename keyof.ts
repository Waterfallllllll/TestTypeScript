interface ICompany {
    name: string;
    debts: number;
    departments: Department[];
    management: {
        owner: string;
    }
}

interface Department {
    [key: string]: string;
}

// const debts = "debts";
// let debts = "debts" as "debts"; 
let debts: "debts" = "debts"; 
type CompanyDebtsType = ICompany[typeof debts];

// type CompanyDebtsType = ICompany["debts"]; // Indexed Access Types
type CompanyOwnerType = ICompany["management"]["owner"];
type CompanyDepartmentsType = ICompany["departments"][number];
type CompanyDepartmentsTypes = ICompany["departments"];
type Test = ICompany[keyof ICompany];

type CompanyKeys = keyof ICompany;
const keys: CompanyKeys = "name"; // Оператор позволяет получать нам ключи указанного объекта и в итоге образует юнион тип между литераллами строк

function printDebts<T, K extends keyof T, S extends keyof T>(company: T, name: K, debts: S) {
    console.log(`Company ${company[name]}, debts: ${company[debts]}`)
}

const hh:ICompany = {
    name: "HH",
    debts: 50000
}

printDebts(hh, "name", "debts");
``
const google = {
    name: "Google",
    open: "true"
}

printDebts(google, "name", "open");


const googlee: ICompany = {
    name: "Google",
    debts: 500000,
    departments: {
        sales: "sales",
        developer: "dev"
    },
    management: {
        owner: "John",
    }
}

type GoogleKeys = keyof typeof googlee;
const keys2: GoogleKeys = "name";

