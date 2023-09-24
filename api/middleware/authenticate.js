const { verify, decode } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

module.exports = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).send('Access token not provided');

    const [, accessToken] = token.split(' ');

    try {
        verify(accessToken, jsonSecret.secret);

        const { id, email, name } = await decode(accessToken);

        req.userId = id;
        req.username = name;
        req.userEmail = email;

        return next();
    } catch (error) {
        console.error(error.stack || error);
        res.status(401).send('User not authorized.');
    }
}