const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const capabilitySchema = new Schema({
    capabilityName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    dependsOn: {
        type: Array
    },
    enables: {
        type: Array
    }
})

const Capability = mongoose.model('Capability', capabilitySchema);

module.exports = Capability