const express = require('express');
const router = express.Router();
const Capability = require('../models/Capability');


router.get('/' , async (req, res) => {
    const capabilities = await Capability.find()
    res.status(200).send({
        message: `List of Capabilities.`,
        messageType: 'success',
        capabilities: capabilities
    })
})

module.exports = router;