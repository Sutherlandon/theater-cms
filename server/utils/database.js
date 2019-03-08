const loki = require('lokijs');

// build the database
const database = new loki('db.json', {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000
});

// add collections
// db.addCollection('movies');
// db.addCollection('users');

module.exports = database;