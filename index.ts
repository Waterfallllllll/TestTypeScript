const userData = {
    isBirthdayData: true,
    ageData: 40,
    userNameData: "John",
    messages: {
        error: "Error",
    },
};

const userDataTuple: [...boolean[], number, string] = [true, false, 40, "John"];
// userDataTuple[3];
// userDataTuple.push(50);
// userDataTuple[3];

const res = userDataTuple.map((t) => `${t} - data`);

const [bthd, age, userName] = userDataTuple;

const createError = (msg: string) => {
    throw new Error(msg);
};

function logBrtMsg({
    isBirthdayData,
    userNameData,
    ageData,
    messages: { error },
}: {
    isBirthdayData: boolean;
    userNameData: string;
    ageData: number;
    messages: { error: string };
}): string {
    if (isBirthdayData) {
        return `Congrats ${userNameData.toUpperCase()}, age: ${ageData + 1}`;
    } else {
        return createError(error);
    }
}

console.log(logBrtMsg(userData));

const departments: string[] = ["dev", "design", "marketing"];

const department = departments[0];

const report = departments
    .filter((d: string) => d !== "dev")
    .map((d: string) => {
        return 4;
    })
    .map((d: string) => `${d} - done`);

const nums: number[][] = [
    [3, 5, 6],
    [3, 5, 6],
];

type MyNamedTuple = [name: string, age: number, isAdmin: boolean];
const person: MyNamedTuple = ["John Doe", 30, false];

type MyTuple = [number, string, boolean];
const myTuple: MyTuple = [10, "Hello", true];

for (const element of myTuple) {
    console.log(element);
}

const mappedTuple: MyTuple = myTuple.map((element) => element * 2);
console.log(mappedTuple);

const filteredTuple: MyTuple = myTuple.filter(
    (element) => typeof element === "string",
);
console.log(filteredTuple);

const reducedValue: number = myTuple.reduce(
    (acc, curr) => acc + (typeof curr === "number" ? curr : 0),
    0,
);
console.log(reducedValue);

let arr: (string | number)[];
arr = ["Alex", 2000];
console.log(arr);

let tup: [string, number];
tup = ["Alex", 2414];