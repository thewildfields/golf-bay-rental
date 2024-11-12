const express = require('express');
const Bay = require('../models/Bay');

const router = express.Router();

router.get('/:bayId', (req, res) => {
    Bay.findById(req.params.bayId)
        .then( bay => {
            res.send(bay);
        })
        .catch( err => {
            res.status(400).json(`Error: ${err}`);
        })
})

module.exports = router;