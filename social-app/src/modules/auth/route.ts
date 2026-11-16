import { Router } from "express";
import authController from "./controller/auth.controller";

export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/reset-password-request', authController.resetPasswordRequest);
authRouter.post('/reset-password-by-token', authController.verifyResetPasswordToken);

