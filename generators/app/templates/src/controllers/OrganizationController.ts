import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";


class OrganizationController {
    public async create (req: Request, res: Response): Promise<void> {
        const id = res.locals.jwtPayload.userId;
    }
}

export default OrganizationController;