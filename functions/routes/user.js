const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:email' , (req, res) => {
    const email = req.params.email;
    if(!email){
        res.status(400).send(`Error, specify the user email.`);
    }
    User.find({ email: email })
        .then( user => res.send( user ) )
        .catch( err => console.log(`Error: ${err}`))
})

router.put('/:email', (req, res) => {
    const { email, firstName, lastName } = req.params;
    if(!email){
        res.status(400).send(`Error, specify the user email.`);
    }
    User.findOneAndUpdate({ email: email }, {
        firstName: firstName,
        lastName: lastName
    })
        .then( user => res.send( user ) )
        .catch( err => console.log(`Error: ${err}`))
})

module.exports = router;