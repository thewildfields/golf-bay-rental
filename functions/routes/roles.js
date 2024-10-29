const express = require('express');
const router = express.Router();
const Role = require('../models/Role');


router.get('/' , async (req, res) => {
    const roles = await Role.find()
    res.status(200).send({
        message: `List of Roles.`,
        messageType: 'success',
        roles: roles
    })
})

module.exports = router;