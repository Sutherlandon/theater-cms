const Joi = require('joi');
const util = require('util');
const db = require('../utils/database');

let Users = db.getCollection('users')

// define the schema for User object
Users.schema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// validates a User object with a promise
Users.validate = util.promisify(Users.schema.validate);

module.exports = Users;