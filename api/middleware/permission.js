const db = require('../models');


const permissions = (listOfPermissions) => {
    return async (req, res, next) => {
        const { userId } = req

        const user = await db.Users.findOne({
            include: [
                {
                    model: db.permissions,
                    as: 'users_permission',
                    attributes: ['id', 'name', 'description']
                }
            ],
            where: {
                id: userId
            }
        });

        if (!user) return res.status(401).send('User not found');

        const registeredPermissions = user.users_permission
            .map((permission) => permission.name)
            .some((permission) => listOfPermissions.includes(permission));

        if (!registeredPermissions)
            return res.status(401).send('Route not allowed for this user');

        return next();
    }
}

module.exports = permissions;
