const RoomService = require('../services/roomService');

const roomService = new RoomService();

class RoomController {
    static async create(req, res) {
        const { userId } = req
        const { title, description } = req.body

        try {
            const dto = {
                authorId: userId,
                title: title,
                description: description
            }

            const room = await roomService.create(dto);

            res.status(201).send(room);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async getAll(_, res) {
        try {
            const rooms = await roomService.getAll();

            res.status(200).send(rooms);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params;
            const room = await roomService.getById(id);

            res.status(200).json(room);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async getByAuthorId(req, res) {
        try {
            const { id } = req.params;
            const room = await roomService.getByAuthorId(id);

            res.status(200).json(room);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async edit(req, res) {
        try {
            const { id } = req.params;
            const {
                title, description, primary_color, secondary_color
            } = req.body;

            const dto = {
                id, title, description, primary_color, secondary_color
            }
            const room = await roomService.edit(dto);

            res.status(200).json(room);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            await roomService.delete(id);

            res.status(200).send({ message: 'Room deleted successfully' });
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = RoomController;
