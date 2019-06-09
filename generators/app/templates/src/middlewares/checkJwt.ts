import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
    //Get the jwt token from the head
    const authorization = req.headers["authorization"] as string;
    const authorizationSplit: string[] = authorization.split(' ');

    if (authorizationSplit[0].toLocaleLowerCase() !== 'bearer') {
        res.status(401).send({
            message: 'bad authorization header'
        });
        return;
    }
    const token: string = authorizationSplit[1];
    let jwtPayload: string|object;

    if (!token) {
        res.status(401).send({
            message: 'no token provided'
        });
        return;
    }

    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({
            message: 'invalid token'
        });
        return;
    }

    next();
};