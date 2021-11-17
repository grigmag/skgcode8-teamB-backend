const express = require('express');
const app = express();

require('dotenv').config();
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const createMockData = require('./createMockData');
const User = require('./models/user');
const Prescription = require('./models/prescription');
const Appointment = require('./models/appointment');
const Diagnosis = require('./models/diagnosis');

const authorizeToken = require('./middlewares/tokenAuth');

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

app.get('/', authorizeToken, (req, res) => {
  res.send('Hello world!');
});

// for development, comment out in production
// app.get('/test', async (req, res) => {
//
// });

app.get('/users/:id', authorizeToken, async (req, res) => {
  if (req.user) {
    if (req.user.id === req.params.id) {
      res.send(req.user);
    } else {
      res
        .status(401)
        .send('Unauthorized to access this user profile or invalid user id');
    }
  } else {
    res.status(401).send('You are not logged in');
  }
});

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

  const user = await User.findOne({ healthIdNumber, password });
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

app.post('/reset-password', authorizeToken, async (req, res) => {
  res.send('Reset Password');
});

app.get('/services/prescriptions', authorizeToken, async (req, res) => {
  if (req.user) {
    const user = req.user;
    const userPrescriptions = await Prescription.find({ userId: user.id });
    res.send(userPrescriptions);
  } else {
    res
      .status(401)
      .send(
        `Unauthorized to access this user's prescriptions or invalid user id`
      );
  }
});

app.get('/services/diagnoses', authorizeToken, async (req, res) => {
  if (req.user) {
    const user = req.user;
    const userDiagnosis = await Diagnosis.find({ userId: user.id });
    res.send(userDiagnosis);
  } else {
    res
      .status(401)
      .send(`Unauthorized to access this user's diagnoses or invalid user id`);
  }
});

app.get('/services/appointments', authorizeToken, async (req, res) => {
  if (req.user) {
    const user = req.user;
    const userAppointments = await Appointment.find({ userId: user.id });
    res.send(userAppointments);
  } else {
    res
      .status(401)
      .send(
        `Unauthorized to access this user's appointments or invalid user id`
      );
  }
});

app.post(
  '/services/doctors-appointments/schedule',
  authorizeToken,
  async (req, res) => {
    res.send('Schedule Appointment');
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
