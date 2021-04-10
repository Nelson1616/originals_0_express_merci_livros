const Sequelize = require('sequelize');
const connection = require('../Database/database');
const Category = require('../Categories/Category');

const Book =connection.define('books', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false,
    },   
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    imgLink: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: false,
    },

     
    
});

Category.hasMany(Book, {onDelete: 'cascade', hooks:true});
Book.belongsTo(Category);

Book.sync({force: false});

module.exports = Book;