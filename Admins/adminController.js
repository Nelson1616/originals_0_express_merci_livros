const express = require('express');
const router = express.Router();
const Admin = require('./Admin');
const bcrypt = require('bcryptjs');

const adminAuth = require('../Middlewares/authAdmin');
const adminAuthPrime = require('../Middlewares/authAdminPrime');

router.get('/admin', adminAuth, (req, res) => {
    res.render('admin/home', {
        name: req.session.name,
    });
});

router.get('/admin/read', adminAuth, (req, res) => {
    Admin.findAll().then(admins => {
        res.render('admin/index', {
            admins: admins,
            prime: req.session.prime,
            name: req.session.name,
        });
    });
    
});

router.get('/admin/create', adminAuthPrime, (req, res) => {
    res.render('admin/create', {
        name: req.session.name,
    });
});

router.post('/admin/create', adminAuthPrime, (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let prime = false;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    Admin.create({
        name: name,
        email: email,
        password: hash,
        prime: prime,
    }).then(() => {
        res.redirect('/admin/read');
    });


    
});

router.get('/admin/edit/:id', adminAuth, (req, res) => {
    let id = req.params.id;
    Admin.findByPk(id).then(admin => {
        res.render('admin/edit', {
            admin: admin,
            name: req.session.name,
        });
    });
});

router.post('/admin/edit', adminAuth, (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    Admin.update({
        name: name,
        email: email,
        password: hash,
    }, {where: {id: id}}).then(() => {
        res.redirect('/admin/read');
    });
});

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Admin.findOne({where: {email: email}}).then(admin => {
        let correct = bcrypt.compareSync(password, admin.password);
        if(correct)
        {
            req.session.email = admin.email;
            req.session.name = admin.name;
            req.session.prime = admin.prime;
            res.redirect('/admin');
        }
        else
        {
            res.redirect('/login');
        }
    }).catch(error => {
        res.redirect('/login');
    });  
});

router.get('/logout', (req, res) => {
    req.session.email = undefined;
    req.session.name = undefined;
    req.session.prime = undefined;

    res.redirect('/');
});

router.post('/admin/delete', adminAuthPrime, (req, res) => {
    let id = req.body.id;
    Admin.destroy({where: {id: id}}).then(() => {
        res.redirect('/admin/read');
    });
});



module.exports = router;