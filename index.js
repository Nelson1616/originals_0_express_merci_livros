//Config do Express
const express = require('express'); 
const app = express(); 

//Config do EJS
app.set('view engine', 'ejs');
app.use(express.static('public'));

//Config do BodyParser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Config do Banco de Dados
const connection = require('./Database/database');
connection.authenticate().then(() => {
    console.log('Conectado ao Banco de Dados');
}).catch((error) => {
    console.log(error);
});

//Config Session
const session = require('express-session');
app.use(session({
    secret: 'qwertyuiop',
    cookie: {maxAge: 600000},
}));

//Config de Controllers
const categoriesController = require('./Categories/CategoriesController');
const Category = require('./Categories/Category');
app.use('/', categoriesController);

const booksController = require('./Books/bookController');
const Book = require('./Books/Book');
app.use('/', booksController);

const adminController = require('./Admins/adminController');
const Admin = require('./Admins/Admin');
app.use('/', adminController);

//Rotas 
app.get('/', (req, res) => {
    Book.findAll({order: [['updatedAt', 'DESC']]}).then(books => {
        Category.findAll().then(categories => {
            res.render('index', {books: books, categories: categories});
        });
        
    });
    
});

app.get('/book/:id', (req, res) => {
    let id = req.params.id;
    Book.findByPk(id).then(book => {
        Category.findAll().then(categories => {
            res.render('seeMore', {book: book, categories: categories});
        });
    });
});

app.get('/book/category/:slug', (req, res) => {
    let slug = req.params.slug;
    Category.findOne({where: {slug: slug}, include: [{model: Book}]}).then(category => {
        Category.findAll().then(categories => {
            res.render('index', {books: category.books, categories: categories});
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login');
});

















//Ligando o Servidor
app.listen(3000, () => {
    console.log('O servidor está rodando');
});