const express = require('express');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', async (req, res) => {
    Booking.find()
        .then( bookings => { res.send(bookings); })
        .catch( err => console.error(err) );
});

router.get('/:venueId/:date', async (req, res) => {

    const filter = {}
    const keys = Object.keys(req.params)
    keys.forEach( key => {
        if( key.length > 0 ){
            filter[key] = req.params[key]
        }
    })
    Booking.find(filter)
        .then( bookings => {
            res.send(bookings);
        })
        .catch( err => console.error(err) );

});

module.exports = router;

