const userData = {
    isBirthdayData: true,
    ageData: 40,
    userNameData: "John",
    messages: {
        error: "Error",
    }
};

const createError = (msg: string) => {
    throw new Error(msg);
}

function logBrtMsg({isBirthdayData, userNameData, ageData, messages: {error}}: {isBirthdayData: boolean, userNameData: string, ageData: number, messages: {error: string}}): string {
    if (isBirthdayData) {
        return `Congrats ${userNameData.toUpperCase()}, age: ${ageData + 1}`;
    } else {
        return createError(error);
    }
}

console.log(logBrtMsg(userData));

aaaa
