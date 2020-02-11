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
      avatar: {
        type: DataTypes.STRING,
        defaultValue: 'default.jpg',
      },
      avatar_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.URL}/users/files/${this.avatar}`;
        },
      },
    },
    {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Repository, { foreignKey: 'owner_user_id', as: 'repositories' });
    this.hasMany(models.Comparison, { foreignKey: 'owner_user_id', as: 'comparisons' });
  }

  static validateUser(user) {
    const schema = {
      name: Joi
        .string()
        .required()
        .min(2)
        .max(255)
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
      avatar: Joi
        .string()
        .label('Avatar'),
      event: Joi
        .string()
        .required(),
    };

    return Joi.validate(user, schema);
  }

  static updateUserValidation(user) {
    const schema = {
      name: Joi
        .string()
        .min(2)
        .max(255)
        .label('Name'),
      avatar: Joi
        .string()
        .label('Avatar'),
      event: Joi
        .string()
        .required(),
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
  process.env.JWT_PRIVATE_KEY);

  return token;
};

module.exports = User;
