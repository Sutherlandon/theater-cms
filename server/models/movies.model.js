const Joi = require('joi');
const util = require('util');
const db = require('../utils/database');

let Movies = db.getCollection('movies');

// define the schema for a movie object
Movies.schema = Joi.object().keys({
  title: Joi.string().required(),
  poster: Joi.string().required(),
  rating: Joi.string().required(),
  runtime: Joi.string().required(),
  showtimes: Joi.array(),
});

// validates a Movie object with a promise
Movies.validate = util.promisify(Movies.schema.validate);

module.exports = Movies;