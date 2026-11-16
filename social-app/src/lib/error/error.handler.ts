import { NextFunction, Request, Response } from "express";
import { AppError } from "./error.js";

export function globalerror(err: any, req: Request, res: Response, next: NextFunction) {
    console.error("🔥 Error caught in globalerror:", err);

    if (err.isOperational) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false
        });
    }

    // Mongoose Validation Error (e.g. minlength, required)
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: err.message,
            success: false
        });
    }

    return res.status(500).json({
        error: err.message || 'something went wrong',
        success: false
    });
}
