const {Movie, getMovieTitle, getMovieDescription, getMovieAge} = require('../../models/api/movies');
const{Genre} = require('../../models/api/genres');
const Joi = require('Joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
   const movies = await Movie.find();
   res.send(movies);
   
});


/**
 *    Post request for creating a new movie object
         Creates schema for validation using joi, then find genre based on id.
         If genre doesn't exist, then return error 400. 
         If not, then create a movie object and save to database
 */
router.post('/', async (req, res) => {
   const schema = {
      title: Joi.string().min(1).max(64).required(),
      description: Joi.string().max(256),
      age: Joi.number().max(21).required(),
      genreID: Joi.string().required()
   }

   const result = Joi.validate(req.body, schema);

   if(result.error) return res.status(400).send(result.error.details[0].message);

   const genre = await Genre.findById(req.body.genreID);

   if(!genre) return res.status(400).send('Invalid genreID');
   
   const movie = new Movie({
      title: req.body.title,
      description: req.body.description,
      age: req.body.age,
      genre: {
         _id: genre._id,
         name: genre.name,
         description: genre.description
      }
   });

   movie.save();
   res.send(movie);
});


router.get('/:id', async(req, res) => {
   const movie = await Movie.findById(req.params.id);

   if(!movie) return res.status(400).send('Movie not found');

   res.send(movie);
});

router.put('/:id', async(req, res) => {
   const schema = {
      title: Joi.string().min(1).max(64),
      description: Joi.string().max(256),
      age: Joi.number().max(21)
   }

   const result = Joi.validate(req.body, schema);
   if(result.error) return res.status(400).send(result.error.details[0].message);

   const movie = await Movie.findById(req.params.id);
   
   const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {
      title: getMovieTitle(req.body.title, movie),
      description: getMovieDescription(req.body.description, movie),
      age: getMovieAge(req.body.age, movie)
   }, {new: true});   

   if(!updateMovie) return res.status(404).send('The movie with given ID was not found');
	
   res.send(updateMovie);  
 
});


module.exports = router;