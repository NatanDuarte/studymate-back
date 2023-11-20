require('dotenv').config();
const { AccessToken } = require('livekit-server-sdk');

class LiveKitAuthService {
    static async getToken(dto) {
        try {
            const { roomName, identity } = dto;

            const apiKey = process.env.LIVEKIT_KEY_SID;
            const apiSecret = process.env.LIVEKIT_KEY_SECRET;

            const at = new AccessToken(apiKey, apiSecret, {
                identity: identity,
            });

            at.addGrant({ roomJoin: true, room: roomName });

            return at.toJwt();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = LiveKitAuthService;