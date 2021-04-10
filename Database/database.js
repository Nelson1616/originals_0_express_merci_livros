const Sequelize = require('sequelize');

const connection = new Sequelize('db_merci', 'merci', 'Nyck123ma45', {
    host: 'mysql743.umbler.com',
    dialect: 'mysql',
    timezone: '-03:00',

});

module.exports = connection;