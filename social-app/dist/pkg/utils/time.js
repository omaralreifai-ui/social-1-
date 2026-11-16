"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMs = toMs;
exports.toSeconds = toSeconds;
function toMs(value, unit) {
    switch (unit) {
        case 'seconds':
        case 'second':
            return value * 1000;
        case 'minutes':
        case 'minute':
            return value * 60 * 1000;
        case 'hours':
        case 'hour':
            return value * 60 * 60 * 1000;
        case 'days':
        case 'day':
            return value * 24 * 60 * 60 * 1000;
        default:
            return value;
    }
}
function toSeconds(value, unit) {
    return Math.floor(toMs(value, unit) / 1000);
}
