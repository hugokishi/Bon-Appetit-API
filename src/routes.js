const express = require('express');
const SessionController = require('../src/controllers/SessionController');
const RestaurantController = require('../src/controllers/RestaurantController');
const ProfileController = require('../src/controllers/ProfileController');
const MenuController = require('../src/controllers/MenuController');
const routes = express.Router();

// Rota para validação de sessão
routes.post('/session', SessionController.create);

// Rota para listagem de restaurantes
routes.get('/restaurant', RestaurantController.index);
// Rota para cadastro de restaurantes
routes.post('/restaurant', RestaurantController.create);


// Rota para obter o menu baseado no ID
routes.get('/profile', ProfileController.index);

// Rota para obter o menu
routes.get('/menu', MenuController.index);
// Rota para cadastrar um menu
routes.post('/menu', MenuController.create);
// Rota para deletar um menu
routes.delete('/menu/:id', MenuController.delete);


module.exports = routes;