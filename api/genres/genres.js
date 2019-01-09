const Joi = require('joi');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Connecting to mongoose database
mongoose.connect("mongodb://localhost:27017/api-genres", { useNewUrlParser: true })
   .then(() => console.log('Connected to mongodb'))
   .catch(err => console.error('Could not connect to mongodb', err));//replace console.log with debugger

/*const genres = [
    {id: 1, name: "Drama", description: "No Description"},
    {id: 2, name: "Action", description: "No Description"},
    {id: 3, name: "Horror", description: "No Description"},
    {id: 4, name: "Comedy", description: "No Description"},
 ]*/

//Schema for Genre object that is going to be used to retrive and write to db. 
const genreSchema = new mongoose.Schema ({
    name: {
       type: String,
       required: true,
       minlength: 2,
       maxlength: 64
    },
    description: {
       type: String,
       maxlength: 512
    }
}); 

const Genre = mongoose.model('Genre', genreSchema);

/** 
 * Get request on route /api/generes
      Responds by sending array of genre objects.    
 */
router.get('/', async (req, res) =>{
	const genres = await Genre.find();
    res.send(genres);
});
 
 /**
  * Post request on rout api/genres
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
 
    if(result.error){
       res.status(400).send(result.error.details[0].message);
       return;
    }
 
    var structuredInput = structureGenreName(req.body.name);
 
 
    /*if(existingGenre(structuredInput)){
       res.status(409).send('Genre already exists');
       return;
    }*/
 
    const genre = new Genre({
       name: structuredInput,
       description: getDescription(req.body.description)   
    });
    genre.save();
    res.send(genre);
});
 
 /**
  * Get request, finding genres on id
       Finding genres based on id given in parameter, responds with genre object.
  */
router.get('/:id', (req, res) => {
    const genre = findGenreByID(req.params.id);
 
    if(!genre) return res.status(404).send('The genre with given ID was not found');
 
    res.send(genre);
 
});
 
 /**
  * Put request, updating genres
       This is used to update genre name
       Having a function to structure the format of the genre string
       Checking if genre already exists or not. 
  */
router.put('/:id', (req, res) => {
    const genre = findGenreByID(req.params.id)//genres.find(c => c.id === parseInt(req.params.id));
     if(!genre) return res.status(404).send('The genre with given ID was not found');
     
 
    const schema = {
       name: Joi.string().min(2).required(),
       
    }
 
    const result = Joi.validate(req.body, schema);
 
    if(result.error) return res.status(400).send(result.error.details[0].message);
 
    
    
    var structuredInput = structureGenreName(req.body.name);
 
    if(!existingGenre(structuredInput)){
       genre.name = structuredInput;
       res.send(genre);
    }else{
       res.status(409).send('Genre already exists');
    }
    
});
 
 /**
  * Delete request, deleting genre by id
       Finding genre by id, if the genre does not exist, then the route handler returns 404 error
       Else it responds with the deleted genre. 
  */
router.delete('/:id', (req, res) => {
    var genre = findGenreByID(req.params.id);
 
    if(!genre) return res.status(404).send("Error, genre does not exist");
 
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
 
    res.send(genre);
 
});




 /*************************
 
   Functions section
      hasDescription(description : String) return description : String
      structureGenreName(name : String) return name : String
      existingGenre(givenGenre : String) return boolean
      findGenreByID(id : String) return genre : Object(genres)

 *************************/



/**
 * Function for returning a description
      Function is created to be used when description isn't given,
      so that we can return "No description" as new description.
 */
function getDescription(description){
   
    if(description){
       return description;
    }else{
       return "No description";
    }
 }
 
 /**
  * Function for changing the format on genre
       Format is upper case on first letter in string and the rest lower case
       There are noe whitespaces for genre. Use "-" or CamelCase if genre has spacing. 
  */
function structureGenreName(name){
    name = name.replace(/\s+/g,'');
    return `${name.substring(0, 1).toUpperCase()}${name.toLowerCase().substring(1, name.length)}`;
}
 
 /**
  * Function for checking if genre exist in arraylist. 
       If genre exist, then the function will return true, else it will return false. 
  */
function existingGenre(givenGenre){
	const genres = new Genre
		.find()
		.select({name: 1});
	
    /*for(var i = 0; i < genres.length; i++){
       if(genres[i].name === givenGenre){
          return true;
       }
    }*/
    return false;
}
 
 /**
  * Function for finding genre by passing in id
       Returns genre object that is found in array genres.
       If not found the object will be empty. 
  
  */
function findGenreByID(id){
    return genres.find(c => c.id === parseInt(id));
}




module.exports = router;