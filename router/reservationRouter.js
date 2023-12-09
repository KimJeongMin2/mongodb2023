const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

router.post('/new', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.send(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
