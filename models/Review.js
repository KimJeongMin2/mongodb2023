const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review: String,
  rating: Number,
  lodgingId: {type: mongoose.Schema.Types.ObjectId, ref: 'Lodging'},
  memberId: String,
  reservationId: {type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}
});

module.exports = mongoose.model('Review', reviewSchema);
