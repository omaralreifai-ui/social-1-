"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 200
    },
    UserId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    reactionsCount: {
        type: Number
    }
});
exports.post = (0, mongoose_1.model)("Post", schema);
