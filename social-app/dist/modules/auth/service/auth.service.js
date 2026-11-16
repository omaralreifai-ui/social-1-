"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = __importDefault(require("../../user/user.repository"));
const auth_repository_1 = __importDefault(require("../repository/auth.repository"));
const util_1 = require("../util");
const error_1 = require("../../user/error");
const error_2 = require("../error");
const otp_1 = require("../../../lib/utils/otp");
const init_1 = require("../../../lib/cache/init");
const nodemailer_1 = require("../../../pkg/email/nodemailer");
const time_1 = require("../../../pkg/utils/time");
const google_auth_1 = require("../../../lib/utils/google-auth");
const error_3 = require("../../../lib/error/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../lib/config/env");
class AuthService {
    twoStepVerificationKey = '2-step-verificatin:';
    sendOtpKey = 'otp:';
    userRepository = user_repository_1.default;
    authRepository = auth_repository_1.default;
    mailProvider;
    constructor() {
        this.mailProvider = nodemailer_1.nodemailerprovider;
    }
    async register(registerData) {
        // 1. check user existence
        const userExist = await this.userRepository.findByEmail(registerData.email);
        // 2. if yes, throw an error.
        if (userExist)
            throw error_1.userAlreadyExist;
        // 3. prepare data [hash-password]
        registerData.password = await (0, util_1.hashPassword)(registerData.password);
        // 4. save user into DB -> isVerified: false
        const createdUser = await this.userRepository.create(registerData);
        // 5. generate and save otp into cache
        const code = (0, otp_1.generateOTPCode)();
        await init_1.cacheprovider.set(`${this.sendOtpKey}${createdUser._id.toString()}`, code, (0, time_1.toSeconds)(3, 'minutes'));
        // 6. send email verification OTP
        await this.mailProvider.send(registerData.email, 'verification code', `<h1>Your verification code is ${code} </h1>`);
        return createdUser;
    }
    async verifyAccount(email, code) {
        // 1. check user existence
        const user = await this.authRepository.checkUserExistByEmail(email);
        if (!user)
            throw error_1.userNotExist;
        if (user.isVerified === true)
            throw error_1.userAlreadyVerified;
        // 2. check otp validation
        const cacheCode = await init_1.cacheprovider.get(`${this.sendOtpKey}${user._id.toString()}`);
        if (!cacheCode)
            throw error_2.otpExpired;
        if (cacheCode !== code)
            throw error_2.invalidCode;
        // 3. Switch isVerified to true
        const updatedUser = await this.userRepository.updateUserByEmail(email, { isVerified: true });
        // 4. delete otp from cache
        await init_1.cacheprovider.del(`${this.sendOtpKey}${user._id.toString()}`);
        return updatedUser;
    }
    async enable2StepVerification(email) {
        const code = (0, otp_1.generateOTPCode)();
        await init_1.cacheprovider.set(`${this.twoStepVerificationKey}${email}`, code, (0, time_1.toSeconds)(3, 'minutes'));
        await this.mailProvider.send(email, '2 step verification code', `your 2 step verification code is ${code}`);
    }
    async verifyCodeActiveTwoStepVerification(email, code) {
        // 1. check user existence
        const user = await this.authRepository.checkUserExistByEmail(email);
        if (!user)
            throw error_1.userNotExist;
        // 2. check otp validation
        const cacheCode = await init_1.cacheprovider.get(`${this.twoStepVerificationKey}${email}`);
        if (!cacheCode)
            throw error_2.otpExpired;
        if (cacheCode !== code)
            throw error_2.invalidCode;
        // 3. update user
        await this.userRepository.updateUserByEmail(email, { twoStepVerification: true });
        // 4. delete otp from cache
        await init_1.cacheprovider.del(`${this.twoStepVerificationKey}${email}`);
    }
    async login(email, password) {
        // check cache attempts
        const cachedAttempt = await init_1.cacheprovider.get(`${email}:login`);
        if (cachedAttempt === '0')
            throw new error_3.AppError('you reach max tries', 429);
        // 1. check user existence
        const user = await this.authRepository.checkUserExistByEmail(email);
        if (!user)
            throw error_1.userNotExist;
        if (user.isVerified === false)
            throw error_1.userNotVerified;
        // 2. compare password
        const match = await (0, util_1.comparePassword)(password, user.password || '');
        if (!match)
            throw error_2.invalidPassword;
        if (user.twoStepVerification === true) {
            const code = (0, otp_1.generateOTPCode)();
            await init_1.cacheprovider.set(`${this.twoStepVerificationKey}${email}`, code, (0, time_1.toSeconds)(1, 'minutes'));
            await this.mailProvider.send(email, '2 step verification code', `<h3>your code is ${code}</h3>`);
            return;
        }
        // 3. generate access Token
        const accessToken = (0, util_1.generateAccessToken)({ id: user._id, name: user.userName });
        const refreshToken = (0, util_1.generateRefreshToken)({ id: user._id, name: user.userName });
        const ttlRemaining = await init_1.cacheprovider.ttl(`${email}:login`);
        const attempts = cachedAttempt ? parseInt(cachedAttempt, 10) : 5;
        const ttl = ttlRemaining === -2 ? (0, time_1.toSeconds)(3, 'minutes') : ttlRemaining;
        await init_1.cacheprovider.set(`${email}:login`, (attempts - 1).toString(), ttl);
        return {
            accessToken,
            refreshToken
        };
    }
    async verifyCodeTwoStepVerification(email, code) {
        const user = await this.authRepository.checkUserExistByEmail(email);
        if (!user)
            throw error_1.userNotExist;
        const cacheCode = await init_1.cacheprovider.get(`${this.twoStepVerificationKey}${email}`);
        if (!cacheCode)
            throw error_2.otpExpired;
        if (cacheCode !== code)
            throw error_2.invalidCode;
        const accessToken = (0, util_1.generateAccessToken)({ id: user._id, name: user.userName });
        const refreshToken = (0, util_1.generateRefreshToken)({ id: user._id, name: user.userName });
        await init_1.cacheprovider.del(`${this.twoStepVerificationKey}${email}`);
        return { accessToken, refreshToken };
    }
    async sendOtp(email) {
        const user = await this.authRepository.checkUserExistByEmail(email);
        if (!user)
            throw error_1.userNotExist;
        const code = (0, otp_1.generateOTPCode)();
        await init_1.cacheprovider.set(`${this.sendOtpKey}${user._id.toString()}`, code, (0, time_1.toSeconds)(3, 'minutes'));
        await this.mailProvider.send(email, 'new otp', `<p>your new otp is ${code}</p>`);
    }
    async resetPassword(email, code, newPassword) {
        const user = await this.authRepository.checkUserExistByEmail(email);
        if (!user)
            throw error_1.userNotExist;
        const otp = await init_1.cacheprovider.get(`${this.sendOtpKey}${user._id.toString()}`);
        if (!otp)
            throw error_2.otpExpired;
        if (otp !== code)
            throw error_2.invalidCode;
        const hashedPassword = await (0, util_1.hashPassword)(newPassword);
        await this.userRepository.updateUserByEmail(email, { password: hashedPassword });
        await init_1.cacheprovider.del(`${this.sendOtpKey}${user._id.toString()}`);
    }
    async loginWithGoogle(idToken) {
        const payload = await (0, google_auth_1.verifyGoogletoken)(idToken);
        if (!payload || !payload.email)
            throw new error_3.AppError('invalid google payload', 400);
        const user = await this.authRepository.checkUserExistByEmail(payload.email);
        if (user) {
            return (0, util_1.generateAccessToken)({
                id: user._id,
                email: user.email,
                name: user.userName
            });
        }
        const createdUser = await this.authRepository.createUser({
            userName: payload.name || payload.email.split('@')[0],
            email: payload.email,
            provider: 'google',
            isVerified: true,
        });
        return (0, util_1.generateAccessToken)({
            id: createdUser._id,
            email: createdUser.email,
            name: createdUser.userName
        });
    }
    async refreshToken(token) {
        const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwt.refreshSecret);
        const accessToken = (0, util_1.generateAccessToken)({ id: payload.id, name: payload.name });
        const refreshToken = (0, util_1.generateRefreshToken)({ id: payload.id, name: payload.name });
        return {
            accessToken,
            refreshToken
        };
    }
    async refreshTokenFn(token) {
        return this.refreshToken(token);
    }
}
exports.default = new AuthService();
