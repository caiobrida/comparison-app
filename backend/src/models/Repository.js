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
  }

  static validateRepo(repo) {
    const schema = {
      name: Joi.string().required(),
      permission: Joi.string()
        .valid(['admin', 'owner_user', 'all'])
        .required()
        .min(3)
        .max(9),
    };
    return Joi.validate(repo, schema);
  }
}

module.exports = Repository;
