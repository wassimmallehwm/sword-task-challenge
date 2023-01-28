const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const dbConnect = require('./database');
const {expressMiddelwares} = require('./middleware');
const ioConfig = require('./socket');



const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

require('./modules/notifications/notification.consumer')(io)


// app.get('/test', async (req, res) => {
//     MessageBroker.sendMessage(NOTIFICATION_QUEUE, {name: 'test'})
//     res.status(200).json({success: true})
// })

expressMiddelwares(app, __dirname);
dbConnect();

ioConfig(io)

module.exports = {
    server,
    app
}