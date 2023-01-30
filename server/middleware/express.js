const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../constants');
const RedisCaching = require('../config/RedisCaching');

const expressMiddelwares = (app, dir) => {
  app.use('/public', express.static(path.join(dir, 'public')));
  app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: [
      "content-type",
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      "responsetype"
    ],
    preflightContinue: true
  }));
  app.use(cookieParser())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'));


  const modulesPath = path.join(dir, 'modules');
  fs.readdir(modulesPath, (err, modulesList) => {
    if (err) {
      return console.log('Unable to scan modules directory: ' + err);
    }
    modulesList.forEach((mod) => {
      app.use(`/api/${mod}`, require(`../modules/${mod}`).routes)
    });
  });
  RedisCaching.connect()
}

module.exports = expressMiddelwares;