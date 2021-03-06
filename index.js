const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');

const servicesRouter = require('./routes/servicesRouter');
const authRouter = require('./routes/authRouter');
const hospitalsRouter = require('./routes/hospitalsRouter');
const doctorsRouter = require('./routes/doctorsRouter');

const { logError, handleError } = require('./middlewares/errorHandling');

const createMockData = require('./mock/createMockData');
const dropAllCollections = require('./dropAllCollections');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, async () => {
  console.log('Database connected: ', process.env.DB_URL);
  // get all collections, just as an exercise
  // const collections = await mongoose.connection.db.listCollections().toArray();
  // console.log(collections);

  if (process.env.CREATE_MOCK_DATA === 'true') {
    await dropAllCollections();
    await createMockData();
    console.log('Mock data created');
  }
});

mongoose.connection.on('error', (err) => {
  console.error('connection error: ', err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to HealthApp API!' });
});

app.use('/', authRouter);
app.use('/services', servicesRouter);
app.use('/hospitals', hospitalsRouter);
app.use('/doctors', doctorsRouter);

app.use('*', (req, res, next) => {
  const err = new Error('Resource not found');
  err.status = 404;
  next(err);
});

app.use(logError, handleError);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
