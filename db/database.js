const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'user', 'pass', {
    dialect: 'sqlite',
    host: './db/db.sqlite'
});

module.exports = sequelize;


/*

{
              host: "0.0.0.0",
              dialect: "sqlite",
              pool: {
                max: 5,
                min: 0,
                idle: 10000
              },
              storage: "./db/database.sqlite"
            }
*/