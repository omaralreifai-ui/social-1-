"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCasheProvider = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisCasheProvider {
    client;
    constructor(config) {
        this.client = new ioredis_1.default({
            host: config.host,
            port: config.port,
            password: config.password,
            lazyConnect: true,
            maxLoadingRetryTime: 3,
        });
        this.client.on('error', (err) => {
            console.log('Redis error:', err.message);
        });
        this.client.connect().catch((err) => console.log('failed to connect to redis', err.message));
    }
    async set(key, value, ttl) {
        return this.client.set(key, value, 'EX', ttl);
    }
    async get(key) {
        return this.client.get(key);
    }
    async del(key) {
        return this.client.del(key);
    }
    async ttl(key) {
        return this.client.ttl(key);
    }
}
exports.RedisCasheProvider = RedisCasheProvider;
