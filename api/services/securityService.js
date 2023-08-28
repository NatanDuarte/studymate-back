const db = require('../models');
const Sequelize = require('sequelize');


class SecurityService {
    async registerAcl(dto) {
        const user = await db.Users.findOne({
            include:[
                {
                    model: db.roles,
                    as: "users_roles",
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: db.permissions,
                    as: "users_permission",
                    attributes: ['id', 'name', 'description']
                }
            ],
            where: {
                id: dto.userId
            }
        });

        if (!user) throw new Error("User not found");

        const registeredRoles = db.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        });

        const registeredPermissions = db.permissions.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissions
                }
            }
        });

        await user.removeUsers_roles(user.user_roles);
        await user.removeUsers_permission(user.user_permissions);

        await user.addUsers_roles(registeredRoles);
        await user.addUsers_permission(registeredPermissions);

        const newUser = await db.Users.findOne({
            include:[
                {
                    model: db.roles,
                    as: "users_roles",
                    attributes: ['id', 'name', 'description']
                },
                {
                    model: db.permissions,
                    as: "users_permission",
                    attributes: ['id', 'name', 'description']
                }
            ],
            where: {
                id: dto.userId
            }
        });

        return newUser;
    }
}

module.exports = SecurityService;
