const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  checkIn: Date,
  checkOut: Date,
  // guests: Number,
  totalFee: Number,
  lodging: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Lodging",
  },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
  review: { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
});

module.exports = mongoose.model("Reservation", reservationSchema);
