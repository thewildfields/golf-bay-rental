const express = require('express');
const router = express.Router();
const Capability = require('../models/Capability');


router.get('/:capabilityName' , async (req, res) => {
    const capabilityName = req.params.capabilityName;
    if(!capabilityName){
        res.status(400).send({
            message: `Specify the capability`,
            messageType: 'not-specified'
        })
    }
    const capability = await Capability.findOne({ capabilityName: capabilityName })
    if( !capability ){
        res.status(400).send({
            message: `Capability ${capabilityName} does not exist`,
            messageType: 'does-not-exist'
        })
    } else {
        res.status(200).send({
            message: `Description data for ${capabilityName} capability.`,
            messageType: 'success',
            capability: capability
        })
    }
})


router.post('/' , async (req, res) => {
    const { capabilityName, description, dependsOn, enables } = req.body;
    if(!capabilityName){
        res.status(400).send({
            message: `Specify the capability`,
            messageType: 'not-specified'
        })
    }
    let capability = await Capability.findOne({ capabilityName: capabilityName })
    if( capability ){
        res.status(400).send({
            message: `Capability ${capabilityName} already exists.`,
            messageType: 'already-exist',
            capability: capability
        })
    } else {
        capability = new Capability({
            capabilityName: capabilityName,
            description: description,
            dependsOn: dependsOn.constructor === Array ? dependsOn : [],
            enables: enables.constructor === Array ? enables : []
        })
        capability.save()
            .then( capability => {
                res.status(200).send({
                    message: `Capability ${capabilityName} was succesfully added.`,
                    messageType: 'success',
                    capability: capability
                })
            })
            .catch( err => {
                res.status(400).send({
                    message: `Error when creating capability ${capabilityName} : ${err}`,
                    messageType: 'error'
                })
            })
    }
})

module.exports = router;