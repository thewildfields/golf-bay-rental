const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

router.get('/:customerId', (req, res) => {
    Customer.findById(req.params.customerId)
        .then( customer => { res.send(customer) })
        .catch( err => { res.status(400).json(`Error: ${err}`) })
})

router.get('/:customerPhone', (req, res) => {
    Customer.findOne({phone: req.params.customerPhone})
        .then( customer => { res.send(customer) })
        .catch( err => { res.status(400).json(`Error: ${err}`) })
})

module.exports = router;