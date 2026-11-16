"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = __importDefault(require("./user.service"));
const error_1 = require("./error");
class UserController {
    constructor() { }
    async getUserByEmail(req, res, next) {
        try {
            const email = (req.body?.email || req.query?.email);
            if (!email) {
                return res.status(400).json({
                    message: "Email is required",
                    success: false
                });
            }
            const user = await user_service_1.default.getUserByEmail(email);
            if (!user) {
                throw error_1.userNotExist;
            }
            return res.status(200).json({
                message: "user retrieved successfully",
                success: true,
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
exports.default = new UserController();
