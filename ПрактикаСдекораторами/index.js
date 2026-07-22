"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
let ShippingContainer = class ShippingContainer {
    // createdAt: string;
    // lastCalculation: string;
    constructor(width, length, height) {
        this.width = width;
        this.length = length;
        this.height = height;
        validate(this, "width", width);
        validate(this, "length", length);
        validate(this, "height", height);
    }
    // @fixLastCalculation("calcArea");
    calcArea(multiply) {
        return this.width * this.length * (multiply ? multiply : 1);
    }
    // @fixLastCalculation("calcVolume");
    calcVolume(multiply) {
        return (this.width * this.length * this.height * (multiply ? multiply : 1));
    }
};
__decorate([
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "width", void 0);
__decorate([
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "length", void 0);
__decorate([
    IsInt(),
    Min(1),
    Max(8),
    __metadata("design:type", Number)
], ShippingContainer.prototype, "height", void 0);
__decorate([
    updateLastCalculation,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Number)
], ShippingContainer.prototype, "calcArea", null);
__decorate([
    updateLastCalculation,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ShippingContainer.prototype, "calcVolume", null);
ShippingContainer = __decorate([
    createClassDate,
    __metadata("design:paramtypes", [Number, Number, Number])
], ShippingContainer);
function createClassDate(constructor) {
    constructor.prototype.createdAt = `Дата создания класса ${new Date().toLocaleDateString()}`;
}
// function createdAt<T extends { new (...args: any[]): {} }>(constructor: T) { Альтернатива верхней записи
// 	return class extends constructor {
// 		createdAt = new Date();
// 	};
// }
// IsInt(ShippingContainer.prototype, "width"/"length"/"height");
function IsInt() {
    return function (target, propertyKey) {
        Reflect.defineMetadata("IsInt", true, target, propertyKey);
    };
}
function Min(limit) {
    return function (target, propertyKey) {
        Reflect.defineMetadata("Min", limit, target, propertyKey);
    };
}
function Max(limit) {
    return function (target, propertyKey) {
        Reflect.defineMetadata("Max", limit, target, propertyKey);
    };
}
function validate(target, propertyKey, value) {
    if (Reflect.hasMetadata("IsInt", target, propertyKey) && (!Number.isInteger(value) || value !== parseInt(value))) {
        throw new Error(`свойство ${propertyKey} - не целое число`);
    }
    if (Reflect.hasMetadata("Min", target, propertyKey) && value < Reflect.getMetadata("Min", target, propertyKey)) {
        throw new Error(`мин значение для свойства ${propertyKey} должно быть: ${Reflect.getMetadata("Min", target, propertyKey)}`);
    }
    if (Reflect.hasMetadata("Max", target, propertyKey) && value > Reflect.getMetadata("Max", target, propertyKey)) {
        throw new Error(`макс значение для свойства ${propertyKey} должно быть: ${Reflect.getMetadata("Max", target, propertyKey)}`);
    }
}
function finalValidation(obj) {
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
        for (let key in obj) {
            validate(obj, key, obj[key]);
        }
    }
}
function updateLastCalculation(target, propertyKey, descriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
        this.lastCalculation = `Последний подсчет ${oldValue.name.replace("calc", "")} был ${new Date().toLocaleDateString()}`;
        return oldValue.apply(this, args);
    };
}
const container = new ShippingContainer(10, 100, 7);
console.log(container.createdAt);
console.log(container.calcArea());
console.log(container.lastCalculation);
console.log(container.calcVolume());
console.log(container.lastCalculation);
container.width = 0;
container.height = 5;
finalValidation(container);
//# sourceMappingURL=index.js.map