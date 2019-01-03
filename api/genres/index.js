/*************************
 
   Requireing modules to use for application.
      Joi - Used for validating input
      Express - Used for http requests; get, put, delete...

 *************************/
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());



const genres = [
   {id: 1, name: "Drama", description: "No Description"},
   {id: 2, name: "Action", description: "No Description"},
   {id: 3, name: "Horror", description: "No Description"},
   {id: 4, name: "Comedy", description: "No Description"},
]

app.get('/', (req, res) =>{
   res.send('Check /api/genres/');
});

/** 
 * Get request on route /api/generes
      Responds by sending array of genre objects.    
 */
app.get('/api/genres', (req, res) =>{
   res.send(genres);
});

/**
 * Post request on rout api/genres
      Requires a name of genre of minimum 2 chars. 
      Description can have max 512 chars
      If you add no description then the description will be "No description"
 */
app.post('/api/genres', (req, res) => {
   const schema = {
      name: Joi.string().min(2).required(),
      description: Joi.string().max(512)
   }

   const result = Joi.validate(req.body, schema);

   if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
   }

   var structuredInput = structureGenreName(req.body.name);


   if(existingGenre(structuredInput)){
      res.status(409).send('Genre already exists');
      return;
   }

   const genre = {
      id: genres.length +1,
      name: structuredInput,
      description: getDescription(req.body.description)   
   }
   genres.push(genre);
   res.send(genre);
});

/**
 * Put request, updating genres
      This is used to update genre name
      Having a function to structure the format of the genre string
      Checking if genre already exists or not. 
 */
app.put('/api/genres/:id', (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre){
        res.status(404).send('The genre with given ID was not found');
    }

   const schema = {
      name: Joi.string().min(2).required(),
      
   }

   const result = Joi.validate(req.body, schema);

   if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
   }
   
   var structuredInput = structureGenreName(req.body.name);

   if(!existingGenre(structuredInput)){
      genre.name = structuredInput;
      res.send(genre);
   }else{
      res.status(409).send('Genre already exists');
   }
   
});


/**
 * This simulates which port we are communication on. 
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));



/*************************
 
   Functions section
      hasDescription(description : String) return description : String
      structureGenreName(name : String) return name : String
      existingGenre(givenGenre : String) return boolean

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
      If genre exist, then the function will return false, else it will return false. 
 */
function existingGenre(givenGenre){
   for(var i = 0; i < genres.length; i++){
      if(genres[i].name === givenGenre){
         return true;
      }
   }
   return false;
}
