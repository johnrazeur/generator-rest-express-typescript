import { Request, Response } from "express";

import { User } from "../entities/User";
import { UserService } from '../services/UserService';

class UserController {
    /**
     * @swagger
     *
     * /user:
     *   post:
     *     summary: Register
     *     tags:
     *       - user
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       201:
     *         content:
     *           application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: string
     *       500:
     *         description: Server error
     */
    public async newUser(request: Request, response: Response): Promise<void> {
        //Get parameters from the body
        let { username, password } = request.body;
        let user = new User();
        user.username = username;
        user.password = password;

        const userService = new UserService();
        try {
            await userService.create(username, password);
            response.status(201).send({
                message: "User created"
            });
        } catch (error) {
            switch(error.name) {
                case 'UsernameExist':
                case 'UserNotValid':
                    return response.status(500).send({
                        message: error.message
                    });
            }
        }
    };
};

export default UserController;