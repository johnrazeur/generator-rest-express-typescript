import { Request, Response } from "express";

import { User } from "../entities/User";
import { UserService } from '../services/UserService';

class UserController {
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