const redis = require("redis");
//const RedisPool = require("redis-pool");
const { REDIS_CACHE_DURATION, REDIS_URL } = require(".");
const { ErrorsHandler } = require("../utils");

class RedisCaching {
    redisClient;

    constructor() {
        //this.redisClient = new RedisPool(redis.createClient())
    }

    static instance = new RedisCaching();

    connect = async () => {
        this.redisClient = redis.createClient({
            url: REDIS_URL
        })
        this.redisClient.on("error", (error) => console.error(`Error : ${error}`));
        this.redisClient.on('connection', (stream) => {
            console.log('Redis connected!');
        });
        await this.redisClient.connect();
    }

    cacheData = async (req, data) => {
        try {
            await this.redisClient.set(this.formatKey(req), JSON.stringify(data), {
                EX: REDIS_CACHE_DURATION,
                NX: true,
            });
        } catch (error) {
            console.log("Cannot cache data : ", error)
        }
    }

    getCachedData = async (req, res, next) => {
        try {
            const key = this.formatKey(req)
            const cacheResults = await this.redisClient.get(key);
            if (cacheResults) {
                const results = JSON.parse(cacheResults);
                console.log("FROM REDIS")
                res.status(200).json(results);
            } else {
                next();
            }
        } catch (error) {
            const { status, message } = ErrorsHandler.handle(error, 'RedisCaching:getCachedData')
            res.status(status).json({ message })
        }
    }

    invalidateCache = async (req) => {
        const pattern = req.originalUrl.split('/')[2] + '*'
        let _cursor = 0;
        let _keys = [];
        try {
            do {
                const { cursor, keys } = await this.redisClient.scan(_cursor, "MATCH", pattern, "COUNT", 100)
                _cursor = parseInt(cursor, 10);
                _keys = _keys.concat(keys);
            } while (_cursor !== 0);

            if (_keys && _keys.length > 0) {
                await this.redisClient.del(_keys)
                console.log("Cache invalidated")
            }
        } catch (error) {
            console.log("Cannot invalidate redis cache : ", error)
        }

    }

    formatKey = (req) => {
        return req.originalUrl.split('/')[2] + ":" +
            this.stringify(req.user._id) +
            this.stringify(req.params) +
            this.stringify(req.body) +
            this.stringify(req.query)
    }

    stringify = (data) => {
        return data ? typeof data == 'string' ? data : JSON.stringify(data) : ''
    }

}

module.exports = RedisCaching.instance
