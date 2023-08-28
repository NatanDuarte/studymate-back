const RoleService = require('../services/roleService');

const roleService = new RoleService();

class RoleController {
    static async register(req, res) {
        const { name, description } = req.body;

        try {
            const role = await roleService.register({ name, description });

            res.status(201).json(role);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async getAll(_, res) {
        try {
            const roles = await roleService.getAll();
            res.status(201).json(roles);
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params
            const role = await roleService.getById(id);

            res.status(200).json(role);
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const { name, description } = req.body;

        try {
            const role = await roleService.update({ id, name, description });

            res.status(200).json(role);
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            await roleService.delete(id);

            res.status(200).send({ message: "Role deleted successfully" });
        } catch (error) {
            console.error(error.stack || error);
            res.status(401).send({ message: error.message });
        }
    }
}

module.exports = RoleController;
