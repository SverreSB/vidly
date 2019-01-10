const Joi = require('joi');
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlengt: 64,
        required: true
    },
    phone: {
        type: String,
        maxlength: 20,
        trim: true
    }
});


const Customer = mongoose.model('Customer', customerSchema);


exports.Customer = Customer;