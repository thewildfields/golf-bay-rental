const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookingSchema = new Schema({
    venueId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: String,
        required: true,
    },
    timeBlocks: {
        type: Array,
        required: true
    },
    gameMode: {
        type: String
    },
    guestCount: {
        type: Number,
        default: 1 
    }
});
 
const Booking = mongoose.model('Booking', bookingSchema);
 
module.exports = Booking;