const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        require: true
    },
    name: {
        type: String,
        minlength: 1,
        maxlengt: 64,
        required: true
    },
    phone: {
        type: Number,
        maxlength: 20,
        trim: true
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) =>{
	const customer = await Customer.find();
    res.send(customer);
});

module.exports = router;
