const express = require('express');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');

const router = express.Router();

router.get('/', async (req, res) => {

    Booking.find()
        .then( bookings => {
            res.send(bookings);
        })
        .catch( err => console.error(err) );
    });

module.exports = router;