const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    address: String,
    soundBiteIDs: [String]
});

module.exports = mongoose.model("Location", locationSchema)