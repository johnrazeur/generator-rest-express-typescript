import { AuthController } from '../controllers/AuthController';
import { checkJwt } from '../middlewares/checkJwt';
import { BaseRoutes } from './BaseRoutes';

export class AuthRoutes extends BaseRoutes {
    private authController: AuthController;

    public constructor() {
        super();
        this.authController = new AuthController();
        this.routes();
    }

    public routes(): void {
        this.router.post('/login', this.authController.login);
        this.router.post('/change-password', [checkJwt], this.authController.changePassword);
    }
}
