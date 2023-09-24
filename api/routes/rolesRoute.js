const { Router } = require('express');

const roleController = require('../controllers/roleController');
const router = Router()

router
    .post('/roles', roleController.register)
    .get('/roles', roleController.getAll)
    .get('/roles/:id', roleController.getById)
    .put('/roles/:id', roleController.update)
    .delete('/roles/:id', roleController.delete);

module.exports = router;
