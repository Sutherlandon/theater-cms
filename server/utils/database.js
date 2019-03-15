const loki = require('lokijs');
const test_data = require('../test_data.js');

// create the database object
const db = new loki('theater.db', {
  autoload: true,
  autoloadCallback: () => {

    // load test data
    let Movies = db.getCollection('movies');
    if (Movies === null) {
      console.log('loading test movies...');
      Movies = db.addCollection('movies');
      test_data.movies.forEach(movie => Movies.insert(movie)); 
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
  },
  autosave: true,
  autosaveInterval: 4000
});

module.exports = db;