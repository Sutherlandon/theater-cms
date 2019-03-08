const Joi = require('joi');
const util = require('util');
const db = require('../utils/database');

let Users = db.getCollection('users');

// load test data
if (Users === null) {
  Users = db.addCollection('users');
  [
    {username: 'landon', password: 'hello'},
    {username: 'liese', password: 'world'},
  ].forEach(user => Users.insert(user));
}

// define the schema for User object
Users.schema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// validates a User object with a promise
Users.validate = util.promisify(Users.schema.validate);

module.exports = Users;