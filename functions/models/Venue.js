const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    venueId: {
        type: String, 
        required: true,
        unique: true
    },
    venueName: {
        type: String, 
        required: true
    },
    bayCount: {
        type: String,
        required: true
    },
    venueOpeningTime: {
        type: String,
        required: true
    },
    venueClosingTime: {
        type: String,
        required: true
    },
    minimalBookingTime: {
        type: Number,
        required: true
    },
    initialPeriodPrice: {
        type: Number,
        required: true
    },
    additionalPeriodPrice: {
        type: Number,
        required: true
    },
    bookingFrequency: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true
    }

})

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;