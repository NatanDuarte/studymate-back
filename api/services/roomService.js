const db = require('../models');
const uuid = require('uuid')

class RoomService {
    async create(dto) {
        const { authorId, title, description } = dto

        if (!authorId) throw new Error(`can't create a room without an author`);

        if (!title) throw new Error(`can't create a room without a title`);

        try {
            const newRoom = await db.room.create({
                id: uuid.v4(),
                title: title,
                author_id: authorId,
                description: !description ? "" : description,
                primary_color: '#020200',
                secondary_color: '#023245'
            });

            return newRoom;
        } catch (error) {
            throw new Error(`Error creating new room: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const rooms = await db.room.findAll({
                order: [['createdAt', 'DESC']],
            });

            return rooms;
        } catch (error) {
            throw new Error(`Error fetching rooms: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const room = await db.room.findOne({
                where: {
                    id: id
                }
            });

            return room;
        } catch (error) {
            throw new Error(`Error getting room: ${error.message}`);
        }
    }

    async getByAuthorId(id) {
        try {
            const room = await db.room.findAll({
                where: {
                    author_id: id
                }
            });

            return room;
        } catch (error) {
            throw new Error(`Error getting room: ${error.message}`);
        }
    }

    async edit(dto) {
        try {
            const {
                id, title, description, primary_color, secondary_color
            } = dto
            const room = await this.getById(id);

            if (title) room.title = title
            if (description) room.description = description
            if (primary_color) room.primary_color = primary_color
            if (secondary_color) room.secondary_color = secondary_color

            await room.save();
            return room;
        } catch (error) {
            throw new Error(`Error editing room: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await db.room.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            throw new Error(`Error deleting room: ${error.message}`);
        }
    }
}

module.exports = RoomService;
