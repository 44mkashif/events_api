const Sequelize = require('sequelize');

const server    = "localhost";
const username  = "root";
const pass      = "adnim";

module.exports = new Sequelize('webteam', username , pass , {
    host: server,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

