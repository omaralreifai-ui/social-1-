"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gender = exports.provider = void 0;
var provider;
(function (provider) {
    provider[provider["Google"] = 0] = "Google";
    provider[provider["Facebook"] = 2] = "Facebook";
    provider[provider["Local"] = 1] = "Local";
})(provider || (exports.provider = provider = {}));
var gender;
(function (gender) {
    gender[gender["Male"] = 0] = "Male";
    gender[gender["Female"] = 1] = "Female";
})(gender || (exports.gender = gender = {}));
