const { Router } = require('express');
const UserController = require('../controllers/UserController');
const authenticate = require('../middleware/authenticate');

const router = Router()

router.use(authenticate)

router
    .post('/users', UserController.register)
    .get('/users', UserController.getUsers)
    .get('/users/:id', UserController.getUserById)
    .put('/users/:id', UserController.editUser)
    .delete('/users/:id', UserController.deleteUser);

module.exports = router;
