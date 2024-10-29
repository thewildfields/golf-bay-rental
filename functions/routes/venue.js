const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

router.post('/', async (req,res) => {
    const venueRequest = req.body;
    let venueId = venueRequest.venueId, venueIdExists = false;
    const newVenue = new Venue({
        venueId: venueRequest.venueId,
        venueName: venueRequest.venueName,
        bayCount: venueRequest.bayCount,
        venueOpeningTime: venueRequest.venueOpeningTime,
        venueClosingTime: venueRequest.venueClosingTime,
        minimalBookingTime: venueRequest.minimalBookingTime,
        initialPeriodPrice: venueRequest.initialPeriodPrice,
        additionalPeriodPrice: venueRequest.additionalPeriodPrice,
        bookingFrequency: venueRequest.bookingFrequency,
        owner: venueRequest.owner
    });
    newVenue.save()
        .then(savedVenue => res.send({
            venue: savedVenue,
            isSuccess: true
        }))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.get('/:venueId' , (req, res) => {
    const venueId = req.params.venueId;
    if(!venueId){
        res.status(400).send(`Error, specify the venue name.`);
    }
    Venue.find({ venueId: venueId })
        .then( venue => res.send( venue ) )
        .catch( err => console.log(`Error: ${err}`))
})

router.put('/:venueId' , (req, res) => {
    const venueId = req.params.venueId;
    if(!venueId){
        res.status(400).send(`Error, specify the venue name.`);
    }
    Venue.findOneAndUpdate({venueId: venueId}, req.body)
        .then( venue => res.send( 'venue updated' ) )
        .catch( err => console.log(`Error: ${err}`))
})

module.exports = router;