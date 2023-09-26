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

    static async getAll(req, res) {
        try {
            const rooms = await roomService.getAll();

            res.status(201).send(rooms);
        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async getById(req, res) {
        try {

        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async edit(req, res) {
        try {

        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }

    static async delete(req, res) {
        try {

        } catch (error) {
            console.error(error.stack || error);
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = RoomController;
