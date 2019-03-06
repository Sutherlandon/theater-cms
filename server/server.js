/**
 * Author: Landon Sutherland
 * This is the backend API for controlling movie data
 */

// import required packages
const Hapi = require('hapi');

const userRoutes = require('./routes/user.routes');
const db = require('./utils/database');

//const imdb = require('imdb-api');
const config = require('../src/config.js');

// build the environment
const env = config.dev;

// build an api with hapi
var server = Hapi.server({
  host: env.base_url,
  port: env.api_port,
  routes: {
    cors: true
  }
});

server.register(require('hapi-auth-jwt'), (err) => {
  // give the stategy both name and scheme of 'jwt'
  server.auth.strategy('jwt', 'jwt', {
    key: env.secret,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.route('api/')
});

const init = async () => {
  await server.start((err) => {
    if (err) {
      throw err;
    }
  });

  console.log(`Server running at: ${server.info.uri}`);
}

server.route(userRoutes);

server.route({
  method: 'GET',
  path: '/movies',
  handler: (request, h) => {
    return h.response(db.getCollection('movies').find());
  }
});

init();



/** Beneath here is irrelevent now I think */

/*
// gets movie meta-data based on title from the imbd-api
app.get('/movie/:title', function (req, res) {
  imdb.getReq({
    name: req.params.title,
    opts: {
      apiKey: '3b26d738',
    }
  }, (err, data) => {
    res.send(data);
  });
});

// gets movie meta-data based on title from the imbd-api
app.get('/movie/:title/:year', function (req, res) {
  imdb.getReq({
    name: req.params.title,
    year: req.params.year,
    opts: {
      apiKey: '3b26d738',
    }
  }, (err, data) => {
    res.send(data);
  });
});

// fires up the server to listen on port 3001
app.listen(env.api_port, function () {
  console.log(`Theater-CMS running (port: ${env.api_port})`);
});
*/
