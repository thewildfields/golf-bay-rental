const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    roleName: {
        type: String,
        required: true, 
        unique: true
    },
    capabilities: {
        type: Array,
        required: true,
        unique: false, 
        default: []
    },
    canRegister: {
        type: Boolean,
        required: true,
        default: false,
        unique: false
    }
})

const Role = mongoose.model('Role', roleSchema);

module.exports = Role