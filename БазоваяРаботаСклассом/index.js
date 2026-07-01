"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Box {
    width; // Сначало мы должны указать какие свойства будут в этом классе, чтобы с ними как-то работать
    height;
    constructor(width) {
        this.width = width;
        this.height = 500;
    }
}
const firstBox = new Box(250);
console.log(firstBox);
//# sourceMappingURL=index.js.map