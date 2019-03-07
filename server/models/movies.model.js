const Joi = require('joi');
const util = require('util');
const db = require('../utils/database');

// load test data
const test_data = require('../test_data.js');

let Movies = db.getCollection('movies');

// load test data
if (Movies === null) {
  Movies = db.addCollection('movies');
  test_data.movies.forEach(movie => Movies.insert(movie));
}

// define the schema for a movie object
Movies.schema = Joi.object().keys({
  title: Joi.string().required(),
  poster: Joi.string().required(),
  rating: Joi.string().required(),
  runtime: Joi.string().required(),
  showtimes: Joi.object(),
});

Movies.schema.validate = util.promisify(Movies.schema.validate);

module.exports = Movies;