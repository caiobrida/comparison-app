const { Model, DataTypes } = require('sequelize');
const Joi = require('joi');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            is_admin: DataTypes.BOOLEAN
        },
        {
            sequelize
        });
    }

    static validateUser(user) {
        const schema = {
            name: Joi.string().required().label('Name'),
            email: Joi.string().required().email().label('Email'),
            password: Joi.string().required().min(6).max(255).label('Password'),
            is_admin: Joi.boolean()
        }
        return Joi.validate(user, schema);
    } 
}

module.exports = User;