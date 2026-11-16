"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withaCache = withaCache;
const init_1 = require("./init");
function withaCache(ttl = 3600) {
    return async (req, res, next) => {
        let key = `${req.method}:${req.originalUrl}`;
        const cache = await init_1.cacheprovider.get(key);
        if (cache) {
            res.setHeader('X-Cache', "HLT");
            return res.json(JSON.parse(cache));
        }
        const originaljson = res.json.bind(res);
        res.json = ((body) => {
            init_1.cacheprovider.set(key, JSON.stringify(body), ttl);
            res.setHeader('X-Cache', "MISS");
            return originaljson(body);
        });
        next();
    };
}
