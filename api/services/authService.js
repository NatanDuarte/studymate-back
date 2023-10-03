const db = require('../models');
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const jsonSecret = require('../config/jsonSecret');

class AuthService {
    async login(dto) {
        const user = await db.Users.findOne({
            attributes: ['name', 'id', 'email', 'password'],
            where: {
                email: dto.email
            }
        });

        if (!user) throw new Error('User not found');

        const passwordMatches = await compare(dto.password, user.password);

        if (!passwordMatches) throw new Error('Invalid user or password');

        const accessToken = sign({
            id: user.id,
            email: user.email,
        }, jsonSecret.secret, {
            expiresIn: 60000
        });

        return { access_token: accessToken, id: user.id, username: user.name, email: user.email };
    }
}

module.exports = AuthService;