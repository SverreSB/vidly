const {Movie} = require('../../models/api/movies');
const Joi = require('Joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
   const movies = await Movie.find();
   res.send(movies);
   
});


router.post('/', (req, res) => {
   const schema = {
      title: Joi.string().min(1).max(64).required(),
      description: Joi.string().max(256),
      age: Joi.number().max(21).required()
   }

   const result = Joi.validate(req.body, schema);

   if(result.error) return res.status(400).send(result.error.details[0].message);

   const movie = new Movie({
      title: req.body.title,
      description: req.body.description,
      age: req.body.age
   });

   movie.save();
   res.send(movie);
});


module.exports = router;