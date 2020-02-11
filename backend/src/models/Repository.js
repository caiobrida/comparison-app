const { Model, DataTypes } = require('sequelize');
const Joi = require('joi');

class Repository extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      permission: DataTypes.ENUM('admin', 'owner_user', 'all'),
    },
    {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'owner_user_id', as: 'users' });
    this.belongsToMany(models.Comparison, { foreignKey: 'repo_id', through: 'repo_comparisons', as: 'comparisons' });
  }

  static validateRepo(repo) {
    const schema = {
      name: Joi.string().required().min(1).max(255),
      permission: Joi.string()
        .valid(['admin', 'owner_user', 'all'])
        .required()
        .min(3)
        .max(9),
    };
    return Joi.validate(repo, schema);
  }

  static updateRepoValidation(repo) {
    const schema = {
      name: Joi.string().min(1).max(255),
      permission: Joi.string()
        .valid(['admin', 'owner_user', 'all'])
        .min(3)
        .max(9),
    };
    return Joi.validate(repo, schema);
  }
}

module.exports = Repository;
