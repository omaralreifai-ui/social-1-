"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const env_1 = require("./lib/config/env");
const app = (0, app_1.createApp)();
const server = node_http_1.default.createServer(app);
const PORT = env_1.env.port || 3000;
async function start() {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    try {
        await mongoose_1.default.connect(env_1.env.db.url);
        console.log("Connected to MongoDB successfully");
    }
    catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}
start();
async function shutdown() {
    await mongoose_1.default.disconnect();
    server.close();
    process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
