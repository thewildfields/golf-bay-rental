const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');

router.get('/:venueId/:phone', async (req, res) => {

    const {venueId, phone} = req.params;

    const customer = await Customer.findOne({phone: phone});

    if(!customer){
        res.status(400).send('Wrong phone number')
    } else {
        const booking = await Booking.findOne({
            customerId: customer._id,
            venueId: venueId,
            date: new Date().toISOString().split('T')[0]
        })
        const bookingData = {
            booking: booking,
            customerName: `${customer.firstName} ${customer.lastName}`
        }
        if( booking ){
            res.status(200).send(bookingData)
        }
    }

})

module.exports = router;