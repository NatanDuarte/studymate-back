const { Router } = require('express');
const RoomController = require('../controllers/roomController');
const authenticate = require('../middleware/authenticate');

const router = Router();

router
    .post('/rooms', authenticate, RoomController.create)
    .get('/rooms', RoomController.getAll)
    .get('/rooms/:id', authenticate, RoomController.getById)
    .get('/rooms/author/:id', authenticate, RoomController.getByAuthorId)
    .put('/rooms/:id', authenticate, RoomController.edit)
    .delete('/rooms/:id', authenticate, RoomController.delete);

module.exports = router;
