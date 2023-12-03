const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalFee: Number,
  lodgingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Lodging'},
  memberId: String,
  reviewId: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
});

module.exports = mongoose.model('Reservation', reservationSchema);
