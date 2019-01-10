const Joi = require('joi');
const mongoose = require('mongoose');


//Schema for Genre object that is going to be used to retrive and write to db. 
const genreSchema = new mongoose.Schema ({
    name: {
       type: String,
       required: true,
       minlength: 2,
	   maxlength: 64,
	   trim: true
    },
    description: {
       type: String,
       maxlength: 512
    }
});


const Genre = mongoose.model('Genre', genreSchema);




/*************************
 
   	Functions section
      	hasDescription(description : String) return description : String
      	structureGenreName(name : String) return name : String
      	//existingGenre(givenGenre : String) return boolean
      

*************************/




/**
 * 	Function for returning a description
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
 * 	Function for changing the format on genre
       	Format is upper case on first letter in string and the rest lower case
       	There are noe whitespaces for genre. Use "-" or CamelCase if genre has spacing. 
 */
function structureGenreName(name){
	name = name.replace(/\s+/g,'');
	return `${name.substring(0, 1).toUpperCase()}${name.toLowerCase().substring(1, name.length)}`;
}


/**
 * 	Function for checking if genre exist in arraylist. 
    	If genre exist, then the function will return true, else it will return false. 
 */
/*async function existingGenre(givenGenre){
	const genres = await getGenreFromDB();
	console.log(genres[0].name);

    for(var i = 0; i < genres.length; i++){
       	if(genres[i].name === givenGenre){
        	return true;
       }
    }
	return false;
}*/



/*exports({
    genre: genre,
    structureName: structureGenreName
});*/


exports.Genre = Genre;
exports.description = getDescription;
exports.structureName = structureGenreName;
