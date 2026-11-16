"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailjetprovider = void 0;
const env_1 = require("../../lib/config/env");
const mailjet_1 = require("./mailjet");
exports.mailjetprovider = new mailjet_1.MailjetProvider({
    apikey: env_1.env.mailjet.apiKey,
    apiSecret: env_1.env.mailjet.apisecret,
    fromEmail: env_1.env.mailjet.fromemail,
    fromName: env_1.env.mailjet.fromname,
});
