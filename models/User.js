const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db/database');
const Link = require('./Link');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notNull: { msg: "email is required" },
        }
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notNull: { msg: "password is required" },
        }
    }
});


module.exports = User;