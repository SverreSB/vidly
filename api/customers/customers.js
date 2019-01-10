/*************************
   

   customers.js

   This file contains HTTP request for /api/customers/.
   Customer {isGold: Boolean, name: String, phone: String}

   Request:
   get - fetching customers from database
   post - creating a new customer object in database


*************************/




const {Customer} = require('../../models/api/customer');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/**
 * 	get request
		containing anonymous async function to find customer
		and to respond with sending the customer object. 
 */
router.get('/', async (req, res) =>{
	const customer = await Customer.find();
    res.send(customer);
});


/**
 * 	post request
		containg anonymous function to create a customer object in database,
		validating input using joi using a schema.
		Function returns error if validation returns error,
		if not, then a customer object is created and saved in database.
 */
router.post('/', (req, res) => {
    const schema = {
		isGold: Joi.boolean().required(),
        name: Joi.string().min(2).max(64).required(),
        phone: Joi.number()
	}
	
    const result = Joi.validate(req.body, schema);
  
	if(result.error){ return res.status(400).send(result.error.details[0].message);}

	const customer = new Customer({
		isGold: req.body.isGold,
		name: req.body.name,
		phone: req.body.phone
	});

	customer.save();
	res.send(customer);
});


module.exports = router;
