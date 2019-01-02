/*************************
 * Requireing modules to use for application.
      Joi - Used for validating input
      Express - Used for http requests; get, put, delete...
 *************************/
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

/*************************
 * List of movie objects
 *************************/
const movies = [
   {id: 1, name: "Spider-man", genre: "Action", hours: 2, minutes: 1, year: 2002},
   {id: 2, name: "The Prestige", genre: "Drama", hours: 2, minutes: 10, year: 2006},
   {id: 3, name: "The Dark Knight", genre: "Action", hours: 2, minutes: 32, year: 2008},
];

app.get('/', (req, res) =>{
   res.send('Check /api/genres/');
});

/*************************
 * Get request on route /api/generes/
      Responds by sending list of movie objects.
 *************************/
app.get('/api/genres/', (req, res) =>{
   res.send(movies);
});


/*************************
 * This simulates which port we are communication on. 
 *************************/
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));