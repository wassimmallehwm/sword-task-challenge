const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const dbConnect = require('./database');
const { createMockUsers } = require('./database/seed');
const { expressMiddelwares } = require('./middleware');
const ioConfig = require('./socket');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

require('./modules/notifications/notification.consumer')(io)
expressMiddelwares(app, __dirname);
dbConnect();
ioConfig(io)

//For testing purposes : create fake users data
createMockUsers()

module.exports = {
    server,
    app
}