const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');

router.get('/venue/:venueId/bay/:bayId/phone/:phone', async (req, res) => {

    const {venueId, bayId, phone} = req.params;

    const customer = await Customer.findOne({phone: phone});

    if(!customer){
        res.status(200).send({
            isSuccess: false,
            errorMessage: 'Can`t find bookings for this phone number. Try again'
        })
    } else {
        const booking = await Booking.findOne({
            customerId: customer._id,
            venueId: venueId,
            date: new Date().toISOString().split('T')[0]
        })
        if( booking ){
            const bookingData = {
                booking: booking,
                customerName: `${customer.firstName} ${customer.lastName}`,
                isSuccess: true
            }
            res.status(200).send(bookingData)
        } else {
            res.status(200).send({
                isSuccess: false,
                errorMessage: 'Can`t find your booking. Try again.'
            })
        }
    }

})

module.exports = router;