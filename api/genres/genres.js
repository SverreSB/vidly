/*************************
   

   genres.js

   This file contains HTTP request for /api/genres/.
   Genre {name: String, description: String}

   Request:
   get - fetching genres from database
   post - creating a new genre object in database
   get /:id - fetching genre based on id given in parameter
   put /:id - updating genre object in database based on id given in parameter
   delete /:id - removes genre object from database based on id


*************************/



const {Genre, description, structureName} = require('../../models/api/genres')
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/** 
 * 	Get request on route /api/generes
      	Responds by sending array of genre objects.    
 */
router.get('/', async (req, res) =>{
	const genres = await Genre.find();
    res.send(genres);
});
 

/**
 * 	Post request on rout api/genres
       	Requires a name of genre of minimum 2 chars. 
       	Description can have max 512 chars
       	If you add no description then the description will be "No description"
 */
router.post('/', (req, res) => {
    const schema = {
       name: Joi.string().min(2).max(64).required(),
       description: Joi.string().max(512)
    }
 
    const result = Joi.validate(req.body, schema);
 
    if(result.error) return res.status(400).send(result.error.details[0].message);
 
    var structuredInput = structureName(req.body.name);
 
    /*if(existingGenre(structuredInput)){
       res.status(409).send('Genre already exists');
       return;
    }*/
 
    const genre = new Genre({
       name: structuredInput,
       description: req.body.description
    });
    genre.save();
    res.send(genre);
});
 

/**
 * 	Get request, finding genres on id
       	Finding genres based on id given in parameter, responds with genre object.
 */
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
 
    if(!genre) return res.status(404).send('The genre with given ID was not found');
 
	res.send(genre);	
});
 

/**
 * 	Put request, updating genres
       	This is used to update genre name
       	Having a function to structure the format of the genre string
 */
router.put('/:id', async (req, res) => {
    const schema = {
       	name: Joi.string().min(2).required(), 
    }

    const result = Joi.validate(req.body, schema);
 
    if(result.error) return res.status(400).send(result.error.details[0].message);
    
	var structuredInput = structureName(req.body.name);

	//I should change findByIdAndUpdate because it gives a warning
	const genre = await Genre.findByIdAndUpdate(req.params.id, {
		name: structuredInput}, {
		new: true
	});

	if(!genre) return res.status(404).send('The genre with given ID was not found');
	
    res.send(genre);  
});


/**
 * 	Delete request, deleting genre by id
	   	Checks if given ID exists, if not then an error will appear.
	   	If ID exists the the genre is deleted.
 */
router.delete('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send("Error, genre does not exist");
	
	res.send(genre);
	genre.delete();
});


module.exports = router;