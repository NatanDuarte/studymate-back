const db = require('../models');
const Sequelize = require('sequelize');


class SecurityService {
    async registerAcl(dto) {
        const user = await db.Users.findOne({
            include: [
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

        const registeredRoles = await db.roles.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.roles
                }
            }
        });

        const registeredPermissions = await db.permissions.findAll({
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
            include: [
                {
                    model: db.roles,
                    as: "users_roles",
                    attributes: ['id', 'name', 'description'],
                    through: {
                        attributes: [],
                    }
                },
                {
                    model: db.permissions,
                    as: "users_permission",
                    attributes: ['id', 'name', 'description'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        });

        return newUser;
    }

    async registerPermissionRoles(dto) {
        const role = await db.roles.findOne({
            include: [
                {
                    model: db.permissions,
                    as: 'role_permissions',
                    attributes: ['id', 'name', 'description']
                }
            ],
            where: {
                id: dto.roleId
            }
        });

        if (!role) throw new Error('Role not registered');

        const registeredPermissions = await db.permissions.findAll({
            where: {
                id: {
                    [Sequelize.Op.in]: dto.permissions
                }
            }
        });

        await role.removeRole_permissions(role.role_permissions);

        await role.addRole_permissions(registeredPermissions);

        const newRole = await db.roles.findOne({
            include: [
                {
                    model: db.permissions,
                    as: 'role_permissions',
                    attributes: ['id', 'name', 'description']
                }
            ],
            where: {
                id: dto.roleId
            }
        });

        return newRole;
    }
}

module.exports = SecurityService;
