const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/skgcode';

const User = require('./models/user');

mongoose.connect(url, async () => {
  console.log('Database connected: ', url);
  // get all collections, just as an exercise
  // const collections = await mongoose.connection.db.listCollections().toArray();
  // console.log(collections);
  await mongoose.connection.dropCollection('users');

  await User.create({ username: 'testUser', password: 'asdfasdf' });

  const users = await User.find();
  console.log('users:', users);
});
mongoose.connection.on('error', (err) => {
  console.error('connection error: ', err);
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
