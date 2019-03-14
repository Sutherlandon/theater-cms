const loki = require('lokijs');

// build the database
var db = new loki('../db.json', {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000
});

module.exports = db;