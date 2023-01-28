module.exports = {
    ROOT_DIR: __dirname,
    APP_NAME: process.env.APP_NAME || 'tasks',
    DATABASE_URL: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/tasks',
    PORT: process.env.PORT || 4000,
    //JWT config
    JWT_SECRET: process.env.JWT_SECRET || '$2a$10$.6vrQSA.tIpm.C1thlZ8fOKrnJ6RzHNdcdWNXPEeio0QZxrO241zW',
    JWT_ACCESS_EXPIRATION : process.env.JWT_ACCESS_EXPIRATION || '600s',
    JWT_REFRESH_EXPIRATION : process.env.JWT_REFRESH_EXPIRATION || '10d',

    //RabbitMq config
    CLOUDAMQP_URL: process.env.CLOUDAMQP_URL || 'amqp://localhost:5672',
    
    //Client config
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000/',
    PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:4000/public/',
    DEFAULT_LOGO: process.env.DEFAULT_LOGO || 'http://localhost:4000/public/images/logo.png',
}