const { Model, DataTypes } = require('sequelize');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
    });
  }

  static validateUser(user) {
    const schema = {
      name: Joi
        .string()
        .required()
        .label('Name'),
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

    return Joi.validate(user, schema);
  }
}

User.prototype.genAuthToken = function () {
  const token = jwt.sign({
    id: this.id,
    name: this.name,
    email: this.email,
    is_admin: this.is_admin,
  },
  process.env.jwtPrivateKey);

  return token;
};

module.exports = User;
