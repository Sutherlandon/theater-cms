const bcrypt = require('bcrypt');
const Boom = require('boom');

const User = require('../models/user.model');

/**
 * Generate a hashed password
 * @param {String} password
 * @param {Function} callback
 */
function hashPassword(password, callback) {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return callback(err, hash);
    });
  });
}

/**
 * Inserts a new user into the databse with the given username and a hashed password
 * @param {String} username 
 * @param {String} password 
 */
const add = (username, password) => {
  // valiate the user and insert them
  const user = { username, password };
  User.validate(user, (err, value) => {
    if (err) {
      throw Boom.badRequest(err);
    }

    // Hash the password
    hashPassword(password, (err, hash) => {
      // save the result
      user.password = hash;
      User.insert(user);
    });
  });
}

module.exports = { add };