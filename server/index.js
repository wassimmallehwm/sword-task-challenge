const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const dbConnect = require('./database');
const {expressMiddelwares} = require('./middleware');
const ioConfig = require('./socket');


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

app.all("*",function(req, res, next){
    req.io = io;
    next();
});

expressMiddelwares(app, __dirname);
dbConnect();

ioConfig(io)
server.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});