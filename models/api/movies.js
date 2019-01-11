const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genres');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        maxlength: 64,
        required: true
    },
    description: {
        type: String,
        default: 'Missing description',
        maxlength: 256
    } ,
    age:{
        type: Number,
        min: 3, 
        max: 21,
        required: true
    },
    genre: {
        type: genreSchema,
        required: true
    }
}));


function getTitle(title, movie){
    if(!title) return movie.title;
    
    return title;
}


function getDescription(description, movie){
    if(!description) return movie.description;

    return description;
}


function getAge(age, movie){
    if(!age) return movie.age;

    return age;
}



exports.Movie = Movie;
exports.getMovieTitle = getTitle;
exports.getMovieDescription = getDescription;
exports.getMovieAge = getAge; 