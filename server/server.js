/**
 * Author: Landon Sutherland
 * This is the backend API for controlling movie data
 */

// import required packages
const Hapi = require('hapi');

//const imdb = require('imdb-api');
const config = require('./config.js');
const db = require('./utils/database');

// bring your own validation function?
const validate = async (decoded, request) => {
  let isValid = true;

  // do your checks here

  return { isValid };
}

// initialize the server
const init = async () => {
  // load the database, if it's the first time load it with test data
  try {
    await db.loadDatabase({});

    // load test data
    let Movies = db.getCollection('movies');
    if (Movies === null) {
      console.log('loading test movies...');
      Movies = db.addCollection('movies');
      require('./test_data.js').movies.forEach(movie => Movies.insert(movie)); 
    }

    let Users = db.getCollection('users');
    if (Users === null) {
      console.log('loading test users...');
      Users = db.addCollection('users');
      [{
        username: 'landon',
        password: 'hello'
      }, {
        username: 'liese',
        password: 'world'
      }]
        .forEach(user => Users.insert(user));
    }

    console.log('initialized DB');
  } catch(err) {
    console.log(`Error: ${err}`)
  }

  // build an api with hapi
  const server = Hapi.server({
    host: config.hostname,
    port: config.api_port,
    routes: {
      cors: true
    }
  });

  // register the auth plugin and wrap the user routes with them
  await server.register(require('hapi-auth-jwt2'));

  // give the stategy both name and scheme of 'jwt'
  server.auth.strategy('jwt', 'jwt', {
    key: config.secret,
    validate: validate,
    verifyOptions: { algorithms: ['HS256'] },
  });

  server.auth.default('jwt');

  // register routes
  server.route(require('./routes/user.routes'));
  server.route(require('./routes/movie.routes'));

  await server.start((err) => {
    if (err) {
      throw err;
    }
  });

  console.log(`Server running at: ${server.info.uri}`);
}

// fire it up!
init().catch(err => console.log(err));



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
