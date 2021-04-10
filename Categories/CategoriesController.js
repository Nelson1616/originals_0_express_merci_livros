const express = require('express');
const router = express.Router();
const Category = require('./Category');
const slugify = require('slugify');

const adminAuth = require('../Middlewares/authAdmin');
const adminAuthPrime = require('../Middlewares/authAdminPrime');

router.get('/admin/categories', adminAuth, (req, res) => {
    Category.findAll().then(categories => {
        res.render('admin/categories/index', {
            categories: categories,
            name: req.session.name,
        });
    });   
});

router.get('/admin/categories/create', adminAuth, (req, res) => {
    res.render('admin/categories/create', {
        name: req.session.name,
    });
});

router.post('/admin/categories/create', adminAuth, (req, res) => {
    let title = req.body.title;
    let slug = slugify(title);
    Category.create({
        title: title,
        slug: slug,
    }).then(() => {
        res.redirect('/admin/categories');
    });
});

router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id;
    Category.findByPk(id).then(category => {
        res.render('admin/categories/edit', {
            category: category,
            name: req.session.name,
        })
    });
});

router.post('/admin/categories/edit/', adminAuth, (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let slug = slugify(title);
    Category.update({title: title, slug: slug,}, {where: {id: id}}).then(() => {
        res.redirect('/admin/categories');
    });
});

router.post('/admin/categories/delete', adminAuthPrime, (req, res) => {
    let id = req.body.id;
    Category.destroy({where: {id: id}}).then(() => {
        res.redirect('/admin/categories');
    });
});


module.exports = router;