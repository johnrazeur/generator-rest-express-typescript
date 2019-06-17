import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entities/User";
import config from "../config/config";

export class AuthController {
    /**
     * @swagger
     *
     * /auth/login:
     *   post:
     *     summary: Login to the application
     *     tags:
     *       - auth
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
     *       200:
     *         description: Login success 
     *         content:
     *           application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  token:
     *                    type: string
     *       401:
     *         description: Invalid credential
     */
    public async login(req: Request, res: Response): Promise<void> {
        //Check if username and password are set
        let { username, password } = req.body;
        if (!(username && password)) {
            res.status(400).send();
            return;
        }

        //Get user from database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail({ where: { username } });
        } catch (error) {
            res.status(401).send({
                message: 'invalid credential'
            });
            return;
        }

        //Check if encrypted password match
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send({
                message: 'invalid credential'
            });
            return;
        }

        //Sing JWT, valid for 1 hour
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: "1h" }
        );

        //Send the jwt in the response
        res.send({
            token
        });
    };

    /**
     * @swagger
     *
     * /auth/change-password:
     *   post:
     *     summary: Change the user password
     *     tags:
     *       - auth
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               oldPassword:
     *                 type: string
     *               newPassword:
     *                 type: string
     *     responses:
     *       204:
     *         description: The password was changed successfully
     *       400:
     *         description: Invalid parameter
     *       401:
     *         description: User not found
     */
    public async changePassword(req: Request, res: Response): Promise<void> {
        //Get ID from JWT
        const id = res.locals.jwtPayload.userId;

        //Get parameters from the body
        const { oldPassword, newPassword } = req.body;
        if (!(oldPassword && newPassword)) {
            res.status(400).send({
                message: 'invalid parameter'
            });
            return;
        }

        //Get user from the database
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);
        } catch (id) {
            res.status(401).send({
                message: 'user not found'
            });
            return;
        }

        //Check if old password matchs
        if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
            res.status(401).send({
                message: 'password doesn\'t match'
            });
            return;
        }

        //Validate de model (password lenght)
        user.password = newPassword;
        const errors = await validate(user);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        //Hash the new password and save
        user.hashPassword();
        userRepository.save(user);

        res.status(204).send();
    };
}