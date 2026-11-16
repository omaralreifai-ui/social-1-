"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../enum/enum");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.provider === enum_1.provider.Local || this.provider === 'local';
        },
        trim: true,
    },
    gender: {
        type: String,
        enum: Object.values(enum_1.gender),
    },
    provider: {
        type: String,
        default: 'local'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    twoStepVerification: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
