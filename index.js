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

app.get('/', (req, res) => {
  res.send('Welcome to HealthApp API!');
});

// for development, comment out in production
// app.get('/test', async (req, res) => {
//
// });

app.get('/profile', authorizeToken, async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send('You are not logged in');
  }
});

app.post('/register', async (req, res) => {
  const { healthIdNumber, password, email } = req.body;

  const user = await User.findOne({ healthIdNumber });
  if (!user) {
    const newUser = await new User({
      healthIdNumber,
      email,
      password,
    });

    newUser.save((err, user) => {
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
    return res
      .status(400)
      .send({ message: 'User with this healthIdNumber already exists.' });
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
    try {
      const userPrescriptions = await Prescription.find({
        userId: req.user.id,
      });
      res.send(userPrescriptions);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.status(401).send('You are not logged in');
  }
});

app.get('/services/diagnoses', authorizeToken, async (req, res) => {
  if (req.user) {
    try {
      const userDiagnoses = await Diagnosis.find({ userId: req.user.id });
      res.send(userDiagnoses);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.status(401).send('You are not logged in');
  }
});

app.get('/services/appointments', authorizeToken, async (req, res) => {
  if (req.user) {
    try {
      const userAppointments = await Appointment.find({ userId: req.user.id });
      res.send(userAppointments);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.status(401).send('You are not logged in');
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
