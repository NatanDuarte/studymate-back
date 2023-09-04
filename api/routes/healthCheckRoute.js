const { Router } = require('express');
const HealthCheckController = require('../controllers/healthCheckController');

const router = Router();

router
    .get('/health-check', HealthCheckController.check);

module.exports = router;
