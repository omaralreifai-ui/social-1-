import http from "node:http";
import mongoose from "mongoose";
import { createApp } from "./app";
import { env } from "./lib/config/env";

const app = createApp();
const server = http.createServer(app);

const PORT = env.port || 3000;

async function start() {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    try {
        await mongoose.connect(env.db.url);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

start();

async function shutdown() {
    await mongoose.disconnect();
    server.close();
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
