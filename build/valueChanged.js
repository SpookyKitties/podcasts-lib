"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueChanged = void 0;
function valueChanged(arg1, arg2) {
    if (arg1 !== undefined && arg2 === undefined) {
        return arg1;
    }
    if (arg2 !== undefined && arg1 === undefined) {
        return arg2;
    }
    return arg1 !== arg2 ? arg2 : arg1;
}
exports.valueChanged = valueChanged;
