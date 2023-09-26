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
}

module.exports = RoomService;
