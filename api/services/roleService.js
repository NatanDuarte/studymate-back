const db = require('../models');


const uuid = require('uuid');

class RoleService {
    async register(dto) {
        const role = await db.roles.findOne({
            where: {
                name: dto.name
            }
        });

        if (role)
            throw new Error(`A role with the name "${dto.name}" already exists`)

        try {
            const newRole = await db.roles.create({
                id: uuid.v4(),
                name: dto.name,
                description: dto.description
            });

            return newRole;
        } catch (error) {
            throw new Error('Error registering role');
        }
    }

    async getAll() {
        try {
            const roles = await db.roles.findAll();

            return roles;
        } catch (error) {
            throw new Error('Error getting roles');
        }
    }

    async getById(id) {
        try {
            const role = await db.roles.findOne({
                where: {
                    id: id
                }
            });

            if (!role) throw new Error('Role not found');

            return role;
        } catch (error) {
            throw new Error('Error getting role');
        }
    }

    async update(dto) {
        const role = await this.getById(dto.id);

        try {
            role.name = dto.name;
            role.description = dto.description;

            await role.save();

            return role;
        } catch (error) {
            throw new Error('Error editing role');
        }
    }

    async delete(id) {
        await this.getById(id);

        try {
            await db.roles.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error('Error deleting role');
        }
    }
}

module.exports = RoleService;
