const { Model, DataTypes } = require('sequelize');
const Joi = require('joi');

class Comparison extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      img1: DataTypes.STRING,
      img2: DataTypes.STRING,
      diff: {
        type: DataTypes.STRING,
        defaultValue: `diff-${Date.now()}.png`,
      },
      img1_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.URL}/comparisons/files/${this.img1}`;
        },
      },
      img2_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.URL}/comparisons/files/${this.img2}`;
        },
      },
      diff_url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${process.env.URL}/comparisons/files/${this.diff}`;
        },
      },
    },
    {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_user_id', as: 'users' });
    this.belongsToMany(models.Repository, { foreignKey: 'comparison_id', through: 'repo_comparisons', as: 'repositories' });
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
        .label('First Image'),
      img2: Joi
        .string()
        .label('Second Image'),
    };
    return Joi.validate(comparison, schema);
  }

  static updateComparisonValidation(comparison) {
    const schema = {
      name: Joi
        .string()
        .min(1)
        .max(255)
        .label('Name'),
      img1: Joi
        .string()
        .label('First Image'),
      img2: Joi
        .string()
        .label('First Image'),
    };
    return Joi.validate(comparison, schema);
  }
}

module.exports = Comparison;
