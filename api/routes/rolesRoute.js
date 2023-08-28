const { Router } = require('express');

const UserController = require('../controllers/roleController');
const router = Router()

router
    .post('/roles', UserController.register)
    .get('/roles', UserController.getAll)
    .get('/roles/:id', UserController.getById)
    .put('/roles/:id', UserController.update)
    .delete('/roles/:id', UserController.delete);

module.exports = router;
