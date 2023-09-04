class HealthCheckController {
    static async check(req, res) {
        res.status(200).json({ status: 'up' });
    }
}

module.exports = HealthCheckController;
