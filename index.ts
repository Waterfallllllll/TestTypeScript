const userData = {
    isBirthdayData: true,
    ageData: 40,
    userNameData: "John",
    messages: {
        error: "Error",
    },
};

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
