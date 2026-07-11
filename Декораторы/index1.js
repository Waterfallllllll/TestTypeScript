"use strict";
// Синтаксис до пятой версии typeScript
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Композиция декораторов. Декораторы работают по такому же принципу, что и композиция функций f(x()). Чем ниже записан декоратор в цепочке, тем он глубже
let myCar = (() => {
    let _classDecorators = [changeDoorStatus(false), changeAmountOfFuel(95)];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _isOpen_decorators;
    var myCar = _classThis = class {
        constructor() {
            this.fuel = (__runInitializers(this, _instanceExtraInitializers), "50%");
            this.open = true;
        }
        isOpen(value) {
            return this.open ? "open" : `close ${value}`;
        }
    };
    __setFunctionName(_classThis, "myCar");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _isOpen_decorators = [checkAmountOfFuel];
        __esDecorate(_classThis, null, _isOpen_decorators, { kind: "method", name: "isOpen", static: false, private: false, access: { has: obj => "isOpen" in obj, get: obj => obj.isOpen }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        myCar = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return myCar = _classThis;
})();
function checkAmountOfFuel(target, // Это объект к которому относится этот метод. К которому мы применим этот декоратор
propertyKey, // Название этого метода который может быть либо строкой, либо символом. 
descriptor) {
    // descriptor.enumerable = false; // Теперь этот метод нельзя использовать в for in
    const oldValue = descriptor.value;
    descriptor.value = function (...args) {
        console.log(this.fuel);
        return oldValue.apply(this, args);
    };
}
function changeDoorStatus(status) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.open = status;
            }
        };
    };
}
function changeAmountOfFuel(amount) {
    return (constructor) => {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this.fuel = `${amount}%`;
            }
        };
    };
}
// function closeCar<T extends { new (...args: any[]): {} }>(constructor: T) {
//     return class extends constructor {
//         open = false;
//     };
// }
const car = new myCar();
console.log(car.isOpen("checked"));
// function addFuel(car: myCar) {
//     car.fuel = "100%";
//     console.log("add fuel");
//     return car;
// }
//# sourceMappingURL=index1.js.map