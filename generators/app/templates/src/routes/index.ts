import { Router } from 'express';
import { AuthRoutes } from './AuthRoutes';
import { UserRoutes } from './UserRoutes';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './../../swagger.json';

const routes = Router();

routes.use('/auth', new AuthRoutes().getRouter());
routes.use('/user', new UserRoutes().getRouter());
routes.use('/', swaggerUi.serve);
routes.get('/', swaggerUi.setup(swaggerDocument));
export default routes;