/** 
 * List of movie objects
 */
const movies = [
    {id: "ACT100", name: "Spider-man", genre: "Action", hours: 2, minutes: 1, year: 2002},
    {id: "DRA100", name: "The Prestige", genre: "Drama", hours: 2, minutes: 10, year: 2006},
    {id: "ACT101", name: "The Dark Knight", genre: "Action", hours: 2, minutes: 32, year: 2008},
 ];

/**
 * Post request for rout /api/genres
      This takes in the values given and checks for requirements and validating using joi.
      If it does not validate, then the error message is printed and the request is canceled.
      If there are no errors, the a objct is created using the inputs and generetes an ID,
      then the object is added to the array.
      Then we respond with the movie object.

 * How to make a post request for genres. 
      name - Name of the movie, must contain 2 letters
      genre - Genre of the movie, must contain 3 letters
      hours - How many hours does the movie last, minimum 0 hours and max 23 hours
      minutes - How many minutes in the movie, minimum 1 minute and max 59 minutes
      year - What year the movie was released, minimum year 1895(Grand Cafe, Paris) and max year is current year
 */
/*app.post('/api/genres', (req, res) => {
   
   //Getting which year we are in when request is sent, max year for movie to be added is current year
   var yearNow = new Date().getFullYear();
   
   const schema = {
      name: Joi.string().min(2).required(),
      genre: Joi.string().min(3).required(),
      hours: Joi.number().integer().min(0).max(23).required(),
      minutes: Joi.number().integer().min(1).max(59).required(),
      year: Joi.number().integer().min(1888).max(yearNow).required()
   
   }

   const result = Joi.validate(req.body, schema);

   if(result.error){
      res.status(400).send(result.error.details[0].message); 

      return;
   }

   const movie= {
      id: createID(req.body.genre), 
      name: req.body.name,
      //You need a function here to make the genre look pretty look on genre. "Drama", "Horror"....
      genre: req.body.genre,
      hours: req.body.hours,
      minutes: req.body.minutes,
      year: req.body.year,
  };

  movies.push(movie);
  res.send(movie);

});*/

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