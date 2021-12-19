const express = require('express');
const router = express.Router();

const authorizeToken = require('../middlewares/tokenAuth');

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
      res.status(404).send({ message: 'Hospital with this id not found.' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
