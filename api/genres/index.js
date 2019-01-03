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

   const genre = {
      id: genres.length +1,
      name: req.body.name,
      description: getDescription(req.body.description)
      
      
   }
   genres.push(genre);
   res.send(genre);

});



/**
 * Get request for route to find genres
      Find movies based on genres. If a movies genre matches the paramater,
      then the movie will be sent as respons to the request. 
 */
/*app.get('/api/genres/:genre', function(req, res){
   var genreInput = req.params.genre;
   const genreMovies = [];
   movies.forEach(movie => {
      if(movie.genre.toLowerCase() === genreInput.toLowerCase()){
         genreMovies.push(movie);
      }
   });

   if(!genreMovies) res.status(404).send("Error, no movies in that genre");
   res.send(genreMovies);
});*/


/**
 * This simulates which port we are communication on. 
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));



/*************************
 
   Functions section
      createID(genre : String) return id : String
      hasValue(value : String) return boolean

 *************************/


 /**
  * Function for creating an unique id for a movie. 
      Format - three first letters from genre.
             - a number greater than 100, first movie added is 100, 
               second is 101 ...
      
      Example - Drama movie number 5: DRA104
  */
function createID(genre){
   var id = genre.substring(0, 3).toUpperCase();
   var counter = 100;
   for(var i = 0; i < movies.length; i++){
      if(movies[i].genre == genre){
         counter ++;
      }
   }
   id += counter;

   return id;
}

function getDescription(description){
   
   if(description){
      return description;
   }else{
      return "No description";
   }
}