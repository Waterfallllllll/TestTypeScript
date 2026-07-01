const arr: Array<number> = [1,2,3];
const arr1: number[] = [1,2,3]; // Тоже самое

const roarr: ReadonlyArray<string> = ["sadasf"];
// roarr[0] = "werewr";

interface IState {
    data: {
        name: string;
    };
    tag?: string;
}

const state: Partial<IState> = { // Делает все поля необязательными
    data: {
        name: "John"
    }
}

const strictState: Required<IState> = { // ПРотивоположность partial и делает все поля обязательными
    data: {
        name: "afsdf"
    },
    tag: "asdgfsdg"
}

function action(state: Readonly<IState>) { // Работает только для верхнего уровня
    state.data.name = "abc";
}

