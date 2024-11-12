const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true
    },
    gameModes: {
        type: Array
    },
    drivingRangeBayCount: {
        type: String,
        default: 1
    },
    coursePlayBayCount: {
        type: String,
        default: 1
    },
    isOpenAllDay: {
        type: Boolean,
        default: false
    },
    openDays: {
        type: Array,
        default: ['monday','tuesday','wednesday','thursday','friday']
    },
    openingTime: {
        type: Number,
        default: 18
    },
    closingTime: {
        type: Number,
        default: 34
    },
    bookingDurationType: {
        type: String,
        default: 'fixed'
    },
    fixedBookingBlockDuration: {
        type: Number,
        default: 1
    },
    variableBookingMinimalDuration: {
        type: Number,
        default: 1
    },
    allowMemberships: {
        type: Boolean,
        default: false
    },
    maxBookingsPerDaysForMembers: {
        type: Number,
        default: 1
    },
    initialPeriodPrice: {
        type: Number
    },
    additionalPeriodPrice: {
        type: Number
    },

})

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;