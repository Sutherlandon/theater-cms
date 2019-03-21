const Loki = require('lokijs');
const util = require('util');

// create the database object
const db = new Loki('theater.db');

db.loadDatabase = util.promisify(db.loadDatabase);

module.exports = db;