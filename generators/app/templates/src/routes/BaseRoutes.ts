import { Router } from "express";


export abstract class BaseRoutes {
    protected router = Router; 

    public constructor() {
        this.router = new Router();
    }

    public getRouter(): Router {
        return this.router;
    }

    public abstract routes(): void;
}