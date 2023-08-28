const PermissionService = require('../services/permissionService');


const permissionService = new PermissionService();

class PermissionController {
    static async register(req, res) {
        try {
            const { name, description } = req.body;

            const permission = await permissionService.register({
                name,
                description
            });

            res.status(201).json(permission);
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }

    static async getAll(_, res) {
        try {
            const permissions = await permissionService.getAll();

            res.status(200).send(permissions);
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;

        try {
            const permission = await permissionService.findById(id);

            res.status(200).json(permission);
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const permission = await permissionService.update({
                id, name, description
            });

            res.status(200).json(permission);
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            await permissionService.delete(id);

            res.status(200).send({ message: 'permission deleted successfully' });
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }
}

module.exports = PermissionController;
