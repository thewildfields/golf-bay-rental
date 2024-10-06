const express = require('express');
const Venue = require('../models/Venue');

const router = express.Router();

router.get('/', (req, res) => {
    Venue.find()
        .then( venues => {
            res.send(venues);
        })
        .catch( err => {
            res.status(400).json(`Error: ${err}`);
        })
})

router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    Venue.find({owner: userId})
        .then( venues => {
            res.send(venues);
        })
        .catch( err => {
            res.status(400).json(`Error: ${err}`);
        })
})

module.exports = router;