"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuard = authGuard;
const error_js_1 = require("../error/error.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function authGuard(req, res, next) {
    try {
        // logic of check token
        const token = req.cookies.access_token; // "access_toke=ekshfjfbgihbzsdg;hamada=hambozo;ka3bora=rabe3;"
        if (!token)
            throw new error_js_1.AppError('no token provided', 403);
        req.user = jsonwebtoken_1.default.verify(token, env_1.env.jwt.secret);
        // req.user = payload;
        next();
    }
    catch (error) {
        next(error);
    }
}
