"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNewable = isNewable;
function isNewable(arg) {
    return typeof arg === 'function' && !!arg.prototype && !!arg.prototype.constructor.name;
}
