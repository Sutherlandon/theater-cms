const Joi = require('joi');
const db = require('../utils/database');

class User {
  constructor() {
    this.collection = db.getCollection('users');
    this.schema = Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });
  }

  insert(records) {
    return this.collection.insert(records);
  }

  validate(user, callback) {
    // TODO: check that the user name is uique
    this.schema.validate(user, callback);
  }
}

module.exports = User;