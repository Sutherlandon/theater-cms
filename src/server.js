/**
 * Author: Landon Sutherland
 * This is the backend API for controlling movie data
 */

// import required packages
const express = require('express');
const path = require('path');
const imdb = require('imdb-api');
const loki = require('lokijs');
const Hapi = require('hapi');

const test_data = require('./test_data.js');
const config = require('./config.js');

// build the environment
const env = config.dev;

// build the database
const db = new loki('db.json', {
  autoload: true,
  autoloadCallback : () => {
    // load test data
    let movies = db.getCollection('movies');
    if (movies === null) {
      movies = db.addCollection('movies');
      test_data.movies.forEach(movie => movies.insert(movie));
    }
  },
  autosave: true,
  autosaveInterval: 4000
});


// build an api with hap
var server = Hapi.server({
  host: env.base_url,
  port: env.api_port,
  routes: {
    cors: true
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}


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
