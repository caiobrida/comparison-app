const bcrypt = require('bcrypt');
const Joi = require('joi');

const User = require('../models/User');

function validateAuth(req) {
  const schema = {
    email: Joi
      .string()
      .required()
      .email()
      .label('Email'),
    password: Joi
      .string()
      .required()
      .min(6)
      .max(255)
      .label('Password'),
  };
  return Joi.validate(req, schema);
}

module.exports = {
  async store(req, res) {
    const { error } = validateAuth(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { password, email } = req.body;

    const invalidMessage = 'Invalid email or password!';

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: invalidMessage });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: invalidMessage });

    const token = user.genAuthToken();
    return res.json({ token });
  },
};
