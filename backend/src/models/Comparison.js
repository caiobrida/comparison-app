const { Model, DataTypes } = require('sequelize');
const Joi = require('joi');

class Comparison extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      img1: DataTypes.STRING,
      img2: DataTypes.STRING,
      diff: DataTypes.STRING,
    },
    {
      sequelize,
    });
  }

  static validateComparison(comparison) {
    const schema = {
      name: Joi
        .string()
        .min(1)
        .max(255)
        .required()
        .label('Name'),
      img1: Joi
        .string()
        .required()
        .label('First Image'),
      img2: Joi
        .string()
        .required()
        .label('Second Image'),
    };
    return Joi.validate(comparison, schema);
  }
}

module.exports = Comparison;
