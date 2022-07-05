const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db/database');
const User = require('./User');

const Link = sequelize.define('Link', {
    from: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notNull: { msg: "from is required" },
        }
    },
    to: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notNull: { msg: "to is required" },
        },
        unique: true
    },
    code: {
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
            notNull: { msg: "code is required" },
        },
        unique: true
    },
    date: {
        type: DataTypes.DATE, 
        allowNull: false,
        validate: {
            notNull: { msg: "date is required" },
        },
        defaultValue: Date.now
    },
    clicks: {
        type: DataTypes.NUMBER,
        defaultValue: 0,
        
    },
    owner: { 
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

module.exports = Link;