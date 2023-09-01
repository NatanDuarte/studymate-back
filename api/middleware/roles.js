const db = require('../models');

const roles = (rolesList) => {
    return async (req, res, next) => {
        const { userId } = req

        const user = await db.Users.findOne({
            include: [
                {
                    model: db.roles,
                    as: 'users_roles',
                    attributes: ['id', 'name', 'description']
                }
            ],
            where: {
                id: userId
            }
        });

        if (!user) return res.send(401).send('User not found');

        const registeredRoles = user.users_roles
            .map((role) => role.name)
            .some((role) => rolesList.includes(role));

        if (!registeredRoles)
            return res.status(401).send('Route not allowed for this user');

        return next();
    }
}

module.exports = roles;
