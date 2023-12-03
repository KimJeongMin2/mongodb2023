const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/review', async (req, res) => {
  try {
    const newReservation = new Review(req.body);
    await newReservation.save();
    res.send(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

module.exports = router;
