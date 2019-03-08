const Movies = require('../models/movies.model');

const movieRoutes = [{
  method: 'GET',
  path: '/api/movies',
  config: {
    auth: false,
  },
  handler: (request, h) => {
    return h.response(Movies.find());
  }
}];

module.exports = movieRoutes;