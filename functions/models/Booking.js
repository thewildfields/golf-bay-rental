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
    bookingDate: {
        type: String,
        required: true
    },
    bookingTime: {
        type: String,
        required: true
    },
    guestsCount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        required: true
    }
});
 
const Booking = mongoose.model('Booking', bookingSchema);
 
module.exports = Booking;