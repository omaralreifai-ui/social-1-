"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const route_1 = require("./modules/auth/route");
const route_2 = require("./modules/user/route");
exports.router = (0, express_1.Router)();
exports.router.use('/auth', route_1.authRouter);
exports.router.use('/user', route_2.userRouter);
