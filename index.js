const express = require('express');
const app = express();

require('dotenv').config();
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const createMockData = require('./createMockData');
const User = require('./models/user');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true }, async () => {
  console.log('Database connected: ', process.env.DB_URL);
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

// app.get('/users/:id/', async (req, res) => {
//   const userInfo = await User.findById(req.params.id);
//   res.send(userInfo);
// });

app.post('/register', async (req, res) => {
  const { healthIdNumber, password } = req.body;

  const user = await User.find({ healthIdNumber, password });
  if (user) {
    const user = await new User({
      healthIdNumber: req.body.healthIdNumber,
      email: req.body.email,
      password: req.body.password,
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      } else {
        res.status(200).send({
          message: 'User Registered successfully',
        });
      }
    });
  } else {
    return res.status(500).send({ message: 'User already exists.' });
  }
});

app.post('/login', async (req, res) => {
  const { healthIdNumber, password } = req.body;

  const user = await User.find({ healthIdNumber, password });
  if (user) {
    const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: '1d',
    });

    res
      .status(200)
      .send({ user, message: 'Login Successful', accessToken: token });
  } else {
    return res
      .status(404)
      .send({ message: 'healthIdNumber or password is invalid.' });
  }
});

app.post('/reset-password', async (req, res) => {});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
