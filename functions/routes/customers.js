const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
})

module.exports = router;