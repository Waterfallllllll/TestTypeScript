interface Currencies {
    usa: "usd";
    china: "cny";
    ukraine: "uah";
    kz: "tenge";
}

type CurrWithoutUSA = Omit<Currencies, "usa">; //utility type - Omit
type CurrUSAAndUkraine = Pick<Currencies, "usa" | "ukraine">; // фильтрация по свойству
type CountriesWithoutUSA = Exclude<keyof Currencies, "usa">;

type FadeType = Exclude<MyAnimation, "swipe">; // Удаление из union type
type SwipeType = Extract<MyAnimation | Direction, "swipe">; // выбор подходящего типа

type CreateCustomCurr<T> = {
    [P in keyof T as `custom${Capitalize<string & P>}`]: string;
};

type PlayersNames = "alex" | "john";
type CustomCurrencies = CreateCustomCurr<Currencies>;
type GameDataCurr = Record<PlayersNames, CustomCurrencies>;

const gameData: GameDataCurr = {
    alex: {
        customChina: "qqqqqq",
        customKz: "ww",
        customUkraine: "dddd",
        customUsa: "sdd "
    },
    john: {
        customChina: "qqqqqq",
        customKz: "ww",
        customUkraine: "dddd",
        customUsa: "sdd "
    }
}

type MyAnimation = "fade" | "swipe";
type Direction = "in" | "out";

type MyNewAnimation = `${MyAnimation}${Capitalize<Direction>}`; //template literal types