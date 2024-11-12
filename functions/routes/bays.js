const express = require('express');
const Bay = require('../models/Bay');

const router = express.Router();

router.get('/', (req, res) => {
    Bay.find()
        .then( bays => {
            res.send(bays);
        })
        .catch( err => {
            res.status(400).json(`Error: ${err}`);
        })
})

router.get('/venue/:venueId', (req, res) => {
    const venueId = req.params.venueId;
    Bay.find({venueId: venueId})
        .then( bays => {
            res.send(bays);
        })
        .catch( err => {
            res.status(400).json(`Error: ${err}`);
        })
})

router.get('/:id', (req, res) => {
    Bay.findById(req.params.id)
        .then( bay => {
            res.send(bay);
        })
        .catch( err => {
            res.status(400).json(`Error: ${err}`);
        })
})

module.exports = router;