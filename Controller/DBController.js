const Sequelize = require('sequelize');
const connection = require('../Database/database');

const Tabel =connection.define('tabels', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    }, 
    
});

Tabel.sync({force: false});

module.exports = Tabel;