const createDbURL = () => {
    const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost' //'mongo'
    const DATABASE_PORT = process.env.DATABASE_PORT || '27017'
    const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'root'
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'root'
    const DATABASE_NAME = process.env.DATABASE_NAME || 'tasks'
    const url = `mongodb://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?authSource=admin`
    return url
}

module.exports = {
    ROOT_DIR: __dirname,
    APP_NAME: process.env.APP_NAME || 'tasks',
    PORT: process.env.PORT || 4000,

    //DATABASE config
    DATABASE_URL: createDbURL() || 'mongodb://root:root@mongo:27017/tasks',
    
    //JWT config
    JWT_SECRET: process.env.JWT_SECRET || '$2a$10$.6vrQSA.tIpm.C1thlZ8fOKrnJ6RzHNdcdWNXPEeio0QZxrO241zW',
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || '600s',
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || '10d',

    //RabbitMq config
    CLOUDAMQP_URL: process.env.CLOUDAMQP_URL || 'amqp://localhost:5672',

    //Redis config
    //cache duration : sec * min * hour
    REDIS_CACHE_DURATION: 60 * 60 * 1
}
