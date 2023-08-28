const db = require('../models');


const uuid = require('uuid');

class PermissionService {
    async register(dto) {
        const permission = await db.permissions.findOne({
            where: {
                name: dto.name
            }
        });

        if (permission)
            throw new Error(`Permission already exists`);

        try {
            const newPermission = await db.permissions.create({
                id: uuid.v4(),
                name: dto.name,
                description: dto.description
            });

            return newPermission;
        } catch (error) {
            throw new Error('Error fetching permissions');
        }
    }

    async getAll() {
        try {
            const permissions = await db.permissions.findAll();

            return permissions;
        } catch (error) {
            throw new Error('Error fetching permissions');
        }
    }

    async findById(id) {
        try {
            const permission = await db.permissions.findOne({
                where: {
                    id: id
                }
            });

            if (!permission) throw new Error('Permission not found');

            return permission;
        } catch (error) {
            throw new Error('Error finding permission');
        }
    }

    async update(dto) {
        const permission = await this.findById(dto.id);

        try {
            permission.name = dto.name;
            permission.description = dto.description;

            await permission.save;

            return permission;
        } catch (error) {
            throw new Error('Error updating permission');
        }
    }

    async delete(id) {
        await this.findById(id);

        try {
            await db.permissions.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error('Error updating permission');
        }
    }
}

module.exports = PermissionService;
