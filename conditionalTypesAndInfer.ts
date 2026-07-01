type Example = "string" extends "Hello" ? string : number; // Создание простого условного типа

type FromUserOrFromBase<T extends string | number> = T extends string
    ? IDataFromUser
    : IDataFromBase;

// const test: FromUserOrFromBase<number> =

interface User<T extends "created" | Date> {
    created: T extends "created" ? "created" : Date;
}

const user: User<"created"> = {
    created: "created"
}

interface IDataFromUser {
    weight: string;
}

interface IDataFromBase {
    calories: number;
}

// function calculateDailyCalories(str: string): IDataFromUser
// function calculateDailyCalories(num: number): IDataFromBase
function calculateDailyCalories<T extends string | number>(
    numOrStr: T
): T extends string ? IDataFromUser : IDataFromBase{
    if (typeof numOrStr === "string") {
        const obj: IDataFromUser = {
            weight: numOrStr
        };
        return obj as FromUserOrFromBase<T>;
    } else {
        const obj: IDataFromBase = {
            calories: numOrStr
        };
        return obj as FromUserOrFromBase<T>;
    }
}

type GetStringType<T extends "hello" | "world" | string> = T extends "hello" ? "hello" : T extends "world" ? "world" : string;

type GetFirstType<T> = T extends Array<infer First> ? First : T;

type Ex = GetFirstType<number[]>

// Собес. Как реализовать тип который называется ToArray который будет дженериком и который принимает в себя любой тип и возвращает массив этого типа

type ToArray<Type> = Type extends any ? Type[] : never;

type ExArray = ToArray<Ex | string>; // Прием когда как аргумент сюда передается юнион тип называется распредилительные условные типы