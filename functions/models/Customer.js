const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    }
})

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;