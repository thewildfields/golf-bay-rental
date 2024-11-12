const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baySchema = new Schema({
    venueId: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
    },
    gameType: {
        type: String
    }
});
 
const Bay = mongoose.model('Bay', baySchema);
 
module.exports = Bay;