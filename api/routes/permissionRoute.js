const { Router } = require('express');

const PermissionController = require('../controllers/permissionController');
const router = Router();


router
    .post('/permission', PermissionController.register)
    .get('/permission', PermissionController.getAll)
    .get('/permission/:id', PermissionController.getById)
    .put('/permission/:id', PermissionController.update)
    .delete('/permission/:id', PermissionController.delete);

module.exports = router;
