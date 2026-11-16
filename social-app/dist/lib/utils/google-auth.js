"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGoogletoken = verifyGoogletoken;
const google_auth_library_1 = require("google-auth-library");
const error_1 = require("../error/error");
const env_1 = require("../config/env");
const client = new google_auth_library_1.OAuth2Client({ clientId: env_1.env.google.clientId });
async function verifyGoogletoken(idToken) {
    try {
        const ticket = await client.verifyIdToken({ idToken: idToken,
            audience: env_1.env.google.clientId,
        });
        return ticket.getPayload();
    }
    catch (err) {
        throw new error_1.AppError('invalid google token', 403);
    }
}
