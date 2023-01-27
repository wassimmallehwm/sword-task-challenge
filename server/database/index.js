const mongoose = require('mongoose');
const { DATABASE_URL } = require('../config');

const dbConnect = () => {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const connection = mongoose.connection;
  connection.once('open', async () => {
    console.info('Connected to DataBase');
  })
}

module.exports = dbConnect;