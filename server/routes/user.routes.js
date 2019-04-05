const Users = require('../models/user.model');
const util = require('util');

/**
 * Generate a hashed password
 * @param {String} password
 * @param {Function} callback
 */
const hashPassword = util.promisify((password, callback) => {
  // Generate a salt at level 10 strength
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      return callback(err, hash);
    });
  });
});

const userRoutes = [{
  method: 'GET',
  path: '/api/users',
  config: {
    auth: false,
  },
  handler: (request, h) => {
    return h.response(Users.find()); //.header('Authorization', request.headers.authorization)
  }
}, {
  method: 'POST',
  path: '/api/users',
  config: {
    auth: 'jwt',
  },
  handler: (request, h) => {
    const { username, password } = req.payload;
    const user = { username, password };

    // valiate the user, hash the password, and insert, and return a json token
    return Users.validate(user)
      .then(hashPassword(password))
      .then((hash) => {
        user.password = hash;
        return Users.insert(user)
      })
      .then(() => h({ id_token: createToken(user) }).code(201))
      .catch((err) => {
        throw Boom.badRequest(err)
      });
  }
}];

module.exports = userRoutes;