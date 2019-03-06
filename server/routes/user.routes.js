const User = require('../controllers/users.controller');

const userRoutes = [{
  method: 'POST',
  path: '/users',
  handler: (request, h) => {
    const user = User.add(req.payload.username, req.payload.password);
    return h({ id_token: createToken(user) }).code(201);
  }
}];

module.exports = userRoutes;