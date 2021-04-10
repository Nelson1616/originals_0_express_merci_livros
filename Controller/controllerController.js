const express = require('express');
const router = express.Router();
const Tabela = require('./DBController');

router.get('/controller', (req, res) => {
    res.send('Controller');
});

module.exports = router;