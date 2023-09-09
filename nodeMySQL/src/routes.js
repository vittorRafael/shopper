const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const PackController = require('./controllers/PackController');

//Products
routes.get('/products', ProductController.read);
routes.get('/product/:code', ProductController.readCode);
routes.post('/product/:code', ProductController.edit);

//Packs
routes.get('/packs', PackController.read);

module.exports = routes;
