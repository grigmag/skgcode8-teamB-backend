const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const createMockData = require('./createMockData');
const createHospitalData = require('./createHospitalData');
const servicesRouter = require('./routes/servicesRouter');
const authRouter = require('./routes/authRouter');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, async () => {
  console.log('Database connected: ', process.env.DB_URL);
  // get all collections, just as an exercise
  // const collections = await mongoose.connection.db.listCollections().toArray();
  // console.log(collections);

  createMockData();
  createHospitalData();
});

mongoose.connection.on('error', (err) => {
  console.error('connection error: ', err);
});

app.get('/', (req, res) => {
  res.send('Welcome to HealthApp API!');
});

app.use('/', authRouter);
app.use('/services', servicesRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
