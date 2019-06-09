import UserController from '../controllers/UserController';
import { BaseRoutes } from './BaseRoutes';


export class UserRoutes extends BaseRoutes {
    private userController: UserController;

    public constructor() {
        super();
        this.userController = new UserController();
        this.routes();
    }

    public routes(): void {
        this.router.post('/', this.userController.newUser);
    }
}
