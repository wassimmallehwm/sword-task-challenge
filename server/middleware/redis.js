const redis = require("redis");
let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    redisClient.on('connection', (stream) => {
        console.log('Redis connected!');
    });
    await redisClient.connect();
})();

async function cacheData(req, res, next) {
    const key = req.originalUrl +
        JSON.stringify(req.params)
    const species = req.params.species;
    let results;
    try {
        const cacheResults = await redisClient.get(species);
        if (cacheResults) {
            results = JSON.parse(cacheResults);
            res.send({
                fromCache: true,
                data: results,
            });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(404);
    }
}

await redisClient.set(species, JSON.stringify(results), {
    EX: 180,
    NX: true,
});