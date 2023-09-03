const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

const router = Router()

router
    .post('/users', UserController.register)
    .get('/users', authenticate, UserController.getUsers)
    .get('/users/:id', authenticate, UserController.getUserById)
    .put('/users/:id', authenticate, UserController.editUser)
    .delete('/users/:id', authenticate, UserController.deleteUser);

module.exports = router;
