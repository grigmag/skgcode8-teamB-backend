const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');

const servicesRouter = require('./routes/servicesRouter');
const authRouter = require('./routes/authRouter');

const createMockData = require('./mock/createMockData');
const dropAllCollections = require('./dropAllCollections');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, async () => {
  console.log('Database connected: ', process.env.DB_URL);
  // get all collections, just as an exercise
  // const collections = await mongoose.connection.db.listCollections().toArray();
  // console.log(collections);

  if (process.env.DROP_DB === 'true') {
    await dropAllCollections();
  }

  if (process.env.CREATE_MOCK_DATA === 'true') {
    await createMockData();
  }
});

mongoose.connection.on('error', (err) => {
  console.error('connection error: ', err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to HealthApp API!');
});

app.use('/', authRouter);
app.use('/services', servicesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
