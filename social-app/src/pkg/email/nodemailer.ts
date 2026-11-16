import { createTransport, Transporter } from 'nodemailer';
import { MailProvider } from './mail.interface';
import { env } from '../../lib/config/env';

interface InodemailerConfig {
    fromEmail: string;
    host: string;
    port: number;
    user: string;
    password: string;
}

export class NodemailerProvider implements MailProvider {
    private client: Transporter;
    private readonly fromEmail: string;

    constructor(config?: Partial<InodemailerConfig>) {
        this.fromEmail = config?.fromEmail || env.nodemailer.user;
        this.client = createTransport({
            host: config?.host || "smtp.gmail.com",
            port: config?.port || 587,
            secure: false,
            auth: {
                user: config?.user || env.nodemailer.user,
                pass: config?.password || env.nodemailer.pass,
            }
        });
    }

    async send(email: string, subject: string, html: string): Promise<void> {
        await this.client.sendMail({
            from: this.fromEmail,
            to: email,
            subject: subject,
            html: html
        });
    }

    async sendMail(email: string, subject: string, html: string): Promise<void> {
        return this.send(email, subject, html);
    }

    async sendemail(email: string, subject: string, html: string): Promise<void> {
        return this.send(email, subject, html);
    }
}

export const nodemailerprovider = new NodemailerProvider();
