import { Router } from 'express';
//Routers
import { authRouter } from './auth';
import { countryRouter } from './country';
import { playerRouter } from './player';
import { gameRouter } from './game'

const router = Router();

router.use('/auth', authRouter);
router.use('/country', countryRouter);
router.use('/player', playerRouter);
router.use('/game', gameRouter);
router('/top100', top100Router)

export { router as gameProjectRouter };