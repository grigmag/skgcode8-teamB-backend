const express = require('express');
const router = express.Router();
const moment = require('moment');

const authorizeToken = require('../middlewares/tokenAuth');
const { logError, handleError } = require('../middlewares/errorHandling');

const Hospital = require('../models/hospital');

router.use(authorizeToken);

router.get('/', async (req, res, next) => {
  try {
    const hospitals = await Hospital.find();
    res.send(hospitals);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const hospital = await Hospital.findById(req.params.id);
    if (hospital) {
      res.send(hospital);
    } else {
      res
        .status(400)
        .send({ message: 'Could not find a hospital with this id.' });
    }
  } catch (err) {
    next(err);
  }
});

router.use(logError, handleError);

module.exports = router;
