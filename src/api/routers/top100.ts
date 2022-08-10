import { Router } from 'express';
//Controller
import { listTop100PlayerHandler } from '../controllers/top100';
//Middleware
import { authenticationJWT } from '../middlewares/token/token';

const router = Router();

router.use(authenticationJWT);

router.get('/list', listTop100PlayerHandler);

export { router as top100Router };