/*************************
 
   Requireing modules to use for application.
      mongoose - Used for storing data in db
      Joi - Used for validating input
      express - Used for http requests; get, put, delete...
      genres - Used for route handling at api/genres

 *************************/
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();
const genres = require('./api/genres/genres');

app.use(express.json());
app.use('/api/genres', genres);


app.get('/', (req, res) =>{
   res.send('Check /api/genres/');
});



/**
 * This simulates which port we are communication on. 
 */
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));



