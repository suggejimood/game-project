import { Router } from 'express';
//controller
import { playHandler } from '../controllers/game';
//Middlewares
import { authenticationJWT } from '../middlewares/token/token';
import { playValidation } from '../middlewares/validation/game';
import { validateRequest } from '../middlewares/validation/validation';

const router = Router();

router.use(authenticationJWT);

router.post('/play', playValidation(), validateRequest, playHandler);

export { router as gameRouter };