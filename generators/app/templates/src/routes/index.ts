import { Router } from 'express';
import { AuthRoutes } from './AuthRoutes';
import { UserRoutes } from './UserRoutes';

const routes = Router();

routes.use('/auth', new AuthRoutes().getRouter());
routes.use('/user', new UserRoutes().getRouter());

export default routes;