const Sequelize = require('sequelize');
const connection = require('../Database/database');


const Admin =connection.define('admins', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    prime: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    

     
    
});

Admin.sync({force: false});

module.exports = Admin;