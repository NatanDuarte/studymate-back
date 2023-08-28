const UserService = require('../services/UserService');

const userService = new UserService();

class UserController {
    static async register(req, res) {
        const { name, email, password } = req.body;

        if (!name) throw new Error('Name is required');
        if (!email) throw new Error('Email is required');
        if (!password) throw new Error('Password is required');

        try {
            const user = await userService.register({ name, email, password });

            res.status(201).json(user);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async getUsers(_, res) {
        try {
            const users = await userService.findUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params
            const user = await userService.findById(id);

            res.status(200).json(user);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message })
        }
    }

    static async editUser(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;

        try {
            const user = await userService.editUser({ id, name, email });

            res.status(200).json(user);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;

        try {
            await userService.deleteUser(id);

            res.status(200).send({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = UserController;