const redis = require("redis");
const { REDIS_CACHE_DURATION } = require(".");
const { ErrorsHandler } = require("../utils");

class RedisCaching {

    instance;
    redisClient;

    constructor() {
    }

    static createInstance() {
        return new RedisCaching()
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = this.createInstance()
        }
        return this.instance
    }

    connect = async () => {
        this.redisClient = redis.createClient();

        this.redisClient.on("error", (error) => console.error(`Error : ${error}`));
        this.redisClient.on('connection', (stream) => {
            console.log('Redis connected!');
        });
        await this.redisClient.connect();
    }

    cacheData = async (req, data) => {
        await this.redisClient.set(this.formatKey(req), JSON.stringify(data), {
            EX: REDIS_CACHE_DURATION,
            NX: true,
        });
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

    formatKey = (req) => {
        return req.originalUrl +
            this.stringify(req.user._id) +
            this.stringify(req.params) +
            this.stringify(req.body) +
            this.stringify(req.query)
    }

    stringify = (data) => {
        return data ? typeof data == 'string' ? data : JSON.stringify(data) : ''
    }

}

module.exports = RedisCaching.getInstance()
