"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheprovider = void 0;
const env_1 = require("../config/env");
const redis_1 = require("../../pkg/cache/redis");
exports.cacheprovider = new redis_1.RedisCasheProvider({
    host: env_1.env.redis.host,
    port: env_1.env.redis.port,
    password: env_1.env.redis.password || '',
});
