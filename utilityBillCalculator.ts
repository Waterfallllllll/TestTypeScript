const electricityUserData = {
    readings: 241,
    units: "kWt",
    mode: "double",
};

const gasUserData = {
    readings: 19,
    units: "m3",
};

const elRate: number = 3.560;
const gasRate: number = 13.3530;

const monthPayments: number[] = [0, 0]; // [electricity, gas]

const calculatePayments = (
    elData: { readings: number; units: string; mode: string },
    gasData: { readings: number; units: string },
    elRate: number,
    gasRate: number,
): void => {
    monthPayments[0] = elData.readings * elRate;

    monthPayments[1] = gasData.readings * gasRate * 1.08;
};

calculatePayments(electricityUserData, gasUserData, elRate, gasRate);

const sendInvoice = (
    monthPayments: number[],
    electricityUserData: { readings: number; units: string; mode: string },
    gasUserData: { readings: number; units: string },
): string => {
    const text = `    Hello!
    This month you used ${electricityUserData.readings} ${electricityUserData.units} of electricity
    It will cost: ${monthPayments[0]}lei
    
    This month you used ${gasUserData.readings} ${gasUserData.units} of gas
    It will cost: ${monthPayments[1]}lei`;

    return text;
};

const invoice = sendInvoice(monthPayments, electricityUserData, gasUserData);
console.log(invoice);
