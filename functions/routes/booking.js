const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const Booking = require('../models/Booking');

router.post('/', async (req,res) => {
    const bookingRequest = req.body;
    let customer = await Customer.findOne({phone: bookingRequest.customerPhone});
    if(!customer){
        customer = new Customer({
            phone: bookingRequest.customerPhone,
            firstName: bookingRequest.firstName,
            lastName: bookingRequest.lastName
        })
        customer.save()
            .then(savedCustomer => res.json(savedCustomer))
            .catch(err => res.status(400).json(`Error: ${err}`));
    }

    const newBooking = new Booking({
        venueId: req.body.venueId,
        customerId: customer._id,
        bookingDate: req.body.bookingDate,
        bookingTime: req.body.bookingTime,
        guestsCount: req.body.guestsCount,
        isPaid: req.body.isPaid
    });
    newBooking.save()
        .then(savedBooking => res.send({
            booking: savedBooking,
            isSuccess: true
        }))
        .catch(err => res.status(400).json('Error: ' + err));

})

router.put('/:bookingId', (req, res) => {
    const { bookingId, paymentStatus } = req.params;
    if(!email){
        res.status(400).send(`Error, specify the user email.`);
    }
    Booking.findOneAndUpdate({ _id: bookingId }, {
        'isPaid': paymentStatus
    })
        .then( booking => res.send( booking ) )
        .catch( err => console.log(`Error: ${err}`))
})

router.get('/:customerPhone', (req, res) => {
    Customer.findOne({phone: req.params.customerPhone})
        .then( customer => {
            Booking.find({customerId: customer._id})
                .then( bookings => {
                    if( bookings.length > 0){
                        res.send( JSON.stringify(`Hello, ${customer.firstName}! We found your booking today at ${bookings[0].bookingTime}`))
                    }
                })
                .catch( err => res.send(err))
        })
        .catch( err => res.send('Phone doesnt exist'))
    // if(!email){
    //     res.status(400).send(`Error, specify the user email.`);
    // }
    // Booking.findOneAndUpdate({ _id: bookingId }, {
    //     'isPaid': paymentStatus
    // })
    //     .then( booking => res.send( booking ) )
    //     .catch( err => console.log(`Error: ${err}`))
})

module.exports = router;