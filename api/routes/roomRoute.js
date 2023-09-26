const { Router } = require('express');
const RoomController = require('../controllers/roomController');
const authenticate = require('../middleware/authenticate');

const router = Router();

router
    .get('/rooms', RoomController.getAll)
    .post('/rooms', authenticate, RoomController.create);

module.exports = router;
