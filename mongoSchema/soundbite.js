const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const soundBiteSchema = new Schema({
    address: String,
    avgDecibel: String,
    locMarkerID: String
});

module.exports = mongoose.model("SoundBite", soundBiteSchema)