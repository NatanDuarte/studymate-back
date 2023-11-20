const { Router } = require('express');

const LiveKitAuthController = require('../controllers/liveKitAuthController');

const router = Router();

router
    .post('/livekit-auth', LiveKitAuthController.getToken);

module.exports = router;
