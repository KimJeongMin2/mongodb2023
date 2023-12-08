const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalFee: Number,
  lodging: { type: mongoose.Schema.Types.ObjectId, ref: 'Lodging' },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = mongoose.model('Reservation', reservationSchema);