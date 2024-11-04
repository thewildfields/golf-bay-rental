const express = require('express');
const router = express.Router();
const Venue = require('../models/Venue');

router.post('/', async (req,res) => {
    const venueData = req.body;
    if( !venueData.name || !venueData.title || !venueData.owner ){
        res.status(400).send({
            message: `Some data is missing.`,
            isSuccess: false,
            messageType: 'not-specified'
        })
    }
    let venue = await Venue.findOne({name: venueData.name})
    if( !venue ){
        const newVenue = new Venue(venueData);
        newVenue.save()
            .then(savedVenue => res.status(200).send({
                message: `New Venue ${venueData.title} is created.`,
                venue: savedVenue,
                isSuccess: true,
                messageType: 'success'
            }))
            .catch(err => res.status(400).json('Error: ' + err));        
    } else {
        res.status(400).send({
            message: `Venue with name ${venueData.name} already exists.`,
            isSuccess: false,
            messageType: 'already-exist'
        })
        res.send(venue);
    }
})

router.get('/:name' , (req, res) => {
    const name = req.params.name;
    if(!name){
        res.status(400).send(`Error, specify the venue name.`);
    }
    Venue.find({ name: name })
        .then( venue => res.send( venue ) )
        .catch( err => console.log(`Error: ${err}`))
})

router.put('/:name' , async (req, res) => {
    const { name, ...restOfData } = req.body
    if(!name){
        res.status(400).send({
            message: `Error. Specify the name parameter`,
            isSuccess: false,
            messageType: 'not-specified'
        })
    }
    Venue.findOneAndUpdate({name: name}, restOfData).then(
        venue => {
            res.status(200).send({
                message: `Venue ${venueData.title} has been updated.`,
                isSuccess: true,
                messageType: 'success',
                venue: venue
            })
        }
    ).catch(
        err => {
            res.status(400).send({
                message: err,
                isSuccess: false,
                messageType: 'error'
            })
        }
    )
})

router.delete('/' , (req, res) => {
    const {name} = req.body;
    // res.send(venueName)
    // Venue.findOne({venueName: venueName})
    //     .then(response => {
    //         res.send('success')
    //     })
    //     .catch(err => {
    //         res.send('error')
    //     })
    Venue.findOneAndDelete({name: name})
        .then( response => {
            res.status(200).send({
                message: `Venue was deleted.`,
                isSuccess: true,
                messageType: 'success',
                response: response
            })
        })
        .catch( err => {
            res.status(400).send({
                message: 'Error',
                isSuccess: false,
                messageType: 'error'
            })
        })
})

module.exports = router;