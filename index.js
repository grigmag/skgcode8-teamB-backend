const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/skgcode';

app.use(express.json());

const createMockData = require('./createMockData');
const User = require('./models/user');

mongoose.connect(url, { useNewUrlParser: true }, async () => {
  console.log('Database connected: ', url);
  // get all collections, just as an exercise
  // const collections = await mongoose.connection.db.listCollections().toArray();
  // console.log(collections);

  createMockData();
});
mongoose.connection.on('error', (err) => {
  console.error('connection error: ', err);
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/users/:id', async (req, res) => {
  const userInfo = await User.findById(req.params.id);
  res.send(userInfo);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


