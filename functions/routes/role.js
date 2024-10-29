const express = require('express');
const router = express.Router();
const Role = require('../models/Role');


router.get('/:roleName' , (req, res) => {
    const roleName = req.params.roleName;
    if(!roleName){
        res.status(400).send(`Error, specify the role.`);
    }
    Role.findOne({ roleName: roleName })
        .then( role => res.send( role ) )
        .catch( err => console.log(`Error: ${err}`))
})

router.post('/' , async (req, res) => {
    const { roleName, capabilities, canRegister } = req.body;
    let role = await Role.findOne({roleName: roleName})
    if( role ){
        res.status(400).send({
            message: 'Role Already exists',
            role: role
        })
    } else {
        role = new Role({
            roleName: roleName,
            capabilities: capabilities,
            canRegister: canRegister
        })
        role.save()
            .then( role => {
                res.status(200).send({
                    message: 'Role Already exists',
                    role: role
                })
            })
            .catch( err => {
                res.status(400).send({
                    message: err,
                    role: role
                })
            })
    }
})

module.exports = router;