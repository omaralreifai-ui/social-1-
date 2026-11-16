"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = __importDefault(require("./user.repository"));
class userService {
    constructor() { }
    async getUserByEmail(email) {
        return user_repository_1.default.findByEmail(email);
    }
}
exports.userService = userService;
exports.default = new userService();
