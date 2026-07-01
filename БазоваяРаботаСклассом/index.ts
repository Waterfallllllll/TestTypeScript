// class Box {
//     width: number; // Сначало мы должны указать какие свойства будут в этом классе, чтобы с ними как-то работать
//     height: number;
//     volume: string;

//     constructor(volume: string)
//     constructor(width: number)
//     constructor(widthOrVolume: number | string) {
//         if (typeof widthOrVolume === "number") {
//             this.width = widthOrVolume;
//         } else {
//             this.volume = widthOrVolume;
//         }

//         this.width = width;
//         this.height = 500;
//     }
// }

class Box {
    width: number; // Сначало мы должны указать какие свойства будут в этом классе, чтобы с ними как-то работать
    height: number;
    volume: number | undefined;
    _content: string | undefined; // Используем возможности javascript class fields

    constructor(width: number, volume?: number, content?: string) {
        this.width = width;
        this.volume = volume;
        this._content = content; 
        this.height = 500;
    }

    calculateVolume(): void {
        if (!this.volume) {
            this.volume = this.width * this.height;
            console.log(`Объем посылки: ${this.volume}`);
        } else {
            console.log(`Объем посылки: ${this.volume}`);
        }
    }

    checkBoxSize(transport: number): string;
    checkBoxSize(transport: number[]): string;
    checkBoxSize(transport: number | number[]): string {
        if (typeof transport === "number") {
            return transport >= this.width ? "Ok" : "Not ok";
        } else {
            return transport.some(item => item >= this.width) ? "Ok" : "Not ok";
        }
    }

    // get content() {
    //     return this._content;
    // }

    // set content(value) { // Берёт тип от геттера
    //     this._content = `Date: ${new Date().toTimeString()}, Content: ${value}`;
    // }

    //Если нужна асинхронная операция, то нужен уже обычный метод а не геттер и сеттер

    async content(value: string) {
        const date = await new Date().toTimeString();
        this._content = `Date: ${date}, Content: ${value}`;

        //И дальше уже можем возвращать и делать че хотим.
    }

    // Если убрать set, то свойство станет четко readonly
}

const firstBox = new Box(250);
// firstBox.volume = 50000; // Напрямую вторглись в свойство объекта и изменили его
console.log(firstBox.content = "Test");
console.log(firstBox.content);

// class User {
//     name: string;
// }

// const ilya = new User();
// ilya.name = "Ilya";
// console.log(ilya);