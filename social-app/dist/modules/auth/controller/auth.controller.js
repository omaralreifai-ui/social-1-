"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../service/auth.service"));
const util_1 = require("../util");
const time_1 = require("../../../pkg/utils/time");
class AuthController {
    constructor() { }
    async register(req, res, next) {
        try {
            const data = req.body; // validateBody(registerDTO, req.body);
            console.log(data);
            const createdUser = await auth_service_1.default.register(data);
            res.status(201).json({
                message: 'User Created Successfully', success: true, data: createdUser,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async verifyAccount(req, res, next) {
        try {
            const data = req.body; // validateBody(verifyAccountDTO, req.body);
            const { email, code } = data;
            const updatedUser = await auth_service_1.default.verifyAccount(email, code);
            res.json({
                message: 'User Verified Successfully', success: true, data: updatedUser,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
            const data = req.body; // validateBody(loginDTO, req.body);
            const { email, password } = data;
            const tokens = await auth_service_1.default.login(email, password);
            if (!tokens)
                return res.json({ message: "otp sent", success: true });
            (0, util_1.setCookies)(res, tokens.accessToken, tokens.refreshToken);
            res.json({
                message: 'User Login Successfully', success: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async sendOtp(req, res, next) {
        try {
            const data = req.body; // validateBody(sendOTPDto, req.body);
            const { email } = data;
            await auth_service_1.default.sendOtp(email);
            res.json({ message: "new otp sent,check user email", success: true });
        }
        catch (err) {
            next(err);
        }
    }
    async resetPassword(req, res, next) {
        try {
            const data = req.body; // validateBody(resetPasswordDTO, req.body);
            const { email, code, newPassword } = data;
            await auth_service_1.default.resetPassword(email, code, newPassword);
            res.json({
                message: "password reset successfully",
                success: true,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async loginWithGoogle(req, res, next) {
        try {
            const token = await auth_service_1.default.loginWithGoogle(req.body.idToken);
            res.cookie('access_token', token, {
                httpOnly: true, maxAge: (0, time_1.toMs)(1, 'hours'),
            });
            res.json({ message: "user login successfully", success: true });
        }
        catch (error) {
            next(error);
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { accessToken, refreshToken } = await auth_service_1.default.refreshTokenFn(req.cookies.refresh_token);
            (0, util_1.setCookies)(res, accessToken, refreshToken);
            res.json({
                message: "refresh token successfully",
                success: true,
                data: { accessToken, refreshToken }
            });
        }
        catch (error) {
            next(error);
        }
    }
    async enable2StepVerification(req, res, next) {
        try {
            await auth_service_1.default.enable2StepVerification(req.body.email);
            res.json('OK');
        }
        catch (error) {
            next(error);
        }
    }
    async verifyCodeActiveTwoStepVerification(req, res, next) {
        try {
            await auth_service_1.default.verifyCodeActiveTwoStepVerification(req.body.email, req.body.code);
            res.json('OK');
        }
        catch (error) {
            next(error);
        }
    }
    async verifyCodeTwoStepVerification(req, res, next) {
        try {
            const { accessToken, refreshToken } = await auth_service_1.default.verifyCodeTwoStepVerification(req.body.email, req.body.code);
            (0, util_1.setCookies)(res, accessToken, refreshToken);
            res.json('ok');
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = new AuthController();
