import { Request, Response, NextFunction } from "express";

import { User } from "../entities/User";
import { UserService } from '../services/UserService';

class UserController {
    public async newUser(request: Request, response: Response, next: NextFunction) {
        //Get parameters from the body
        let { username, password } = request.body;
        let user = new User();
        user.username = username;
        user.password = password;

        const userService = new UserService();
        try {
            const user = await userService.create(username, password);
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