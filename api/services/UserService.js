const db = require('../models');
const { hash } = require('bcryptjs');
const uuid = require('uuid')

class UserService {
    async register(dto) {
        const user = await db.Users.findOne({
            where: {
                email: dto.email
            }
        });

        if (user) {
            throw new Error('Email already exists');
        }

        try {
            const passwordHash = await hash(dto.password, 8);

            const newUser = await db.Users.create({
                id: uuid.v4(),
                name: dto.name,
                email: dto.email,
                password: passwordHash
            });

            return newUser;
        } catch (error) {
            throw new Error(`Error on database register: ${error}`);
        }
    }

    async findUsers() {
        try {
            const users = await db.Users.findAll();

            return users;
        } catch (error) {
            throw new Error('Error getting users');
        }
    }

    async findById(id) {
        const user = await db.Users.findOne({
            where: {
                id: id
            }
        });

        if (!user)
            throw new Error('User not found.');

        return user;
    }

    async editUser(dto) {
        const user = await this.findById(dto.id);

        const userExists = await db.Users.findOne({
            where: {
                email: dto.email
            }
        });

        if (userExists) {
            throw new Error('Email already exists');
        }

        try {
            user.name = dto.name;
            user.email = dto.email;

            await user.save();

            return user;
        } catch (error) {
            console.error(error.stack || error);
            throw new Error('Error editing user.');
        }
    }

    async deleteUser(id) {
        await this.findById(id);

        try {
            await db.Users.destroy({
                where: {
                    id: id
                }
            });
        } catch (error) {
            console.error(error.stack || error);
            throw new Error('Error on deleting user.');
        }
    }
}

module.exports = UserService;