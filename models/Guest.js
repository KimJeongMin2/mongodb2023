const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Guest', guestSchema);
