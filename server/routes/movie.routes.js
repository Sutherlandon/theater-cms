const Movies = require('../models/movies.model');
//const db = require('../utils/database');

const movieRoutes = [{
  method: 'GET',
  path: '/api/movies',
  config: {
    auth: false,
  },
  handler: (request, h) => {
    return h.response(Movies.find());
  }
}, {
  method: 'POST',
  path: '/api/movies',
  config: {
    auth: false,
  },
  handler: (request, h) => {
    console.log(request);
    return h.reasponse(Movies.add(request.body));
  }
}];

module.exports = movieRoutes;