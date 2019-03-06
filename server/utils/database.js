const loki = require('lokijs');
const test_data = require('../test_data.js');

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

// add collections
// db.addCollection('movies');
db.addCollection('users');

module.exports = db;