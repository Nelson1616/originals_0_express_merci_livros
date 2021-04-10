const express = require('express');
const router = express.Router();
const Book = require('./Book');
const Category = require('../Categories/Category');

const adminAuth = require('../Middlewares/authAdmin');
const adminAuthPrime = require('../Middlewares/authAdminPrime');

router.get('/admin/books', adminAuth, (req, res) => {
    Book.findAll({include: [{model: Category}]}).then(books => {
        res.render('admin/books/index', {
            books: books,
            name: req.session.name,
        });
    });   
});

router.get('/admin/books/create', adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/books/create', {
            categories: categories,
            name: req.session.name,
        });
    });
    
});

router.post('/admin/books/create', adminAuth, (req, res) => {
    let name = req.body.name;
    let author = req.body.author;
    let state = req.body.state;
    let categoryId = req.body.categoryId;
    let price = req.body.price;
    let description = req.body.description;
    let imgLink = req.body.imgLink;
    let color = req.body.color;
    Book.create({
        name: name,
        author: author,
        state: state,
        categoryId: categoryId,
        price: price,
        description: description,
        imgLink: imgLink,
        color: color,
    }).then(() => {
        res.redirect('/admin/books');
    });
});

router.get('/admin/books/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id;
    Book.findByPk(id).then(book => {
        Category.findAll().then(categories => {
            res.render('admin/books/edit', {
                book: book, 
                categories: categories,
                name: req.session.name,
            });
        });
    });
});

router.post('/admin/books/edit', adminAuth, (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let author = req.body.author;
    let state = req.body.state;
    let categoryId = req.body.categoryId;
    let price = req.body.price;
    let description = req.body.description;
    let imgLink = req.body.imgLink;
    let color = req.body.color;
    Book.update({
        name: name,
        author: author,
        state: state,
        categoryId: categoryId,
        price: price,
        description: description,
        imgLink: imgLink,
        color: color,
    }, {where: {id: id}}).then(() => {
        res.redirect('/admin/books');
    });
});

router.post('/admin/books/delete', adminAuth, (req, res) => {
    let id = req.body.id;
    Book.destroy({where: {id: id}}).then(() => {
        res.redirect('/admin/books');
    });
});

module.exports = router;