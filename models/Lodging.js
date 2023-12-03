const mongoose = require('mongoose');

const lodgingSchema = new mongoose.Schema({
  name: String,
  address: String,
  type: String,
  capacity: Number,
  rooms: Number,
  introduction: String,
  convenience: mongoose.Schema.Types.Mixed,
  weekdayFee: Number,
  weekendFee: Number
});

module.exports = mongoose.model('Lodging', lodgingSchema);
