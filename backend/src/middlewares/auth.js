const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = {
  default(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.user = decoded;

      return next();
    } catch (err) {
      return res.status(400).json({ message: 'Invalid token' });
    }
  },

  verify(req, res, next) {
    if (req.header('x-auth-token')) {
      const token = req.header('x-auth-token');
      try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
      } catch (err) {
        return next();
      }
    }
    return next();
  },
};
