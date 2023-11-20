const LiveKitAuthService = require('../services/liveKitAuthService');

class LiveKitAuthController {
    static async getToken(req, res) {
        try {
            const { userName, roomName } = req.body;

            const token = await LiveKitAuthService
                .getToken({ roomName, identity: userName });

            res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error });
        }
    }
}

module.exports = LiveKitAuthController;