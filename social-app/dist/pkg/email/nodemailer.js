"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerprovider = exports.NodemailerProvider = void 0;
const nodemailer_1 = require("nodemailer");
const env_1 = require("../../lib/config/env");
class NodemailerProvider {
    client;
    fromEmail;
    constructor(config) {
        this.fromEmail = config?.fromEmail || env_1.env.nodemailer.user;
        this.client = (0, nodemailer_1.createTransport)({
            host: config?.host || "smtp.gmail.com",
            port: config?.port || 587,
            secure: false,
            auth: {
                user: config?.user || env_1.env.nodemailer.user,
                pass: config?.password || env_1.env.nodemailer.pass,
            }
        });
    }
    async send(email, subject, html) {
        await this.client.sendMail({
            from: this.fromEmail,
            to: email,
            subject: subject,
            html: html
        });
    }
    async sendMail(email, subject, html) {
        return this.send(email, subject, html);
    }
    async sendemail(email, subject, html) {
        return this.send(email, subject, html);
    }
}
exports.NodemailerProvider = NodemailerProvider;
exports.nodemailerprovider = new NodemailerProvider();
