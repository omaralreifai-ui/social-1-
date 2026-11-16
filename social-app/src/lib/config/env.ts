import { config } from "dotenv";

config();

export const env = {
    port: Number(process.env.PORT) || 3000,
    db: {
        url: process.env.DB_URL || process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/social-app",
    },
    redis: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || "",
    },
    jwt: {
        secret: process.env.JWT_SECRET || "default_jwt_secret",
        accessSecret: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || "default_access_secret",
        refreshSecret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || "default_refresh_secret",
    },
    mailjet: {
        apiKey: process.env.MAILJET_API_KEY || process.env.MAILJET_API_KET || "",
        apisecret: process.env.MAILJET_API_SECRET || process.env.MAILJET_API_secrete || "",
        fromemail: process.env.FROM_EMAIL || process.env.fromemail || "",
        fromname: process.env.FROM_NAME || process.env.fromname || "",
    },
    nodemailer: {
        user: process.env.EMAIL || "",
        pass: process.env.PASSWORD || "",
    },
    google: {
        clientId: process.env.CLIENT_ID || "",
    }
};
