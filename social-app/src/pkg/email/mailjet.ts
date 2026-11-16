import Mailjet from 'node-mailjet';
import { MailProvider } from './mail.interface';

interface ImailjetConfig {
    apikey: string;
    apiSecret: string;
    fromEmail: string;
    fromName: string;
}

export class MailjetProvider implements MailProvider {
    private client: Mailjet;
    private readonly fromEmail: string;
    private readonly fromName: string;

    constructor(config: ImailjetConfig) {
        this.client = new Mailjet({
            apiKey: config.apikey,
            apiSecret: config.apiSecret,
        });
        this.fromEmail = config.fromEmail;
        this.fromName = config.fromName;
    }

    async send(email: string, subject: string, html: string): Promise<void> {
        await this.client.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: this.fromEmail,
                        Name: this.fromName,
                    },
                    To: [
                        {
                            Email: email,
                        },
                    ],
                    Subject: subject,
                    TextPart: subject,
                    HTMLPart: html,
                },
            ],
        });
    }

    async sendMail(email: string, subject: string, html: string): Promise<void> {
        return this.send(email, subject, html);
    }

    async sendemail(email: string, subject: string, html: string): Promise<void> {
        return this.send(email, subject, html);
    }
}

export const Maljetprovider = MailjetProvider;
