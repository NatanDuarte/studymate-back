const { Router } = require('express');
const AuthController = require('../controllers/authController');
const HealthCheckController = require('../controllers/healthCheckController');

const router = Router();

router
    .post('/auth/login', AuthController.login)
    .get('/health-check', HealthCheckController.check);

module.exports = router;
